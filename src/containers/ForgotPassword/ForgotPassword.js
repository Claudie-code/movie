import React, { useRef, useState } from 'react';
import { Grid, TextField, Button, Link, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useAuth } from '../../contexts/AuthContext';
import Title from "../../components/Title";
import Alert from '@material-ui/lab/Alert';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
      textAlign: 'center',
      width: 600,
      margin: '7rem auto',
      padding: theme.spacing(13)
    },
    margin: {
        marginTop: theme.spacing(4)
    }
}));

function ForgotPassword() {
    const classes = useStyles();
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
        <Paper className={classes.root}>
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
                    <Grid container justifyContent="flex-end" alignItems="flex-end" direction="column" spacing={1}className={classes.margin}>
                        <Grid item>
                            <Link href="/login" variant="body2">
                                Connexion
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="/signup" variant="body2">
                                Pas de compte? S'inscrire ici
                            </Link>
                        </Grid>
                    </Grid>
                </form>
        </Paper>
    );
}

export default ForgotPassword;
