import { makeStyles, Paper, Typography, Box, Button, TextField, Divider, Avatar } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import Title from "./Title";
import Titleh3 from "./Titleh3";
import BandeAnnonce from "./BandeAnnonce";
import GenreListButton from "./GenreListButton";
import FavoriteCheckBox from './FavoriteCheckbox';
import ReleaseDate from './ReleaseDate';
import { useAuth } from '../contexts/AuthContext';
import CastCard from './CastCard';
import { useEffect, useState } from 'react';
import { Alert } from '@material-ui/lab';

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(2),
        display: "flex",
        overflowX: "auto",
        flexDirection: "column",
        minHeight: 500,
        gap: theme.spacing(2),
    },
    rating: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: theme.spacing(2),
        gap: "10px",
        '@media (max-width:800px)': {
            flexDirection: "column",
        },
    },
    flex: {
        gap: theme.spacing(3),
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-evenly",
    },
    newComment: {
        display: "flex",
        gap: theme.spacing(2),
        flexDirection: "column",
    },
    comment: {
        display: "flex",
        gap: theme.spacing(5),
    },
    profil: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: theme.spacing(2),
    }
}));

export default function MovieSeriePageDetails({ movieOrSerieData, movieOrSerie }) {
    const topicId = `${movieOrSerie}${movieOrSerieData.id}`;
    const [ newComment, setNewComment ] = useState("");
    const [ comments, setComments ] = useState([]);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [rating, setRating] = useState(0);
    const { currentUser, getTopic, newCommentTopicsCollection, handleModalOpen } = useAuth();
    const classes = useStyles();

    const handleSubmit = async (event) => {
        event.preventDefault();
        if(newComment === "") {
            return setError("Veuillez insérer un caractère minimum.");
        }
        try {
            await newCommentTopicsCollection(newComment, topicId, rating);
            setMessage("Commentaire posté!");
            setNewComment("");
            setRating(0);
        } catch (error) {
            console.log(error, "error")
        }
    };

    useEffect(() => {
        const addTopics = async () => {
            try {
                const result = await getTopic(topicId);
                setComments(result);
            } catch (error) {
                console.log("error", error)
            }
        }
        return addTopics();
    }
    ,[movieOrSerieData, movieOrSerie, rating]);

    return (
        <>
        {movieOrSerieData &&
        <Paper className={classes.paper}>
            <Box display="flex" justifyContent="space-between">
                <Title>{movieOrSerieData.name || movieOrSerieData.title}</Title>
                {currentUser && <FavoriteCheckBox serieAndMovie={movieOrSerieData}/>}
            </Box>
            <BandeAnnonce movieOrSerieData={movieOrSerieData} movieOrSerie={movieOrSerie} width='100%' height="650px"/>
            <Box className={classes.rating}>
                <GenreListButton genres={movieOrSerieData.genres} />
                <Rating name="size-medium" value={(movieOrSerieData.vote_average * 5) / 10} readOnly />
            </Box>
            <ReleaseDate>
                {movieOrSerieData.release_date}
            </ReleaseDate>
            <Titleh3>Synopsis</Titleh3>
            <Typography variant="body1" gutterBottom>
                {movieOrSerieData.overview || "Pas de résumé"}
            </Typography>
            <Titleh3>Acteurs et actrices</Titleh3>
            <Box className={classes.flex}>
                {movieOrSerieData && 
                    movieOrSerieData.credits?.cast.slice(0, 5).map(cast => (
                        <CastCard key={cast.id} cast={cast} />
                    ))
                }
            </Box>
            <Titleh3>Commentaires</Titleh3>
            {currentUser ?
                <form onSubmit={handleSubmit} className={classes.newComment}>
                    <Rating
                        name="évaluation"
                        value={rating}
                        onChange={(event, newValue) => {
                            setRating(newValue);
                        }}
                    />
                    <TextField
                        label="Écrire un commentaire"
                        multiline
                        maxRows={5}
                        variant="outlined"
                        size="small"
                        color="secondary"
                        value={newComment}
                        onChange={event => setNewComment(event.target.value)}
                    />
                    <div>
                        <Button color="secondary" variant="contained" type="submit">Valider</Button>
                    </div>
                    {error && <Alert severity="error">{error}</Alert>}
                    {message && <Alert severity="success">{message}</Alert>}
                </form> :
                <Box>
                    <Button 
                        color="secondary" 
                        variant="contained" 
                        onClick={handleModalOpen}
                    >
                        Écrire un commentaire
                    </Button>
                </Box>
            }
            {comments?.map((comment, index) => (
                <Box key={index}>
                    <Divider style={{width:'100%', margin: "1rem 0"}} />
                    <Box className={classes.comment}>
                        <Box className={classes.profil}>
                            <Avatar
                                alt="avatar"
                                src={comment.photoURL}
                                style={{ width: 70, height: 70 }}
                            />
                            <Typography variant="body2">
                                {comment.name}
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                                le {comment.date}
                            </Typography>
                        </Box>
                        <Box>
                            <Rating name={`évaluation ${comment.name}`} value={comment.rating} readOnly />
                            <Typography variant="body1" gutterBottom>
                                {comment.comment}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            ))}
        </Paper>
        }
        </>
    )
}