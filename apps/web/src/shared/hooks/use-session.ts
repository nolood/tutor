import { useState } from "react";
import { IUserType } from "../types/user-type";

export const useSession = () => {
	const [user, setUser] = useState<IUserType>();

	const handleSetUser = (user: IUserType) => {
		setUser(user);
	}
	return { user, handleSetUser }
};
