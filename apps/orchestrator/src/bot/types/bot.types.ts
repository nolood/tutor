export enum EBotButtonType {
  CALLBACK = "callback",
  URL = "url",
}

type BotButtonType = {
  action: string;
  text: string;
  type: EBotButtonType;
};

type DataType = {
  keyboard: BotButtonType[][];
  message: string;
};

export type BotDataType = {
  callbacks: Record<string, DataType>;
  start: DataType;
};
