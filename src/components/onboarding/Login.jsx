import { useState, useReducer } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import sha256 from 'sha256';
import db from '../../firebase';
import { collection, query, where, getDocs } from "firebase/firestore/lite";

import { Alert, Avatar, Box, Button, Container, TextField, Typography } from "@mui/material";
import LockOpenIcon from '@mui/icons-material/LockOpen';

import useAuth from '../../hooks/useAuth';
import useConfig from '../../hooks/useConfig';
import loginReducer from '../../reducers/loginReducer';

function Login() {
    const { login } = useAuth();
    const { userDb } = useConfig();

    const navigate = useNavigate();
    const location = useLocation();
    const routeTo = location?.state?.from ? location.state.from : '/';

    const [loginForm, setLoginForm] = useState({ email: '', password: '' })
    const [loginData, loginDispatcher] = useReducer(loginReducer, { data: [], isLoading: false, isSuccess: true });


    const handleLogin = async (e) => {
        e.preventDefault();
        if (process.env.REACT_APP_ENV === "dev") {
            login({ email: 'deepakbisht@gmail.com', role: 'admin', name: 'Deepak Bisht' });
            navigate(routeTo, { replace: true });
            return;
        }
        loginDispatcher("INITIATE");
        if (!loginForm.email || !loginForm.password) {
            loginDispatcher("FAILURE_VALIDATION");
            return;
        }
        try {
            const loginQuery = query(collection(db, userDb), where("email", "==", loginForm.email), where("password", "==", sha256(loginForm.password)));
            const userInfoSnapshot = await getDocs(loginQuery);
            if (userInfoSnapshot.size) {
                const userData = [];
                userInfoSnapshot.forEach((doc) => { userData.push(createDataObject(doc.data())) })
                loginDispatcher("SUCCESS");
                login(userData[0]);
                navigate(routeTo, { replace: true });
            } else {
                loginDispatcher("FAILURE_ERROR");
            }
        } catch (err) {
            console.log(err)
            loginDispatcher("FAILURE_EXCEPTION");
        }
    }

    const createDataObject = (data) => {
        return {
            name: data.name,
            email: data.email,
            role: data.role
        }
    }
    const handleFieldChange = (e) => {
        const target = e.target;
        setLoginForm({
            ...loginForm,
            [target.name]: target.value
        })
    }

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                    <LockOpenIcon />
                </Avatar>
                <Typography component="h1" variant="h5" mb={2}>
                    Sign in
                </Typography>
                <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
                    {(!loginData.isSuccess && loginData?.message) &&
                        <Alert severity="error">{loginData.message}</Alert>
                    }
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={handleFieldChange}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={handleFieldChange}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={handleLogin}
                    >
                        Sign In
                    </Button>
                </Box>

            </Box>
        </Container >
    )
}

export default Login;
