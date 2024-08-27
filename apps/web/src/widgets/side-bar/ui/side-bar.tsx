import { sideBarData } from "../model/side-bar-data";

const SideBar = () => {
	return (
		<ul>
			{sideBarData.map((item) => (
				<li>{item.label}</li>
			))}
		</ul>
	)
}

export default SideBar;