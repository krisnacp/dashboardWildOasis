import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogin() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { isPending: loadingLogin, mutate: loginMutate } = useMutation({
        mutationFn: login,

        onError: (error) => {
            console.log(`ERROR`, error);
            toast.error("Provided email or password are incorrect");
        },
        onSuccess: (user) => {
            queryClient.setQueryData(["user"], user?.user);
            navigate("/dashboard", { replace: true });
        },
    });

    return { loadingLogin, loginMutate };
}
