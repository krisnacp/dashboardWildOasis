import {
    useMutation,
    //  useQueryClient
} from "@tanstack/react-query";
import { signup } from "../../services/apiAuth";
// import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useSignup() {
    // const navigate = useNavigate();
    const { isPending: loadingSignup, mutate: signupMutate } = useMutation({
        mutationFn: signup,

        onError: (error) => {
            console.log(`ERROR`, error);
        },
        onSuccess: (user) => {
            console.log(user);
            toast.success(
                "Succesful for signing up account! Please verify the new account from the user's email address",
            );
        },
    });

    return { loadingSignup, signupMutate };
}
