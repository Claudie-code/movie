import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 300,
    },
});

export default function CastCard({ cast }) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea href={`/people/${cast.id}`} style={{textDecoration: "none"}}>
        <CardMedia
          className={classes.media}
          image={`https://image.tmdb.org/t/p/w500${cast.profile_path}`} 
          title={cast.name} 
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {cast.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Rôle : {cast.character}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}