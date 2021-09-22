import { makeStyles, Paper, Box, Button } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useState } from 'react';
import { useHistory } from 'react-router';
import Title from "../../components/Title";
import { useAuth } from '../../contexts/AuthContext';

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(2),
        display: "flex",
        overflowX: "auto",
        flexDirection: "column",
        minHeight: 450
    },
}));

export default function Profile() {
    const [ error, setError ] = useState('');
    const classes = useStyles();
    const { currentUser, logout } = useAuth();
    const history = useHistory();

    async function handleLogout() {
        setError('');
        try {
          await logout();
          history.push('/login')
        } catch {
          setError('Failed to log out')
        }
    }

    return (

        <Paper className={classes.paper}>
            <Title>Compte de {currentUser.displayName}</Title>
            {error && <Alert severity="error">{error}</Alert>}
            <strong>Email:</strong> {currentUser.email}
            <Button onClick={handleLogout} color="red">Log out</Button>
        </Paper>

    )
}