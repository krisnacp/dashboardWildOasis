import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import { useNavigate } from "react-router-dom";

export function useCheckin() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { isPending: loadingCheckin, mutate: mutateCheckin } = useMutation({
        mutationFn: updateBooking,
        onMutate: (variables) => {
            return {
                command: `updating booking data to check-ins on id ${variables.id}`,
            };
        },
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (data, variables, context) => {
            toast.success(`Succeed ${context.command}`);
            navigate("/dashboard");
        },
        onSettled: async () => {
            // return await queryClient.invalidateQueries({
            //     queryKey: ["bookings"],
            // });
            queryClient.invalidateQueries({ active: true });
        },
    });

    return { loadingCheckin, mutateCheckin };
}

export default useCheckin;
