import { makeStyles, Paper, Grid, Button, TextField, Link } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useRef, useState } from 'react';
import Title from "../../components/Title";
import { useAuth } from '../../contexts/AuthContext';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
      textAlign: 'center',
      width: 700,
      margin: '7rem auto',
      padding: theme.spacing(13)
    },
    margin: {
        marginTop: theme.spacing(4)
    }
}));

export default function Account() {
    const [ error, setError ] = useState('');
    const [loading, setLoading] = useState(false);
    const classes = useStyles();
    const { currentUser } = useAuth();
    const emailRef = useRef();
    const lnameRef = useRef();
    const fnameRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const [ fname, lname ] = currentUser.displayName.split(' ');

    async function handleSubmit(event) {
        event.preventDefault();
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Les mots de passe ne correspondent pas');
        }
        try {
            setLoading(true);
            setError('');
            //await signup(emailRef.current.value, passwordRef.current.value);
            //await updateDisplayName(`${fnameRef.current.value} ${lnameRef.current.value}`);

        } catch {
            setError('Erreur lors de la création du compte');
        }
        setLoading(false);
    };

    return (

        <Paper className={classes.root}>
            <Title>Compte de <br/>{currentUser.displayName}</Title>
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
                                defaultValue={fname}
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
                                defaultValue={lname}
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
                                defaultValue={currentUser.email}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                name="password"
                                label="Mot de passe: optionnel"
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
                        <Grid item xs={12} >
                            <Button 
                                //disabled={loading}
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                            >
                                Mettre à jour
                            </Button>
                        </Grid>
                        <Grid container justifyContent="flex-end" alignItems="flex-end" direction="column" 
                            spacing= {1} className={classes.margin}>
                            <Grid item>
                                <Link href="/" variant="body2">
                                    Retour à l'accueil
                                </Link>
                            </Grid>
                        </Grid>
                    </Grid>
                </form>
        </Paper>

    )
}