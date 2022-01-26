import Login from '../../containers/Login/Login';
import Signup from '../../containers/Signup/Signup';
import Backdrop from '@material-ui/core/Backdrop';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import { Box, IconButton, Link, makeStyles, Paper } from '@material-ui/core';
import { useState } from 'react';
import ForgotPassword from '../../containers/ForgotPassword/ForgotPassword';
import { useAuth } from '../../contexts/AuthContext';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
    root: {
        position: "absolute",
        textAlign: 'center',
        maxWidth: 400,
        padding: theme.spacing(3),
        top: `50%`,
        left: `50%`,
        transform: `translate(-50%, -50%)`,
    },
    flex: {
        display: "flex",
        marginTop: theme.spacing(2),
        gap: theme.spacing(1),
        flexDirection: "column",
        alignItems: "flex-end"
    }
}));

const AuthModal = () => {
    const classes = useStyles();
    const [openSignup, setOpenSignup] = useState("login");
    const { isModalOpen, handleModalClose } = useAuth();

    return (
        <Modal
            open={isModalOpen}
            onClose={handleModalClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
        >
            <Fade in={isModalOpen}>
                <Paper className={classes.root}>
                    <Box display="flex" justifyContent="flex-end">
                        <IconButton aria-label="fermer la modale" onClick={() => handleModalClose()}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    {openSignup === "signup" && 
                        <>
                            <Signup />
                            <Box className={classes.flex}>
                                <Link href="#" variant="body2" onClick={() => setOpenSignup("login")}>
                                    Déjà inscrit? Se connecter ici
                                </Link>
                            </Box>
                        </>
                    }
                    {openSignup === "login" && 
                        <>
                            <Login />
                            <Box className={classes.flex}>
                                <Link href="#" variant="body2" onClick={() => setOpenSignup("forgot")}>
                                    Mot de passe oublié?
                                </Link>
                                <Link href="#" variant="body2" onClick={() => setOpenSignup("signup")}>
                                    Inscription par email →
                                </Link>
                            </Box>
                        </>
                    }
                    {openSignup === "forgot" && 
                        <>
                            <ForgotPassword />
                            <Box className={classes.flex}>
                                <Link href="#" variant="body2" onClick={() => setOpenSignup("login")}>
                                    Connexion
                                </Link>
                            </Box>
                        </>
                    }
                </Paper>
            </Fade>
        </Modal>
    );
};

export default AuthModal;