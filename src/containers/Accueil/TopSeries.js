import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import { Box, CardContent, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        width: 150,
        height: 200,
        margin: 5
    },
    cover: {
      width: 150,
      height: 200,
      display: 'flex',
      justifyContent: "center",
      alignItems: 'center',
    },
    playIcon: {
      color: "white",
      height: 40,
      width: 40,
      border: "2px solid white",
      borderRadius: "50%",
      '&:hover': {
        color: theme.palette.primary.main,
        border: "2px solid" + theme.palette.primary.main,
      }
    },
  }));

function TopSeries(props) {
    const classes = useStyles();
    console.log(props)
    return (
        <Box>
            <CardActionArea className={classes.root}>
                <CardMedia
                className={classes.cover}
                image={`https://image.tmdb.org/t/p/w780${props.serieTop && props.serieTop.poster_path}`}
                title={props.serieTop.name}
                >
                </CardMedia> 
                <CardContent>
                    <Typography gutterBottom variant="subtitle1" component="h3">
                        {props.serieTop.name}
                    </Typography>
                    <Typography variant="body1" color="textSecondary" component="p">
                        Aventure
                    </Typography>
                </CardContent>         
            </CardActionArea>
        </Box>
    );
}

export default TopSeries;