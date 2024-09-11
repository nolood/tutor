import { sideBar } from "../model/side-bar-model";

const SideBar = () => {
  return (
    <div>
      {sideBar("").map((item) => (
        <p>{item.label}</p>
      ))}
    </div>
  );
};

export default SideBar;
