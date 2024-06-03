import { supabase } from "./supabase";

export async function login(loginData) {
    const { email, password } = loginData;
    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    });

    if (error) {
        console.error(error);
        throw new Error("Error while logging in");
    }
    return data;
}

// TODO: membuat function untuk implementasi protected route. Jika biasanya protected route digunakan menggunakan useContext, dengan supabase, kita bisa menggunakannya dengan cara sederhana, yaitu langsung me-retrieve acces token dari sessionlangsung dari autentikasi database
export async function getCurrentUser() {
    // mendapatkan object session. Data dari object session dan user hanya akan muncul jika ser sudah melakukan login dan access token diterima
    const { data: session, error } = await supabase.auth.getSession();
    if (!session.session) return null;
    if (error) {
        console.error(error);
        throw new Error("Error while getting session");
    }

    // setelah mendapatkan session object, kemudian mendapatkan nilai dari object user
    const { data: user, error: errUser } = await supabase.auth.getUser();
    if (errUser) {
        console.error(errUser);
        throw new Error("Error while getting user data");
    }
    return user?.user;
}

export async function logout() {
    const { error } = await supabase.auth.signOut();

    if (error) {
        console.log(error);
        throw new Error("Error while logging out");
    }
}

export async function signup(signUpData) {
    const { email, password, fullName } = signUpData;
    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
            data: {
                fullName,
                avatar: "",
            },
        },
    });

    if (error) {
        console.log(error);
        throw new Error("Error while signing up");
    }

    return data;
}

// export async function updateCurrentUser(updateData) {
export async function updateCurrentUser({ password, fullName, avatar }) {
    // const { password, fullName, avatar } = updateData;
    console.log(password, fullName, avatar);

    const avatarName = `${Math.random()}-${avatar?.name}`.replaceAll("/", "");

    // base condition is, when user update the fullName and avatar updated or not
    let query = supabase.auth.updateUser({
        data: {
            fullName,
            avatar:
                typeof avatar === "object"
                    ? `https://diuzqbfnayeuptfdgqbi.supabase.co/storage/v1/object/public/avatars/${avatarName}`
                    : avatar,
        },
    });

    // upload avatar image when the avatar exist
    if (typeof avatar === "object") {
        const { data: avatarData, error: avatarError } = await supabase.storage
            .from("avatars")
            .upload(avatarName, avatar, {
                cacheControl: "3600",
                upsert: false,
            });

        if (avatarError) {
            console.log(avatarError);
            throw new Error("Error while uploading avatar image");
        }

        console.log(avatarData);
    }

    // if password exist, then update password
    if (password) {
        query = supabase.auth.updateUser({ password });
    }

    const { data, error } = await query;

    if (error) {
        console.log(error);
        throw new Error("Error while updating user data");
    }

    return data;
}
