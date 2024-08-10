import { Scenes } from "telegraf";

import type { IBotContext } from "../context/context";

export class Scene extends Scenes.BaseScene<IBotContext> {
  constructor(scene: string) {
    super(scene);
  }
}
