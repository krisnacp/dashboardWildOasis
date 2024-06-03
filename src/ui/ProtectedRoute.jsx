import PropTypes from "prop-types";
import styled from "styled-components";

import { useUser } from "../features/authentication/useUser";

import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const FullPage = styled.div`
    height: 100vh;
    background-color: var(--color-grey-50);
    display: flex;
    align-items: center;
    justify-content: center;
`;

ProtectedRoute.propTypes = {
    children: PropTypes.node,
};
function ProtectedRoute({ children }) {
    const { loadingUser, user, isAuthenticated } = useUser();
    const navigate = useNavigate();
    useEffect(() => {
        // penggunaan loadingUser divalue conditionalnya untuk mencegah halaman segera berpindah ke /login ketika di-refresh, karena program butuh waktu untuk me-refecth data kembali, oleh karena itu loadingUser dibutuhkan
        if ((!isAuthenticated && !loadingUser) || !user)
            return navigate("/login", { replace: true });
    }, [isAuthenticated, navigate, loadingUser, user]);

    if (loadingUser)
        return (
            <FullPage>
                <Spinner />;
            </FullPage>
        );

    return children;
}

export default ProtectedRoute;
