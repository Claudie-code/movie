import React, { useState, useMemo } from 'react';
import { Paper, Grid, TextField, Button, Link, InputAdornment, IconButton } from '@material-ui/core';
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { makeStyles } from '@material-ui/core/styles';
import { useAuth } from '../../contexts/AuthContext';
import Title from "../../components/Title";
import Alert from '@material-ui/lab/Alert';
import { useHistory } from 'react-router-dom';
import { isEmail } from 'validator';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        textAlign: 'center',
        maxWidth: 500,
        margin: '7rem auto',
        padding: theme.spacing(5)
    },
    margin: {
        marginTop: theme.spacing(4)
    }
}));

function Signup() {
    const classes = useStyles();
    const { signup, updateDisplayName, createUserCollection, getFavorites } = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [formValues, setFormValues] = useState({
        prenom: '', 
        nom: '', 
        email: '', 
        password: '', 
        passwordConfirm: ''
    });
    const [textValidation, setTextValidation] = useState("");
    const [textPasswordConfirmation, setTextPasswordConfirmation] = useState("");
    const [textEmailConfirmation, setTextEmailConfirmation] = useState("");
    const [errorPassword, setErrorPassword] = useState(false);
    const [errorPasswordConfirmation, setErrorPasswordConfirmation] = useState(false);
    const [errorEmailConfirmation, setErrorEmailConfirmation] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const history = useHistory();

    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);
    const handleOnChange = (event, value) => {
        const val = value?.toLowerCase() ?? event.target.value;
        setFormValues(prevState => (
            { ...prevState, 
                [event.target.name] : val,
            }
        ));
    };

    const passwordValidation = (event, value) => {
        const password = value?.toLowerCase() ?? event.target.value;
        handleOnChange(event, value);
        const pattern = new RegExp(
            "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[-+_!@#$%^&*.,?]).+$"
        );
        if(password.length === 0) {
            setTextValidation('');
            setErrorPassword(false);
            return;
        }
        if (password.length < 8) {
            setTextValidation('Le mot de passe doit faire plus de 8 caractères.');
            setErrorPassword(true);
        } else if (!pattern.test(password)) {
            setTextValidation('Le mot de passe doit contenir au moins une lettre minuscule et une lettre majuscule, un caractère spécial et un chiffre.');
            setErrorPassword(true);
        } else {
            setTextValidation('');
            setErrorPassword(false);
        }
    };

    const passwordConfirmation = (event, value) => {
        const passwordConfirm = value?.toLowerCase() ?? event.target.value;
        handleOnChange(event, value);
        if (passwordConfirm !== formValues.password) {
            setTextPasswordConfirmation("Le mot de passe doit être identique.");
            setErrorPasswordConfirmation(true);
        } else {
            setTextPasswordConfirmation("");
            setErrorPasswordConfirmation(false);
        }
    };

    const emailConfirmation = (event, value) => {
        const emailConfirm = value?.toLowerCase() ?? event.target.value;
        handleOnChange(event, value);
        if(emailConfirm.length === 0) {
            setTextEmailConfirmation("");
            setErrorEmailConfirmation(false);
            return;
        }
        if (!isEmail(emailConfirm)) {
            setTextEmailConfirmation("L'email n'est pas valide.");
            setErrorEmailConfirmation(true);
        } else {
            setTextEmailConfirmation("");
            setErrorEmailConfirmation(false);
        }
    };

    const isValid = useMemo(
        () => Object.values({
            ...formValues, 
            errorPassword: !errorPassword, 
            errorPasswordConfirmation: !errorPasswordConfirmation,
            errorEmailConfirmation: !errorEmailConfirmation,
        }).some(element => element == false)
    , [formValues, handleOnChange, errorPasswordConfirmation, errorPassword]);

    async function handleSubmit(event) {
        event.preventDefault();
        if (formValues.password !== formValues.passwordConfirm) {
            return setError('Les mots de passe ne correspondent pas');
        }
        try {
            setLoading(true);
            setError('');
            await signup(formValues.email, formValues.password);
            await updateDisplayName(`${formValues.prenom} ${formValues.nom}`);
            await createUserCollection();
            getFavorites();
            history.push('/login');
        } catch(error) {
            if(error.code === "auth/email-already-in-use") {
                setError("L'adresse email est déjà utilisée");
            }
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
                            minLength="1"
                            autoComplete="fname"
                            name="prenom"
                            variant="outlined"
                            required
                            fullWidth
                            id="prenom"
                            label="Prénom"
                            autoFocus
                            value={formValues.name}
                            onChange={handleOnChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            minLength="1"
                            autoComplete="lname"
                            name="nom"
                            variant="outlined"
                            required
                            fullWidth
                            id="nom"
                            label="Nom"
                            autoFocus
                            value={formValues.lastName}
                            onChange={handleOnChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            error={errorEmailConfirmation}
                            variant="outlined"
                            required
                            fullWidth
                            id="email"
                            label="Adresse email"
                            name="email"
                            autoComplete="email"
                            value={formValues.email}
                            onChange={emailConfirmation}
                            helperText={textEmailConfirmation}
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
                            type={showPassword ? "text" : "password"}
                            id="password"
                            autoComplete="current-password"
                            value={formValues.password}
                            onChange={passwordValidation}
                            helperText={textValidation}
                            InputProps={{ // <-- This is where the toggle button is added.
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <IconButton
                                      aria-label="toggle password visibility"
                                      onClick={handleClickShowPassword}
                                      onMouseDown={handleMouseDownPassword}
                                    >
                                      {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                  </InputAdornment>
                                )
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            error={errorPasswordConfirmation}
                            variant="outlined"
                            required
                            fullWidth
                            name="passwordConfirm"
                            label="Confirmer le mot de passe"
                            type="password"
                            id="passwordConfirm"
                            autoComplete="current-passwordConfirm"
                            value={formValues.passwordConfirm}
                            onChange={passwordConfirmation}
                            helperText={textPasswordConfirmation}
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
