type Button = {
  callback: string;
  text: string; // SHOUD BE UNIQUE ON BOT INSTANCE
};

type KeyboardRow = Button[];

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
