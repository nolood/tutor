import { ReactNode } from "react"
import SideBar from "~/widgets/side-bar/ui/side-bar"

const MainLayout = ({children}: {children:ReactNode}) => {
	return (
		<div className={"w-full h-[100vh] flex items-start"}>					
			<SideBar/>
			{children}
		</div>
	)
}

export default MainLayout