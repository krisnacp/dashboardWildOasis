import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useAddCabin() {
    const queryClient = useQueryClient();

    const {
        isPending: loadingAdd,
        // isError,
        mutate: mutateAdd,
    } = useMutation({
        mutationFn: addCabin,
        onMutate: () => {
            return { command: `creating new cabin item` };
        },
        onSuccess: (data, variables, context) => {
            toast.success(`Succeed ${context.command}`);
        },
        onError: (err) => {
            toast.error(err.message);
        },
        onSettled: async () => {
            return await queryClient.invalidateQueries({
                queryKey: ["cabins"],
            });
        },
    });

    return { loadingAdd, mutateAdd };
}
