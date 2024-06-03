import { useSettings } from "./useSettings";
import { useUpdateSettings } from "./useUpdateSettings";

import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";

function UpdateSettingsForm() {
    const {
        loadingAllSettings,
        settings: {
            minBookingLength,
            maxBookingLength,
            maxGuestsPerBooking,
            breakfastPrice,
        } = {},
    } = useSettings();
    const { loadingUpdateSettings, mutateUpdateSettings } = useUpdateSettings();

    // return <Spinner />;
    if (loadingAllSettings) return <Spinner />;

    function handleBlur(e, field) {
        const { value } = e.target;

        if (!value) return;
        mutateUpdateSettings({ [field]: value });
    }

    // This time we are using UNCONTROLLED fields, so we will NOT store state
    return (
        <Form>
            <FormRow label="Minimum nights/booking">
                <Input
                    type="number"
                    defaultValue={minBookingLength}
                    onBlur={(e) => handleBlur(e, "minBookingLength")}
                    disabled={loadingUpdateSettings}
                    id="min-nights"
                />
            </FormRow>
            <FormRow label="Maximum nights/booking">
                <Input
                    type="number"
                    defaultValue={maxBookingLength}
                    onBlur={(e) => handleBlur(e, "maxBookingLength")}
                    disabled={loadingUpdateSettings}
                    id="max-nights"
                />
            </FormRow>
            <FormRow label="Maximum guests/booking">
                <Input
                    type="number"
                    defaultValue={maxGuestsPerBooking}
                    onBlur={(e) => handleBlur(e, "maxGuestsPerBooking")}
                    disabled={loadingUpdateSettings}
                    id="max-guests"
                />
            </FormRow>
            <FormRow label="Breakfast price">
                <Input
                    type="number"
                    defaultValue={breakfastPrice}
                    onBlur={(e) => handleBlur(e, "breakfastPrice")}
                    disabled={loadingUpdateSettings}
                    id="breakfast-price"
                />
            </FormRow>
        </Form>
    );
}

export default UpdateSettingsForm;
