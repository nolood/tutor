import { useMutation } from "@tanstack/react-query"
import toast from "react-hot-toast";

interface IArguments<T, K> {
	callBack: (params: K) => Promise<K>;
	onSuccess: (data: K) => void;
	onError: () => void;
}

export const useMutationQuery = <T, K>({ callBack, onSuccess, onError }: IArguments<T, K>) => {
	const mutation = useMutation({
		mutationFn: (params: K) => {
			return callBack(params)
		},
		onSuccess: (data) => {
			toast.success("");
			onSuccess(data);
		},
		onError(error) {
			toast.error(error.message);
			onError();
		},
	})
	const handleMutate = (params: K) => {
		mutation.mutate(params)
	}
	return { handleMutate } // я пытался сделать абстрактнй хук для мутаций react-query, но получается тоже самое, как будто бесполезная прослойка, буду еще думать как его сделать лучше
}