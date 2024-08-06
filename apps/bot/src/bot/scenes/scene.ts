import { Scenes } from "telegraf";

import type { IBotContext } from "../context/context";

export class Scene extends Scenes.BaseScene<IBotContext> {
  data: string[] = [];

  constructor(scene: string) {
    super(scene);
  }
}
