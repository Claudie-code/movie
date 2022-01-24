import React, { useRef, useState } from 'react';
import { Grid, TextField, Button, Link, Paper } from '@material-ui/core';
import { useAuth } from '../../contexts/AuthContext';
import Title from "../../components/Title";
import Alert from '@material-ui/lab/Alert';

function ForgotPassword() {
    const emailRef = useRef();
    const { resetPassword } = useAuth();
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            setMessage('');
            setLoading(true);
            setError('');
            await resetPassword(emailRef.current.value);
            setMessage('Vérifiez votre boite mail pour suivre les instructions supplémentaires');
        } catch {
            setError('Echec de la réinitialisation');
        }
        setLoading(false);
    };

    return (
        <>
                <Title>Réinitialisation du mot de passe</Title>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            {error && <Alert severity="error">{error}</Alert>}
                            {message && <Alert severity="success">{message}</Alert>}
                        </Grid>
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
                        <Grid item xs={12} >
                            <Button 
                                disabled={loading}
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                            >
                                Réinitialiser le mot de passe
                            </Button>
                        </Grid>
                    </Grid>
                </form>
        </>
    );
}

export default ForgotPassword;
