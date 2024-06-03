import { useQuery } from "@tanstack/react-query";
import { getAllCabins } from "../../services/apiCabins";

export function useCabins() {
    const { isLoading: loadingAllCabins, data: cabins } = useQuery({
        queryKey: ["cabins"],
        queryFn: getAllCabins,
    }); // *kegunaan dari property 'queryKey' adalah  untuk identifikasi jika nantinya, function yang dipanggil melalui property 'queryFn' pada file lain, method useQuery akan otomatis mem-fetch data yang sudah di-cache, bukan dari API atau servernya langsung;

    return { loadingAllCabins, cabins };
}
