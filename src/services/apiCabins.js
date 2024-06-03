import { supabase } from "./supabase";

// TODO: get all cabins data in database
export async function getAllCabins() {
    const { data: cabins, error } = await supabase.from("cabins").select("*");

    if (error) {
        console.log(error);
        throw new Error("Cabins could not be loaded");
    }
    return cabins;
}

// TODO: delete existing cabin data in database by id
export async function deleteCabin(id) {
    const { data, error } = await supabase.from("cabins").delete().eq("id", id);
    if (error) {
        console.log(error);
        throw new Error("Cabin item could not be deleted");
    }
    return data;
}

// TODO: creating new cabin data in database
export async function addCabin(cabinData) {
    // meng-import base url dari supabase untuk meng-upload data image ke databse
    const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL;
    const { description, discount, image, maxCapacity, name, regularPrice } =
        cabinData;
    // untuk membuat nama file dari image yang di-inputkan menjadi unique, kita bisa melakukannya dengan cara berikut:
    const imageName = `${Math.random()}-${image.name}`.replaceAll("/", "");

    const { data, error } = await supabase
        .from("cabins")
        .insert([
            {
                description,
                discount,
                // refactor program untuk impelentasi fitur duplikat cabin
                image:
                    typeof image === "object"
                        ? `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`
                        : image,
                maxCapacity,
                name,
                regularPrice,
            },
        ])
        .select();
    if (error) {
        console.log(error);
        throw new Error("Cabin item could not be added");
    }

    // refactor program untuk impelentasi fitur duplikat cabin
    if (typeof image === "object") {
        const { error: errorStorage } = await supabase.storage
            .from("cabin-images")
            .upload(imageName, image);
        if (errorStorage) {
            // handle error jika image gagal di-upload dancabin data lain dari cabin item akan dihapus untuk mencegah cabin item dibuat ketika file gagal di-upload
            await supabase.from("cabins").delete().eq("id", data.id);
            console.log(errorStorage);
            throw new Error(
                "Cabin image item could not be uploaded and cabin item was not added",
            );
        }
    }

    return data;
}

// TODO: update existing cabin data in database by id
export async function updateCabin(cabin) {
    const { id, image } = cabin;
    console.log(typeof image);
    const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL;
    const imageName = `${Math.random()}-${image.name}`.replaceAll("/", "");
    const cabinWithUpdatedImage = {
        ...cabin,
        image:
            typeof image === "object"
                ? `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`
                : image,
    };

    // ?update logic
    const { data, error } = await supabase
        .from("cabins")
        .update(cabinWithUpdatedImage)
        .eq("id", id)
        .select();
    if (error) {
        console.log(error);
        throw new Error("Cabin item could not be updated");
    }

    if (typeof image === "object") {
        const { error: errorStorage } = await supabase.storage
            .from("cabin-images")
            .upload(imageName, image);
        if (errorStorage) {
            console.log(errorStorage);
            throw new Error(
                "Cabin image item could not be uploaded and cabin item was not added",
            );
        }
    }

    return data;
}
