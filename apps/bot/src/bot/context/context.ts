import type logger from "@repo/logger";
import { type Scenes, type Context } from "telegraf";

export interface SessionData {
  isAuth?: boolean;
  userId?: string;
}

export interface IBotContext extends Context {
  log: typeof logger;

  scene: Scenes.SceneContextScene<IBotContext, Scenes.WizardSessionData>;

  state: SessionData;

  wizard: Scenes.WizardContextWizard<IBotContext>;
}
