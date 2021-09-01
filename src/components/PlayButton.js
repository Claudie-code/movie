import { makeStyles } from '@material-ui/core/styles';
import { IconButton } from '@material-ui/core';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

const useStyles = makeStyles((theme) => ({
    playIcon: {
        color: theme.palette.action.active,
        height: 40,
        width: 40,
        border: "2px solid",
        borderColor: theme.palette.action.active,
        borderRadius: "50%",
        '&:hover': {
            color: theme.palette.primary.main,
            border: "2px solid" + theme.palette.primary.main,
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