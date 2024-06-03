import { getToday } from "../utils/helpers";
import { supabase } from "./supabase";

export async function getAllBookings(
    key = null,
    value = null,
    field = null,
    order = null,
    range,
    startRange,
    endRange,
) {
    // dalam rangka untuk menerapkan filtering pada sisi server, diperlukan sedikit perubahan pada struktur kode seperti dibawah ini
    let query = supabase
        .from("bookings")
        // dalam table yang memiliki hubungan dengan table lain melalui foreign key, kita bisa sekaligus me-retrieve/fetch data dari table lain tersebut melalui table yang memiliki foreign key, seperti contoh dibawah, dalam supabase, teknik fetching data ini disebut dengan "Querying referenced table with count", yaitu menuliskan nama table yang berhubungan dan menuliskan field/column mana yang akan diambil datanya
        .select(`*, guests(fullName,email), cabins(name)`, { count: "exact" });
    // .range(startRange, endRange);

    // console.log(key, value, field, order, startRange, endRange);

    // dengan perubahan kode menjadi seperti itu, program jadi mungkin untuk melakukan conditional method chaining agar bisa menggunakan filter sesuai dengan kebutuhan
    if (key && value && value !== "all" && !field && !order) {
        query = query.eq(key, value);
        console.log("masuk kondisi 1");
    }

    if (!key && !value && field && order) {
        query = query.order(field, {
            ascending: order === "asc",
        });
        console.log("masuk kondisi 2");
    }

    if (key && value && field && order && value !== "all") {
        query = query.eq(key, value).order(field, {
            ascending: order === "asc",
        });
        console.log("masuk kondisi 3");
    }

    if (value === "all" && field && order) {
        query = query.order(field, {
            ascending: order === "asc",
        });
        console.log("masuk kondisi 4");
    }

    if (range !== 0) {
        query = query.range(startRange, endRange);
        console.log("masuk kondisi 5");
    }

    const { data, count, error } = await query;

    if (error) {
        console.error(error);
        throw new Error("Booking not found");
    }

    return { data, count };
}

export async function getBooking(id) {
    const { data, error } = await supabase
        .from("bookings")
        .select("*, cabins(*), guests(*)")
        .eq("id", id)
        .single();

    if (error) {
        console.error(error);
        throw new Error("Booking not found");
    }

    return data;
}

// Returns all BOOKINGS that are were created after the given date. Useful to get bookings created in the last 30 days, for example.
export async function getBookingsAfterDate(date) {
    const { data, error } = await supabase
        .from("bookings")
        .select("created_at, totalPrice, extrasPrice")
        .gte("created_at", date)
        .lte("created_at", getToday({ end: true }));

    if (error) {
        console.error(error);
        throw new Error("Bookings could not get loaded");
    }

    return data;
}

// Returns all STAYS that are were created after the given date
export async function getStaysAfterDate(date) {
    const { data, error } = await supabase
        .from("bookings")
        .select("*, guests(fullName)")
        .gte("startDate", date)
        .lte("startDate", getToday());

    if (error) {
        console.error(error);
        throw new Error("Bookings could not get loaded");
    }

    return data;
}

// Activity means that there is a check in or a check out today
export async function getStaysTodayActivity() {
    const { data, error } = await supabase
        .from("bookings")
        .select("*, guests(fullName, nationality, countryFlag)")
        .or(
            `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`,
        )
        .order("created_at");

    // Equivalent to this. But by querying this, we only download the data we actually need, otherwise we would need ALL bookings ever created
    // (stay.status === 'unconfirmed' && isToday(new Date(stay.startDate))) ||
    // (stay.status === 'checked-in' && isToday(new Date(stay.endDate)))

    if (error) {
        console.error(error);
        throw new Error("Bookings could not get loaded");
    }
    return data;
}

export async function updateBooking(checkInOutData) {
    const { bookingId, checkingInOut } = checkInOutData;
    console.log(checkingInOut);
    const { data, error } = await supabase
        .from("bookings")
        .update(checkingInOut)
        .eq("id", bookingId)
        .select()
        .single();

    if (error) {
        console.error(error);
        throw new Error("Booking could not be updated");
    }
    return data;
}

export async function deleteBooking(id) {
    // REMEMBER RLS POLICIES
    const { data, error } = await supabase
        .from("bookings")
        .delete()
        .eq("id", id);

    if (error) {
        console.error(error);
        throw new Error("Booking could not be deleted");
    }
    return data;
}
