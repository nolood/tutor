import type { ChildProcess } from "child_process";
import { fork } from "child_process";
import path from "path";

export class Cluster {
  id: string;
  bots: string[] = [];
  process: ChildProcess;
  maxBots: number;

  constructor(id: string, maxBots: number) {
    this.id = id;
    this.maxBots = maxBots;

    this.process = fork(path.resolve(__dirname, "clusterProcess.js"));

    this.process.on("message", (msg: { type: string }) => {
      if (msg.type === "BOT_ADDED") {
        console.log(`Bot added to cluster ${this.id}`);
      }
    });
  }

  addBot = (token: string) => {
    this.bots.push(token);
    this.process.send({ token, type: "BOT_ADD" });
    console.log("Bot add start");
  };
}
