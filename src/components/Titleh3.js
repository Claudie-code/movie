import PropTypes from "prop-types";
import { makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  text: {
    textTransform: "uppercase"
  },
}));

export default function Titleh3(props) {
  const classes = useStyles();

  return (
    <Typography 
      className={classes.text} 
      component="h3" 
      variant="h5" 
      color="primary" 
      gutterBottom
    >
        {props.children}
    </Typography>
  );
}

Titleh3.propTypes = {
  children: PropTypes.node
};