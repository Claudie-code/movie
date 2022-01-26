import { makeStyles, Paper, Grid, Button, TextField, Link, Avatar, IconButton } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useRef, useState } from 'react';
import Title from "../../components/Title";
import { useAuth } from '../../contexts/AuthContext';
import { useHistory } from 'react-router-dom';
import AddAPhotoOutlinedIcon from '@material-ui/icons/AddAPhotoOutlined';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
      textAlign: 'center',
      maxWidth: 700,
      margin: '2rem auto',
      padding: theme.spacing(5)
    },
    margin: {
        marginTop: theme.spacing(4)
    }
}));

export default function Account() {
    const [ error, setError ] = useState('');
    const [loading, setLoading] = useState(false);
    const classes = useStyles();
    const { currentUser, updateEmail, updatePassword, updateDisplayNameAndPhoto } = useAuth();
    const [url, setUrl] = useState(currentUser.photoURL);
    const emailRef = useRef();
    const lnameRef = useRef();
    const fnameRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const [ fname, lname ] = currentUser.displayName.split(' ');
    const history = useHistory();

    function handleSubmit(event) {
        event.preventDefault();
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Les mots de passe ne correspondent pas');
        }

        const promises = [];
        setLoading(true);
        setError('');
        if(emailRef.current.value !== currentUser.email) {
            promises.push(updateEmail(emailRef.current.value))
        }

        if(passwordRef.current.value) {
            promises.push(updatePassword(passwordRef.current.value))
        }
        console.log('test',url && url)
        if((lnameRef.current.value !== lname || fnameRef.current.value !== fname) || url !== currentUser.photoURL) {
            promises.push(updateDisplayNameAndPhoto(
                `${fnameRef.current.value} ${lnameRef.current.value}`, 
                url
            ));
        }

        Promise.all(promises).then(() => {
            history.push('/');
        }).catch(() => {
            setError('Echec de la mise à jour du compte')
        }).finally(() => {
            setLoading(false)
        })
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

        <Paper className={classes.root}>
            <Title>Compte de <br/>{currentUser.displayName}</Title>
            <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <IconButton  
                                onClick={handleClick}
                                aria-label="modifier la photo"   
                            >
                                {url ? 
                                    <Avatar
                                        alt="avatar"
                                        src={url? url : currentUser.photoURL}
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
                                disabled={loading}
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