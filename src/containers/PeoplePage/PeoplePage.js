import React, { useState, useEffect } from 'react';
import Loader from '../../components/Loader/Loader';
import { makeStyles, Paper, Typography, Box, IconButton, Divider } from '@material-ui/core';
import Title from '../../components/Title';
import Titleh3 from '../../components/Titleh3';
import dayjs from 'dayjs';
import 'dayjs/locale/fr';
import ImageWithButton from '../../components/ImageWithButton';
import InstagramIcon from '@material-ui/icons/Instagram';
import LinkIcon from '@material-ui/icons/Link';

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(2),
        display: "flex",
        flexDirection: "column",
        minHeight: 500,
        gap: theme.spacing(3),
    },
    flex: {
        display: "flex",
        gap: theme.spacing(3),
        '@media (max-width:600px)': {
            flexDirection: "column"
        },
    },
    list: {
        display: 'flex', 
        gap: theme.spacing(1),
        '@media (max-width:600px)': {
            justifyContent: 'space-evenly',
            flexWrap: 'wrap',
        },
    },
    link: {
        display: 'flex',
        '& hr': {
        margin: theme.spacing(0, 0.5),
        },
    }
}));

export default function PeoplePage(props) {
    const classes = useStyles();
    const { id } = props.match.params;
    const [ people, setPeople ] = useState(null);
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/person/${id}?api_key=${process.env.REACT_APP_THEMOVIEDB_KEY}&language=fr-FR&append_to_response=combined_credits,external_ids`, {
        "method": "GET",
        "headers": {
            "Content-type": "application/json",
        }
        })
        .then(response => response.json())
        .then(json => {
            const data = json;
            setPeople(data)
        })
        .catch(err => {
            console.error(err);
        })
        .finally(
            () => {
            setLoading(false);
            },
        );
    }, [id])
    
    return (
        <>
            {loading ? 
                <Loader /> :
                <Paper className={classes.paper}>
                    <Title>{people.name}</Title>
                    <Box className={classes.flex}>
                        <img 
                            src={`https://image.tmdb.org/t/p/w300${people.profile_path}`} 
                            alt="" 
                        />
                        <Box>
                            <Box>
                                <Typography variant="body2" gutterBottom>
                                    <strong>Métier</strong> {people.known_for_department}
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    <strong>Genre</strong> {people.gender === 1 ? "Femme" : "Homme"}
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    <strong>Lieu de naissance</strong> {people.place_of_birth}
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    <strong>Naissance</strong> {dayjs(people.birthday).locale('fr').format("DD MMMM YYYY")}
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    {people.deathday ?                                
                                        <>
                                            <strong>Décès </strong> 
                                            {dayjs(people.deathday).locale('fr').format("DD MMMM YYYY")}
                                        </> :
                                        <>
                                            <strong>Age </strong> 
                                            {new Date().getFullYear() - people.birthday.split('-')[0] + " ans"}
                                        </>

                                    } 
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    <strong>Apparitions connues</strong> {people.combined_credits.cast.length}
                                </Typography>
                            </Box>
                            <Box className={classes.link}>
                                {people.external_ids.instagram_id &&
                                    <IconButton 
                                        color="primary" 
                                        aria-label="lien instagram" 
                                        component="a" 
                                        href={`https://www.instagram.com/${people.external_ids.instagram_id}`}
                                        target="_blank"
                                    >
                                        <InstagramIcon />
                                    </IconButton>
                                }
                                <Divider orientation="vertical" flexItem />
                                {people.homepage &&
                                    <IconButton 
                                        color="primary" 
                                        aria-label="lien site" 
                                        component="a" 
                                        href={people.homepage}
                                        target="_blank"
                                    >
                                        <LinkIcon />
                                    </IconButton>
                                }
                            </Box>
                        </Box>
                    </Box>
                    <Titleh3>CELEBRE POUR</Titleh3>
                    <Box className={classes.list}>
                        {people.combined_credits.cast.slice(0,6).map(cast => (
                            <Box style={{width: 200}}>
                                <ImageWithButton data={cast}/>
                            </Box>
                        ))}
                    </Box>
                    <Titleh3>BIOGRAPHIE</Titleh3>
                    <Typography variant="body1" gutterBottom>
                        {people.biography || "Pas de biographie"}
                    </Typography>
                </Paper>
            }
        </>
    )
}
