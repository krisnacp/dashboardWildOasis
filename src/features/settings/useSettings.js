import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";

export function useSettings() {
    const { isLoading: loadingAllSettings, data: settings } = useQuery({
        queryKey: ["settings"],
        queryFn: getSettings,
    });

    return { loadingAllSettings, settings };
}
