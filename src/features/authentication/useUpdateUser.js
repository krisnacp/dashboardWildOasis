import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCurrentUser } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useUpdateUser() {
    const queryClient = useQueryClient();
    const { isPending: loadingUpdateUser, mutate: mutateUpdateUser } =
        useMutation({
            mutationFn: updateCurrentUser,
            onError: (error) => {
                console.log(`ERROR`, error);
                toast.error("Error updating data");
            },
            onSuccess: (user) => {
                console.log(user);
                toast.success("Success updating user data");
                // queryClient.setQueryData(["user"], user);
            },
            onSettled: () => {
                queryClient.invalidateQueries({ queryKey: ["user"] });
            },
        });

    return { loadingUpdateUser, mutateUpdateUser };
}
