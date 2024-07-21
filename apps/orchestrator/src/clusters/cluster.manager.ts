import { Cluster } from "./cluster.bot";

export class ClusterManager {
  maxBotsPerCluster: number;
  clusters: Cluster[];

  constructor(maxBotsPerCluster: number) {
    this.maxBotsPerCluster = maxBotsPerCluster;
    this.clusters = [];
  }

  createCluster = () => {
    const cluster = new Cluster(
      String(this.clusters.length + 1),
      this.maxBotsPerCluster,
    );
    this.clusters.push(cluster);
    return cluster;
  };

  addBot = (token: string) => {
    let cluster = this.clusters.find(
      (c) => c.bots.length < this.maxBotsPerCluster,
    );

    if (!cluster) {
      cluster = this.createCluster();
    }

    cluster.addBot(token);
  };
}
