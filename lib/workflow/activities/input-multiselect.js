'use strict';
const UI = require('../../ui').UI;

module.exports = class {
  static inject() { return [UI]; }

  constructor(ui) {
    this.ui = ui;
  }

  execute(context) {
    return this.ui.multiselect(this.question, this.options).then(answers => {
      for (let i = 0; i < answers.length; i++) {
        let answer = answers[i];
        let currentValue = context.state[answer.stateProperty];

        if (answer.type && answer.type === 'array') {
          if (currentValue && currentValue instanceof Array) {
            currentValue.push(answer.value);
          } else {
            context.state[answer.stateProperty] = [answer.value];
          }
        } else {
          context.state[answer.stateProperty] = answer.value;
        }
      }
      context.next(this.nextActivity);
    });
  }
};
