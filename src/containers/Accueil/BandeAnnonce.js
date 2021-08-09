import { Box } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import ReactPlayer from 'react-player';

function BandeAnnonce(props) {
    const movBa = props.movieBa.id
    const [urlBa, setUrlBa] = useState(null)

    useEffect(() => {
        fetch(`
        https://api.themoviedb.org/3/movie/${movBa}/videos?api_key=96ab457e2f6f7c241da2c90db7997deb&language=fr-FR`, 
        {
        "method": "GET",
        "headers": {
            "Content-type": "application/json",
        }
        })
        .then(response => response.json())
        .then(json => {
            const data = json;
            const arrUrlBa = data.results[0].key
            setUrlBa(arrUrlBa)
        })
        .catch(err => {
            console.error(err);
        });
    }, [])

    return (
        <ReactPlayer width={props.width} height={props.height} url={`https://www.youtube.com/watch?v=${urlBa}`} />
    );
}

export default BandeAnnonce;