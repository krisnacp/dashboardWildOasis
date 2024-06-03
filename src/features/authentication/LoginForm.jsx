import { useEffect, useState } from "react";
import {
    // useLocation,
    useNavigate,
} from "react-router-dom";

import { useLogin } from "./useLogin";
import { useUser } from "./useUser";

import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRowVertical from "../../ui/FormRowVertical";
import SpinnerMini from "../../ui/SpinnerMini";

function LoginForm() {
    const [email, setEmail] = useState("kris@mail.com");
    const [password, setPassword] = useState("ffffffff");
    const { loadingLogin, loginMutate } = useLogin();

    const { user, isAuthenticated } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated && user)
            return navigate("/dashboard", { replace: true });
    }, [navigate, isAuthenticated, user]);

    function handleSubmit(e) {
        if (!email || !password) return;
        e.preventDefault();
        loginMutate({ email, password });
    }

    return (
        <Form onSubmit={handleSubmit}>
            <FormRowVertical label="Email address">
                <Input
                    type="email"
                    id="email"
                    // This makes this form better for password managers
                    autoComplete="username"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </FormRowVertical>

            <FormRowVertical label="Password">
                <Input
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </FormRowVertical>

            <FormRowVertical>
                <Button size="large">
                    {loadingLogin ? <SpinnerMini /> : "Login"}
                </Button>
            </FormRowVertical>
        </Form>
    );
}

export default LoginForm;
