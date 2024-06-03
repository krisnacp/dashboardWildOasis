import toast from "react-hot-toast";
import { updateSetting } from "../../services/apiSettings";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateSettings() {
    const queryClient = useQueryClient();
    const { isPending: loadingUpdateSettings, mutate: mutateUpdateSettings } =
        useMutation({
            mutationFn: updateSetting,
            onMutate: (variables) => {
                console.log(variables);
                return { command: `updating setting` };
            },
            onSuccess: (data, variables, context) => {
                toast.success(`Succeed ${context.command}`);
            },
            onError: (err) => {
                toast.error(err.message);
            },
            onSettled: async () => {
                return await queryClient.invalidateQueries({
                    queryKey: ["settings"],
                });
            },
        });

    return { loadingUpdateSettings, mutateUpdateSettings };
}
