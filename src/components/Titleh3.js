import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";

export default function Titleh3(props) {
  return (
    <Typography component="h3" variant="h5" color="primary" gutterBottom>
        {props.children}
    </Typography>
  );
}

Titleh3.propTypes = {
  children: PropTypes.node
};