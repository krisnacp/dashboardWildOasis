import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

import { useUpdateUser } from "./useUpdateUser";
import SpinnerMini from "../../ui/SpinnerMini";

function UpdatePasswordForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
        reset,
    } = useForm();

    const { password: passwordError, passwordConfirm } = errors;

    const { loadingUpdateUser, mutateUpdateUser } = useUpdateUser();

    function onSubmit({ password }) {
        mutateUpdateUser(
            { password },
            {
                onSuccess: () => {
                    reset();
                },
            },
        );
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <FormRow
                label="New password (min 8 characters)"
                error={passwordError}
            >
                <Input
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    disabled={loadingUpdateUser}
                    {...register("password", {
                        required: "This field is required",
                        minLength: {
                            value: 8,
                            message: "Password needs a minimum of 8 characters",
                        },
                    })}
                />
            </FormRow>

            <FormRow label="Confirm new password" error={passwordConfirm}>
                <Input
                    type="password"
                    autoComplete="new-password"
                    id="passwordConfirm"
                    disabled={loadingUpdateUser}
                    {...register("passwordConfirm", {
                        required: "This field is required",
                        validate: (value) =>
                            getValues("password") === value ||
                            "Password not match",
                    })}
                />
            </FormRow>

            <FormRow>
                <Button onClick={reset} type="reset" variation="secondary">
                    Cancel
                </Button>
                <Button disabled={loadingUpdateUser}>
                    {loadingUpdateUser ? <SpinnerMini /> : "Update password"}
                </Button>
            </FormRow>
        </Form>
    );
}

export default UpdatePasswordForm;
