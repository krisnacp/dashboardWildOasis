import toast from "react-hot-toast";
import { updateCabin } from "../../services/apiCabins";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateCabin() {
    const queryClient = useQueryClient();
    const { isPending: loadingUpdate, mutate: mutateUpdate } = useMutation({
        mutationFn: updateCabin,
        onMutate: (variables) => {
            return { command: `updating cabin item on id ${variables.id}` };
        },
        onSuccess: (data, variables, context) => {
            toast.success(`Succeed ${context.command}`);
        },
        onError: (err) => {
            toast.error(err.message);
        },
        onSettled: async () => {
            return await queryClient.invalidateQueries({
                queryKey: ["booking"],
            });
        },
    });

    return { loadingUpdate, mutateUpdate };
}
