import type { EModule, Logger } from "../types/types";

export class Handler {
  public name: EModule;

  protected log: Logger;

  constructor(log: Logger, name: EModule) {
    this.name = name;
    this.log = log;
  }

  register = () => {};
}
