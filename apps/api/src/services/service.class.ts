import type { EModule, Logger } from "../types/types";

export class Service {
  public name: EModule;
  log: Logger;

  constructor(log: Logger, name: EModule) {
    this.name = name;
    this.log = log;
  }
}
