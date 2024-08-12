import { useRouter } from "next/navigation";
import { sendRegister } from "../api/send-register";
import { IRegisterFields } from "../types/auth-types";
import { setTokenToHeaders } from "~/shared/api/api";
import toast from "react-hot-toast";
import { useSessionContext } from "~/app/_components/providers/session/session-context";
import { AxiosError } from "axios";

export const useRegister = () => {
	const router = useRouter();
	const { handleSetUser } = useSessionContext();

	const handleSend = async (params: IRegisterFields) => {
		try {
			const response = await sendRegister({ ...params });

			if (response.token) {
				setTokenToHeaders(response.token);
				toast.success('Регистрация прошла успешно');
				handleSetUser(response.user);
			}
			console.log(response);
		} catch (error) {
			if (error instanceof AxiosError) {
				toast.error(`Ошибка регистрации: ${error.response?.data?.message || error.message}`);
			} else {
				toast.error("Неизвестная ошибка");
			}
			console.error(error);
		}
	};

	return { handleSend };
};

