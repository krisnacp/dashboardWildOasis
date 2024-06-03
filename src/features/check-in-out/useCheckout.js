import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";

export function useCheckout() {
    const queryClient = useQueryClient();
    const checkingInOut = { status: "checked-out" };

    const { isPending: loadingCheckout, mutate: mutateCheckout } = useMutation({
        // kita bisa menggunakan mutation function dengan berbagai cara, bias melalui event handler pada file ayng bersangkutan, tau menambahkan parameter secara manual dari custom hook-nya sendiri
        mutationFn: (bookingId) => updateBooking({ bookingId, checkingInOut }),
        onMutate: (variables) => {
            return {
                command: `updating booking data to check-out on id ${variables}`,
            };
        },
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (data, variables, context) => {
            toast.success(`Succeed ${context.command}`);
        },
        onSettled: async () => {
            // return await queryClient.invalidateQueries({
            //     queryKey: ["bookings"],
            // });
            queryClient.invalidateQueries({ active: true });
        },
    });

    return { loadingCheckout, mutateCheckout };
}

export default useCheckout;
