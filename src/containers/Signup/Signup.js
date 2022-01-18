import React, { useState, useMemo } from 'react';
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
        maxWidth: 500,
        margin: '2rem auto',
        padding: theme.spacing(5)
    },
    margin: {
        marginTop: theme.spacing(4)
    }
}));

function Signup(props) {
    const classes = useStyles();
    const { signup, updateDisplayName, createUserCollection, getFavorites } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [password, setPassword] = useState();
    const [passwordConfirm, setPasswordConfirm] = useState();
    const [email, setEmail] = useState();
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [textValidation, setTextValidation] = useState("");
    const [errorPassword, setErrorPassword] = useState(false);
    const history = useHistory();

    const passwordValidation = (password) => {
        setPassword(password);
        const pattern = new RegExp(
            "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[-+_!@#$%^&*.,?]).+$"
        );
        if (password.length > 0 && password.length < 8) {
            setTextValidation('Le mot de passe doit faire plus de 8 caractères.');
            setErrorPassword(true);
        } else if (!pattern.test(password)) {
            setTextValidation('Le mot de passe doit contenir au moins une lettre minuscule et une lettre majuscule, un caractère spécial et un chiffre.');
            setErrorPassword(true);
        } else {
            setTextValidation('');
            setErrorPassword(false);
        }
    }

    const isValid = useMemo(() => {
        if(firstName === "" && lastName === "") {
            return false;
        }
        if(password === "" && passwordConfirm === "") {
            return false;
        }
        if(email === "") {
            return false;
        }
        return true;
    }, [password, passwordConfirm, email, lastName, firstName]);

    async function handleSubmit(event) {
        event.preventDefault();
        if (password !== passwordConfirm) {
            return setError('Les mots de passe ne correspondent pas');
        }
        try {
            setLoading(true);
            setError('');
            await signup(email, password);
            await updateDisplayName(`${firstName} ${lastName}`);
            await createUserCollection();
            getFavorites();
            history.push('/');
        } catch(error) {
            if(error.code === "auth/email-already-in-use") {
                setError("L'adresse email est déjà utilisée");
            }
        }
        setLoading(false);
    };
    console.log(loading, isValid)
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
                            value={firstName}
                            onChange={event => setFirstName(event.target.value)}
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
                            value={lastName}
                            onChange={event => setLastName(event.target.value)}
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
                            value={email}
                            onChange={event => setEmail(event.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            error={errorPassword}
                            variant="outlined"
                            required
                            fullWidth
                            name="password"
                            label="Mot de passe"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={event => setPassword(event.target.value)}
                            helperText={textValidation}
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
                            value={passwordConfirm}
                            onChange={event => setPasswordConfirm(event.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            disabled={loading && isValid}
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
