import { makeStyles, Paper } from '@material-ui/core'
import React from 'react'
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
    const classes = useStyles();
    const { currentUser } = useAuth();
    console.log(currentUser)
    return (

        <Paper className={classes.paper}>
            <Title>Profil de {currentUser.displayName}</Title>
        </Paper>

    )
}
