import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

// reafctoring function yang diabut menggunakan react-query menjadi custom hook
export function useDeleteCabin() {
    const queryClient = useQueryClient();
    const {
        isPending: loadingDelete,
        // isError,
        mutate: mutateDelete,
    } = useMutation({
        mutationFn: deleteCabin,
        onMutate: (variables) => {
            return { command: `deleting cabin item on id ${variables}` };
        },
        onSuccess: (data, variables, context) => {
            toast.success(`Succeed ${context.command}`);
        },
        onError: (err) => {
            // queryClient.setQueryData(['cabins'], context.previousTodos)
            toast.error(err.message);
        },
        onSettled: async () => {
            return await queryClient.invalidateQueries({
                queryKey: ["cabins"],
            });
        },
    });
    return { loadingDelete, mutateDelete };
}
