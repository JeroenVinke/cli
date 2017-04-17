'use strict';

const BundlerMock = require('../../mocks/bundler');
const BundledSource = require('../../../lib/build/bundled-source').BundledSource;
const ExcludedDep = require('../../../lib/build/excluded-dep').ExcludedDep;

describe('the BundledSource module', () => {
  let bundler;

  beforeEach(() => {
    bundler = new BundlerMock();
  });

  it('filters relative excluded deps', () => {
    let sut = new BundledSource(bundler, {});
    bundler.getExcludedDeps.and.returnValue([
      new ExcludedDep('my-package', './b', 'my-package/a')
    ]);

    let result = sut.filterDeps('my-package/a', ['./a', './b', 'Buffer']);

    expect(result.length).toBe(2);
    expect(result[0]).toBe('./a');
    expect(result[1]).toBe('Buffer');
  });

  it('does not filter relative excluded deps when origin does not match', () => {
    let sut = new BundledSource(bundler, {});
    bundler.getExcludedDeps.and.returnValue([
      new ExcludedDep('my-package', './b', 'my-package/z')
    ]);

    let result = sut.filterDeps('my-package/a', ['./a', './b', 'Buffer']);

    expect(result.length).toBe(3);
    expect(result[0]).toBe('./a');
    expect(result[1]).toBe('./b');
    expect(result[2]).toBe('Buffer');
  });

  it('filters global excluded deps', () => {
    let sut = new BundledSource(bundler, {});
    bundler.getExcludedDeps.and.returnValue([
      new ExcludedDep('my-package', 'Buffer')
    ]);

    let result = sut.filterDeps('my-package/a', ['./some-file', 'OtherGlobalModule', 'Buffer']);

    expect(result.length).toBe(2);
    expect(result[0]).toBe('./some-file');
    expect(result[1]).toBe('OtherGlobalModule');
  });

  it('traces all dependencies when no dependencies are excluded', () => {
    let sut = new BundledSource(bundler, {});
    bundler.getExcludedDeps.and.returnValue([]);

    let result = sut.filterDeps('my-package/a', ['./some-file', 'OtherGlobalModule', 'Buffer']);

    expect(result.length).toBe(3);
    expect(result[0]).toBe('./some-file');
    expect(result[1]).toBe('OtherGlobalModule');
    expect(result[2]).toBe('Buffer');
  });
});
