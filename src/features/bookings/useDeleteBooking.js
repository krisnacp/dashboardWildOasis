import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useDeleteBooking() {
    const queryClient = useQueryClient();

    const { isPending: loadingDeleteBooking, mutate: mutateDeleteBooking } =
        useMutation({
            mutationFn: deleteBooking,
            onMutate: (variables) => {
                return {
                    command: `delete booking data on id ${variables}`,
                };
            },
            onError: (error) => {
                toast.error(error.message);
            },
            onSuccess: (data, variables, context) => {
                toast.success(`Succeed ${context.command}`);
            },
            onSettled: async () => {
                return await queryClient.invalidateQueries({
                    queryKey: ["bookings"],
                });
            },
        });

    return { loadingDeleteBooking, mutateDeleteBooking };
}
