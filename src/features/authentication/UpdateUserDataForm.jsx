import { useState } from "react";

import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

import { useUser } from "./useUser";
import { useUpdateUser } from "./useUpdateUser";
import SpinnerMini from "../../ui/SpinnerMini";

function UpdateUserDataForm() {
    const { loadingUpdateUser, mutateUpdateUser } = useUpdateUser();
    // We don't need the loading state, and can immediately use the user data, because we know that it has already been loaded at this point
    const {
        user: {
            email,
            user_metadata: { fullName: currentFullName, avatar: currentAvatar },
        },
    } = useUser();
    // console.log(user_metadata);

    const [fullName, setFullName] = useState(currentFullName);
    const [avatar, setAvatar] = useState(currentAvatar);

    function handleSubmit(e) {
        if (!fullName) return;
        // const finalObject = {
        //     password: null,
        //     fullName: fullName,
        //     avatar: avatar,
        // };
        e.preventDefault();
        // mutateUpdateUser(finalObject, {
        mutateUpdateUser(
            { fullName, avatar },
            {
                onSuccess: () => {
                    e.target.reset();
                },
            },
        );
    }

    function handleCancel() {
        setFullName(currentFullName);
    }

    return (
        <Form onSubmit={handleSubmit}>
            {/* email form */}
            <FormRow label="Email address">
                <Input value={email} disabled />
            </FormRow>

            {/* fullName form */}
            <FormRow label="Full name">
                <Input
                    type="text"
                    value={fullName}
                    disabled={loadingUpdateUser}
                    onChange={(e) => setFullName(e.target.value)}
                    id="fullName"
                />
            </FormRow>

            {/* upload avatar form .files[0] */}
            <FormRow label="Avatar image">
                <FileInput
                    id="avatar"
                    accept="image/*"
                    disabled={loadingUpdateUser}
                    onChange={(e) => {
                        if (e.target.files[0] === null) return;
                        setAvatar(e.target.files[0]);
                    }}
                />
            </FormRow>

            <FormRow>
                <Button
                    type="reset"
                    variation="secondary"
                    disabled={loadingUpdateUser}
                    onClick={handleCancel}
                >
                    Cancel
                </Button>
                <Button disabled={loadingUpdateUser}>
                    {loadingUpdateUser ? <SpinnerMini /> : "Update account"}
                </Button>
            </FormRow>
        </Form>
    );
}

export default UpdateUserDataForm;
