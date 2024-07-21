import { ClusterManager } from "./clusters/cluster.manager";
import { env } from "./env";

const clusterManager = new ClusterManager(10);

clusterManager.addBot(env.TG_TOKEN1);
clusterManager.addBot(env.TG_TOKEN2);

console.log("Bots started");
