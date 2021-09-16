import React, { useRef, useState } from 'react';
import { Paper, Grid, TextField, Button, Link } from '@material-ui/core';
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
        width: 500,
        margin: '6rem auto',
        padding: theme.spacing(13)
    },
    margin: {
        marginTop: theme.spacing(4)
    }
}));

function Signup(props) {
    const classes = useStyles();
    const lnameRef = useRef();
    const fnameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const { signup, createDisplayName, createUserCollection, getFavorites } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    async function handleSubmit(event) {
        event.preventDefault();
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Passwords do not match');
        }
        try {
            setLoading(true);
            setError('');
            await signup(emailRef.current.value, passwordRef.current.value);
            await createDisplayName(`${fnameRef.current.value} ${lnameRef.current.value}`);
            await createUserCollection();
            getFavorites();
            history.push('/');

        } catch {
            setError('Erreur lors de la création du compte');
        }
        setLoading(false);
    };

    return (
        <Paper className={classes.root}>
            <Title>Inscription</Title>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        {error && <Alert severity="error">{error}</Alert>}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            autoComplete="fname"
                            name="prenom"
                            variant="outlined"
                            required
                            fullWidth
                            id="prenom"
                            label="Prénom"
                            autoFocus
                            inputRef={fnameRef}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            autoComplete="lname"
                            name="nom"
                            variant="outlined"
                            required
                            fullWidth
                            id="nom"
                            label="Nom"
                            autoFocus
                            inputRef={lnameRef}
                        />
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
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            name="passwordConfirm"
                            label="Confirmer le mot de passe"
                            type="password"
                            id="passwordConfirm"
                            autoComplete="current-passwordConfirm"
                            inputRef={passwordConfirmRef}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            disabled={loading}
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                        >
                            S'incrire
                        </Button>
                    </Grid>
                </Grid>
                <Grid container justifyContent="flex-end" spacing={2} className={classes.margin}>
                    <Grid item>
                    <Link href="/login" variant="body2">
                        Déjà inscrit? Se connecter ici
                    </Link>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    );
}

export default Signup;
