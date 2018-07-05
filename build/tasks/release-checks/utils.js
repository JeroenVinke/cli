'use strict';

function killProc(proc) {
  proc.stdin.pause();
  proc.kill();
}

module.exports = {
  killProc
};

