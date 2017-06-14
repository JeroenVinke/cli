'use strict';

module.exports = class {
  execute(context) {
    let switchVariable = context.state[this.stateProperty];

    if (switchVariable.id) {
      switchVariable = switchVariable.id;
    }
    console.log(switchVariable);

    let found = this.branches.find(x => x.case === switchVariable)
      || this.branches.find(x => x.case === 'default');

    context.next(found.nextActivity);
  }
};
