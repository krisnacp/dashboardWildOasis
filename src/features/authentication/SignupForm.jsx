import { useForm } from "react-hook-form";

import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSignup } from "./useSignup";
import SpinnerMini from "../../ui/SpinnerMini";

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
    const { loadingSignup, signupMutate } = useSignup();
    const {
        register,
        handleSubmit,
        getValues,
        reset,
        formState: { errors },
    } = useForm();
    const { email, fullName, password, passwordConfirm } = errors;

    function handleSubmitSignup(data) {
        console.log(data);
        const finalData = {
            email: data?.email,
            password: data?.password,
            fullName: data?.fullName,
        };
        signupMutate(finalData, {
            onSettled: () => {
                reset();
            },
        });
    }

    return (
        <Form onSubmit={handleSubmit(handleSubmitSignup)}>
            <FormRow label="Full name" error={fullName}>
                <Input
                    type="text"
                    id="fullName"
                    disabled={loadingSignup}
                    {...register("fullName", {
                        required: "This field is required",
                    })}
                />
            </FormRow>

            <FormRow label="Email address" error={email}>
                <Input
                    type="email"
                    id="email"
                    disabled={loadingSignup}
                    {...register("email", {
                        required: "This field is required",
                        pattern: {
                            value: /\S+@\S+\.\S+/,
                            message: "Please provide a valid email",
                        },
                    })}
                />
            </FormRow>

            <FormRow label="Password (min 8 characters)" error={password}>
                <Input
                    type="password"
                    id="password"
                    disabled={loadingSignup}
                    {...register("password", {
                        required: "This field is required",
                        minLength: {
                            value: 8,
                            message: "Password needs a minimum of 8 character",
                        },
                    })}
                />
            </FormRow>

            <FormRow label="Repeat password" error={passwordConfirm}>
                <Input
                    type="password"
                    id="passwordConfirm"
                    disabled={loadingSignup}
                    {...register("passwordConfirm", {
                        required: "This field is required",
                        validate: (value) =>
                            value === getValues("password") ||
                            "Password not match",
                    })}
                />
            </FormRow>

            <FormRow>
                {/* type is an HTML attribute! */}
                <Button
                    disabled={loadingSignup}
                    variation="secondary"
                    type="reset"
                >
                    Cancel
                </Button>
                <Button disabled={loadingSignup}>
                    {loadingSignup ? <SpinnerMini /> : "Create new user"}
                </Button>
            </FormRow>
        </Form>
    );
}

export default SignupForm;
