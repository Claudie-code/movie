import React, { useState, useMemo } from 'react';
import { Grid, TextField, Button, InputAdornment, IconButton, Avatar } from '@material-ui/core';
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { useAuth } from '../../contexts/AuthContext';
import Title from "../../components/Title";
import Alert from '@material-ui/lab/Alert';
import { useHistory } from 'react-router-dom';
import { isEmail } from 'validator';
import { useRef } from 'react';
import AddAPhotoOutlinedIcon from '@material-ui/icons/AddAPhotoOutlined';

function Signup() {
    const { signup, updateDisplayNameAndPhoto, createUserCollection, getFavorites, handleModalClose } = useAuth();
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
    const [url, setUrl] = useState("");
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
    , [formValues, errorPasswordConfirmation, errorPassword, errorEmailConfirmation]);

    async function handleSubmit(event) {
        event.preventDefault();
        if (formValues.password !== formValues.passwordConfirm) {
            return setError('Les mots de passe ne correspondent pas');
        }
        try {
            setLoading(true);
            setError('');
            await signup(formValues.email, formValues.password);
            await updateDisplayNameAndPhoto(`${formValues.prenom} ${formValues.nom}`, url);
            await createUserCollection();
            getFavorites();
            handleModalClose();
            history.push('/');
        } catch(error) {
            if(error.code === "auth/email-already-in-use") {
                setError("L'adresse email est déjà utilisée");
            }
        }
        setLoading(false);
    };

    const fileInput = useRef();
    const handleClick = () => {
        fileInput.current.click()
    };

    const handleChange = (event) => {
        const file = event.target.files[0];
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET);
        data.append("cloud_name", process.env.REACT_APP_CLOUDINARY_CLOUD_NAME);
        if (file) {
            fetch(`${process.env.REACT_APP_CLOUDINARY_API}`, 
                {
                    method: "POST",
                    body: data
                }
            )
            .then(response => response.json())
            .then(data => {
                setUrl(data.url)
            })
            .catch(err => {
                console.error(err);
            });
        }
    };

    return (
        <>
            <Title>Inscription</Title>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <IconButton  
                            onClick={handleClick} 
                            aria-label="ajouter une photo"  
                        >
                            {url ? 
                            <Avatar
                                alt="avatar"
                                src={url}
                                style={{ width: 70, height: 70 }}
                            /> :
                            <AddAPhotoOutlinedIcon style={{ width: 70, height: 70 }} />
                            }
                            <input 
                                ref={fileInput} 
                                type="file" 
                                style={{ display: 'none' }} 
                                onChange={handleChange}
                            />
                        </IconButton>
                    </Grid>
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
                            InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <IconButton
                                      aria-label="mot de passe visible"
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
            </form>
        </>
    );
}

export default Signup;
