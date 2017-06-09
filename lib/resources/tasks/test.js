import gulp from 'gulp';
import {Server as Karma} from 'karma';
import {CLIOptions} from 'aurelia-cli';
import build from './build';
import {watch} from './watch';
import * as path from 'path';

let serve = gulp.series(
  build,
  done => {
    new Karma({
      configFile: path.join(__dirname, '/../../karma.conf.js'),
      singleRun: !CLIOptions.hasFlag('watch')
    }, done).start();
  }
);

function log(message) {
  console.log(message); //eslint-disable-line no-console
}

let unit;

if (CLIOptions.hasFlag('watch')) {
  unit = gulp.parallel(
    serve,
    done => { watch(); done(); }
  );
} else {
  unit = serve;
}

export { unit as default };
