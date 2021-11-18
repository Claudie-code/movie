import { makeStyles } from '@material-ui/core/styles';
import { IconButton } from '@material-ui/core';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

const useStyles = makeStyles((theme) => ({
    playIcon: {
        color: theme.palette.primary.main,
        height: 40,
        width: 40,
        border: "2px solid",
        borderColor: theme.palette.primary.main,
        borderRadius: "50%",
        transition: "all 0.2s ease-in-out",
        '&:hover': {
            transform: "scale(1.2)"
        }
    },
}));

function PlayButton() {
    const classes = useStyles();

    return (
        <IconButton aria-label="play/pause">
            <PlayArrowIcon className={classes.playIcon} />
        </IconButton>
    );
}

export default PlayButton;