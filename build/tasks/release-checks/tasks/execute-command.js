'use strict';
const Task = require('./task');
const { killProc } = require('../utils');
const { spawn } = require('child_process');

module.exports = class ExecuteCommand extends Task {
  constructor(command, parameters, outputCallback, errorCallback, closeCallback) {
    super('Execute command');

    this.command = command;
    this.parameters = parameters;
    this.outputCallback = outputCallback;
    this.errorCallback = errorCallback;
    this.closeCallback = closeCallback;

    if (!this.errorCallback) {
      this.errorCallback = () => this.stop();
    }
    if (!this.closeCallback) {
      this.closeCallback = () => this.stop();
    }
  }

  execute() {
    this.proc = spawn(this.command, this.parameters);
    this.promise = new Promise((resolve) => {
      this.resolve = resolve;
    });

    this.proc.stdout.on('data', (data) => {
      this.outputCallback(data.toString());
    });

    this.proc.stderr.on('data', (data) => {
      this.outputCallback(data.toString());
      this.errorCallback(data.toString());
    });

    this.proc.on('close', (code) => {
      this.closeCallback(code);
    });

    return this.promise;
  }

  stop() {
    this.resolve();
    killProc(this.proc);
  }

  getTitle() {
    return super.getTitle() + ` (command: ${this.command} ${this.parameters.join(' ')})`;
  }
};
