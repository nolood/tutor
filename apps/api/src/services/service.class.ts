import type { Logger } from "../types/types";

export class Service {
  log: Logger;

  constructor(log: Logger) {
    this.log = log;
  }
}
