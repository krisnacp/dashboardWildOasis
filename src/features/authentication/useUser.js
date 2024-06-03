import { useQuery } from "@tanstack/react-query";

import { getCurrentUser } from "../../services/apiAuth";

export function useUser() {
    const { isPending: loadingUser, data: user } = useQuery({
        queryKey: ["user"],
        queryFn: getCurrentUser,
    });

    return {
        loadingUser,
        user,
        isAuthenticated: user?.role === "authenticated",
    };
}
