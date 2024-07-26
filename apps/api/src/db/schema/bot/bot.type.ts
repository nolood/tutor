type ButtonType = {
  callback: string; // SHOUD BE UNIQUE ON BOT INSTANCE
  text: string;
};

type KeyboardRow = ButtonType[];

type Keyboard = KeyboardRow[];

export type BotJSON = {
  callbacks: {
    [key: string]: {
      keyboard?: Keyboard;
      message: string;
    };
  };

  startKeyboard: Keyboard;

  startMessage: string;
};
