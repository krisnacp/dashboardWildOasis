import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogout() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { isPending: loadingLogout, mutate: mutateLogout } = useMutation({
        mutationFn: logout,
        // onMutate: (variables) => {
        //     // A mutation is about to happen!

        //    // Optionally return a context containing data to use when for example rolling back
        //     return { id: 1 };
        // },
        onError: (error) => {
            console.log(`ERROR`, error);
            toast.error("Error while logging out");
        },
        onSuccess: (user) => {
            navigate("/login", { replace: true });
            // queryClient.setQueriesData(["user"], user);
            queryClient.removeQueries("user");
        },
        // onSettled: (data, error, variables, context) => {
        //     // Error or success... doesn't matter!
        // },
    });

    return { loadingLogout, mutateLogout };
}
