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
        maxWidth: 500,
        margin: '11rem auto',
        padding: theme.spacing(5)
    },
    margin: {
        marginTop: theme.spacing(4)
    }
}));

function Login() {
    const classes = useStyles();
    const emailRef = useRef();
    const passwordRef = useRef();
    const { login, getFavorites } = useAuth();
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
            history.push('/');
        } catch {
            setError('Echec de la connexion');
        }
        setLoading(false);
    };

    return (
        <Paper className={classes.root}>
            <Title>Connexion</Title>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        {error && <Alert severity="error">{error}</Alert>}
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
                <Grid container justifyContent="flex-end" alignItems="flex-end" direction="column" spacing={1}className={classes.margin}>
                    <Grid item>
                        <Link href="/forgot-password" variant="body2">
                            Mot de passe oublié?
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

export default Login;
