import { db } from "~/db";
import type { Logger } from "~/types/types";

export class Repository {
  protected db;

  protected log: Logger;

  constructor(log: Logger) {
    this.log = log;
    this.db = db;
  }
}
