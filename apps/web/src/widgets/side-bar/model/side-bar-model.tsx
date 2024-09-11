import { ISideBar } from "../types/side-bar-type";

export const sideBar = (role: string): ISideBar[] => {
  console.log(role);

  return [
    {
      id: 1,
      label: "Главная",
      icon: <></>,
    },
    {
      id: 2,
      label: "Боты",
      icon: <></>,
    },
  ];
};
