import type { Logger } from "../types/types";

export class Handler {
  protected log: Logger;

  constructor(log: Logger) {
    this.log = log;
  }

  register = () => {};
}
