import React, { useRef, useState } from 'react';
import { Grid, TextField, Button, Divider } from '@material-ui/core';
import { useAuth } from '../../contexts/AuthContext';
import Title from "../../components/Title";
import Alert from '@material-ui/lab/Alert';
import { useHistory } from 'react-router-dom';
import GoogleButton from 'react-google-button'

function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { login, getFavorites, signupGoogle } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            setLoading(true);
            setError('');
            await login(emailRef.current.value, passwordRef.current.value);
            getFavorites();
            window.location.reload();
            history.push('/');
        } catch {
            setError('Echec de la connexion');
        }
        setLoading(false);
    };

    async function handleClick() {
        try {
            setError('');
            await signupGoogle();
            getFavorites();
            window.location.reload();
            history.push('/');
        } catch(error) {
            setError('Echec de la connexion');
        }
        setLoading(false);
    };

    return (
        <>
            <Title>Connexion</Title>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        {error && <Alert severity="error">{error}</Alert>}
                    </Grid>
                    <Grid item xs={12}>
                        <GoogleButton style={{margin: "auto"}} onClick={handleClick}></GoogleButton>
                    </Grid>
                    <Divider style={{width:'100%', margin: "1rem 0"}} />
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="email"
                            label="Adresse email"
                            name="email"
                            autoComplete="email"
                            inputRef={emailRef}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            name="password"
                            label="Mot de passe"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            inputRef={passwordRef}
                        />
                    </Grid>
                    <Grid item xs={12} >
                        <Button 
                            disabled={loading}
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                        >
                            Se connecter
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </>
    );
}

export default Login;
