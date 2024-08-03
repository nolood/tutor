import { db } from "~/db";
import type { EModule, Logger } from "~/types/types";

export class Repository {
  protected db;
  protected log: Logger;
  public name: EModule;

  constructor(log: Logger, name: EModule) {
    this.name = name;
    this.log = log;
    this.db = db;
  }
}
