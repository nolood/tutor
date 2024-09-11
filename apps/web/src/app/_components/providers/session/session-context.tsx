'use client'

import { createContext, useContext } from "react";
import { useSession } from "~/shared/hooks/use-session";

type SessionProviderType = ReturnType<typeof useSession>

export const SessionContext = createContext<SessionProviderType>({} as SessionProviderType);


export const useSessionContext = () => {
	if(!SessionContext) {
		throw new Error("Session context is not defined");
	}
	return useContext(SessionContext);
}
