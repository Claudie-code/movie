import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TwitterIcon from '@material-ui/icons/Twitter';
import EmailIcon from '@material-ui/icons/Email';
import InstagramIcon from '@material-ui/icons/Instagram';
import { IconButton, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    footer: {
      backgroundColor: theme.palette.primary.main,
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      padding: 10
    },
}));

export default function Footer() {
    const classes = useStyles();

    return (
        <footer className={classes.footer}>
            <Typography className={classes.title} variant="h6" color='inherit'>
                Réseaux sociaux / Contact
            </Typography>
            <div>
                <IconButton aria-label="twitter" color="inherit">
                    <TwitterIcon />
                </IconButton>
                <IconButton aria-label="instagram" color="inherit">
                    <InstagramIcon />
                </IconButton>
                <IconButton aria-label="email" color="inherit">
                    <EmailIcon />
                </IconButton>
            </div>
        </footer>
    );
}
