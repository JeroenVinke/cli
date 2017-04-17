'use strict';

const Bundler = require('../../../lib/build/bundler').Bundler;
const PackageAnalyzer = require('../../mocks/package-analyzer');
const CLIOptionsMock = require('../../mocks/cli-options');
const ExcludedDep = require('../../../lib/build/excluded-dep').ExcludedDep;

describe('the Bundler module', () => {
  let analyzer;
  let cliOptionsMock;
  let project;

  beforeEach(() => {
    analyzer = new PackageAnalyzer();
    cliOptionsMock = new CLIOptionsMock();
    cliOptionsMock.attach();

    project = {
      paths: {
        root: 'src'
      },
      build: { loader: {} }
    };
  });

  it('uses paths.root from aurelia.json in the loaderConfig as baseUrl', () => {
    project = {
      paths: {
        root: 'src'
      },
      build: { loader: {} }
    };
    let bundler = new Bundler(project, analyzer);
    expect(bundler.loaderConfig.baseUrl).toBe('src');
  });

  it('takes paths from aurelia.json and uses it in the loaderConfig', () => {
    project = {
      paths: {
        root: 'src',
        foo: 'bar'
      },
      build: { loader: {} }
    };
    let bundler = new Bundler(project, analyzer);
    expect(bundler.loaderConfig.paths.root).toBe('src');
    expect(bundler.loaderConfig.paths.foo).toBe('bar');
  });

  it('ensures that paths in aurelia.json are relative from the root path', () => {
    project = {
      paths: {
        root: 'src',
        foo: 'src/bar'
      },
      build: { loader: {} }
    };
    let bundler = new Bundler(project, analyzer);
    expect(bundler.loaderConfig.paths.foo).toBe('bar');
  });

  it('adds package to requirejs configuration for dependencies with main files', done => {
    analyzer.reverseEngineer.and.returnValue(Promise.resolve({
      loaderConfig: {
        main: 'index.js',
        name: 'my-package',
        path: '../node_modules/my-package'
      }
    }));
    let bundler = new Bundler(project, analyzer);
    bundler.configureDependency({
      main: 'index.js',
      name: 'my-package',
      path: '../node_modules/my-package'
    })
    .then(() => {
      expect(bundler.loaderConfig.packages.length).toBe(1);
      expect(bundler.loaderConfig.packages[0].name).toBe('my-package');
      expect(bundler.loaderConfig.packages[0].location).toBe('../node_modules/my-package');
      expect(bundler.loaderConfig.packages[0].main).toBe('index.js');
      done();
    })
    .catch(e => done.fail(e));
  });

  it('adds path to requirejs config for dependencies without main file', done => {
    analyzer.reverseEngineer.and.returnValue(Promise.resolve({
      loaderConfig: {
        name: 'my-package',
        path: '../node_modules/my-package/index'
      }
    }));
    let bundler = new Bundler(project, analyzer);
    bundler.configureDependency({
      name: 'my-package',
      path: '../node_modules/my-package/index'
    })
    .then(() => {
      expect(bundler.loaderConfig.paths['my-package']).toBe('../node_modules/my-package/index');
      done();
    })
    .catch(e => done.fail(e));
  });

  it('adds shim to requirejs config for dependencies with deps', done => {
    analyzer.reverseEngineer.and.returnValue(Promise.resolve({
      loaderConfig: {
        main: 'index.js',
        name: 'my-package',
        path: '../node_modules/my-package',
        deps: ['foo']
      }
    }));
    let bundler = new Bundler(project, analyzer);
    bundler.configureDependency({
      main: 'index.js',
      name: 'my-package',
      path: '../node_modules/my-package',
      deps: ['foo']
    })
    .then(() => {
      expect(bundler.loaderConfig.shim['my-package']).toBeDefined();
      expect(bundler.loaderConfig.shim['my-package'].deps).toBeDefined(['foo']);
      done();
    })
    .catch(e => done.fail(e));
  });

  it('adds shim to requirejs config for dependencies with exports', done => {
    analyzer.reverseEngineer.and.returnValue(Promise.resolve({
      loaderConfig: {
        main: 'index.js',
        name: 'my-package',
        path: '../node_modules/my-package',
        exports: ['foo']
      }
    }));
    let bundler = new Bundler(project, analyzer);
    bundler.configureDependency({
      main: 'index.js',
      name: 'my-package',
      path: '../node_modules/my-package',
      exports: ['foo']
    })
    .then(() => {
      expect(bundler.loaderConfig.shim['my-package']).toBeDefined();
      expect(bundler.loaderConfig.shim['my-package'].exports).toBeDefined(['foo']);
      done();
    })
    .catch(e => done.fail(e));
  });

  it('adds maps to requirejs config for dependencies with browser field overrides', done => {
    analyzer.reverseEngineer.and.returnValue(Promise.resolve({
      loaderConfig: {
        main: 'index.js',
        name: 'my-package',
        path: '../node_modules/my-package'
      },
      metadata: {
        browser: {
          'x': 'y',
          'my-package/a': 'my-package/b',
          'some-module': 'my-package/c',
          'module-with-extension.js': 'alternative-module-with-extension.js',
          './relative-file': './alternative-relative-file',
          './some/relative-file': './some/alternative-relative-file'
        }
      }
    }));
    let bundler = new Bundler(project, analyzer);
    bundler.configureDependency({
      main: 'index.js',
      name: 'my-package',
      path: '../node_modules/my-package'
    })
    .then(() => {
      expect(bundler.loaderConfig.map).toBeDefined();
      expect(bundler.loaderConfig.map['*']).toBeDefined();
      expect(bundler.loaderConfig.map['*'].x).toBe('y');
      expect(bundler.loaderConfig.map['*']['my-package/a']).toBe('my-package/b');
      expect(bundler.loaderConfig.map['*']['some-module']).toBe('my-package/c');
      expect(bundler.loaderConfig.map['*']['module-with-extension']).toBe('alternative-module-with-extension');
      expect(bundler.loaderConfig.map['*']['my-package/relative-file']).toBe('my-package/alternative-relative-file');
      expect(bundler.loaderConfig.map['*']['my-package/some/relative-file']).toBe('my-package/some/alternative-relative-file');
      done();
    })
    .catch(e => done.fail(e));
  });

  it('does not cause errors when browser field is a string', done => {
    analyzer.reverseEngineer.and.returnValue(Promise.resolve({
      loaderConfig: {
        main: 'index.js',
        name: 'my-package',
        path: '../node_modules/my-package'
      },
      metadata: {
        browser: './foo.js'
      }
    }));
    let bundler = new Bundler(project, analyzer);
    bundler.loaderConfig.map = { '*': { 'my-package/a': 'my-package/z' } };

    bundler.configureDependency({
      main: 'index.js',
      name: 'my-package',
      path: '../node_modules/my-package'
    })
    .then(() => {
      done();
    })
    .catch(e => done.fail(e));
  });

  it('browser field maps do not override existing map', done => {
    analyzer.reverseEngineer.and.returnValue(Promise.resolve({
      loaderConfig: {
        main: 'index.js',
        name: 'my-package',
        path: '../node_modules/my-package'
      },
      metadata: {
        browser: {
          'my-package/a': 'my-package/b',
          'some-module': 'my-package/c',
          './relative-file': './alternative-relative-file'
        }
      }
    }));
    let bundler = new Bundler(project, analyzer);
    bundler.loaderConfig.map = { '*': { 'my-package/a': 'my-package/z' } };

    bundler.configureDependency({
      main: 'index.js',
      name: 'my-package',
      path: '../node_modules/my-package'
    })
    .then(() => {
      expect(bundler.loaderConfig.map).toBeDefined();
      expect(bundler.loaderConfig.map['*']).toBeDefined();
      expect(bundler.loaderConfig.map['*']['my-package/a']).toBe('my-package/z');
      done();
    })
    .catch(e => done.fail(e));
  });

  it('boolean in browser field results in ignored import', done => {
    analyzer.reverseEngineer.and.returnValue(Promise.resolve({
      loaderConfig: {
        main: 'index.js',
        name: 'my-package',
        path: '../node_modules/my-package'
      },
      metadata: {
        browser: {
          './a': false
        }
      }
    }));
    let bundler = new Bundler(project, analyzer);

    bundler.configureDependency({
      main: 'index.js',
      name: 'my-package',
      path: '../node_modules/my-package'
    })
    .then(() => {
      expect(bundler.excludedDeps.length).toBe(1);
      expect(bundler.excludedDeps[0].packageName).toBe('my-package');
      expect(bundler.excludedDeps[0].dep).toBe('./a');
      done();
    })
    .catch(e => done.fail(e));
  });

  it('adds excludedDeps from descriptions to the excludedDeps array', () => {
    analyzer.reverseEngineer.and.returnValue(Promise.resolve({
      loaderConfig: {
        main: 'index.js',
        name: 'my-package',
        path: '../node_modules/my-package',
        override: {
          excludedDeps: {
            './a.js': './b.js',
            './c.js': true,
            './d.js': false
          }
        }
      }
    }));
    let bundler = new Bundler(project, analyzer);

    bundler.configureDependency({
      main: 'index.js',
      name: 'my-package',
      path: '../node_modules/my-package'
    })
    .then(() => {
      expect(bundler.excludedDeps.length).toBe(3);
      expect(bundler.excludedDeps[0].packageName).toBe('my-package');
      expect(bundler.excludedDeps[1].packageName).toBe('my-package');
      expect(bundler.excludedDeps[2].packageName).toBe('my-package');
      expect(bundler.excludedDeps[0].dep).toBe('./b');
      expect(bundler.excludedDeps[1].dep).toBe('./c');
      expect(bundler.excludedDeps[2].dep).toBe('./d');
      done();
    })
    .catch(e => done.fail(e));
  });

  it('getExcludedDeps returns own ignored imports', () => {
    let bundler = new Bundler(project, analyzer);
    bundler.excludedDeps = [
      new ExcludedDep('my-package', './c')
    ];

    let result = bundler.getExcludedDeps();

    expect(result.length).toBe(1);
    expect(result[0].packageName).toBe('my-package');
  });

  it('getExcludedDeps returns ignored imports of bundles', () => {
    let bundler = new Bundler(project, analyzer);
    bundler.bundles.push({ excludedDeps: [new ExcludedDep('my-package', './b')] });
    bundler.bundles.push({ excludedDeps: [new ExcludedDep('my-other-package', './c')] });

    let result = bundler.getExcludedDeps();

    expect(result.length).toBe(2);
    expect(result[0].packageName).toBe('my-package');
    expect(result[1].packageName).toBe('my-other-package');
  });

  afterEach(() => {
    cliOptionsMock.detach();
  });
});
