import { ReactNode } from "react"
import MainLayout from "./main-layout"

const Layout = ({children}: {children:ReactNode}) => {
	return (
		<MainLayout>{children}</MainLayout>
	)
}

export default Layout