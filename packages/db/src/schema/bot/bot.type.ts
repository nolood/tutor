type ButtonType = {
  callback: string; // SHOUD BE UNIQUE ON BOT INSTANCE
  text: string; 
};

interface Kek {
  lol: string
}

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
