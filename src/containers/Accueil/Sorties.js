import React from 'react';
import BandeAnnonce from "./BandeAnnonce"
import ButtonMovie from "./ButtonMovie"
import Grid from '@material-ui/core/Grid';
import ImageFilm from './ImageFilm';
import "./accueil.css";
import Title from "../../components/Title";

function Sorties(props) {

    return (
        <React.Fragment>
            <Title>Bandes annonces à ne pas manquer</Title>
            <div className="flex">
                <div className="flexitem" style={{width: '59%'}}>
                    <Grid container spacing={3} >
                        <Grid item xs={12}>
                            <BandeAnnonce movieBa={props.moviesSort[3]}/>
                        </Grid>
                        <Grid item xs={3}>
                            <ImageFilm movieFi={props.moviesSort[4]}/>
                        </Grid>
                        <Grid item xs={3}>
                            <ImageFilm movieFi={props.moviesSort[5]}/>
                        </Grid>
                        <Grid item xs={3}>
                            <ImageFilm movieFi={props.moviesSort[6]}/>
                        </Grid>
                        <Grid item xs={3}>
                            <ImageFilm movieFi={props.moviesSort[7]}/>
                        </Grid>
                    </Grid>
                </div>
                <div className="flexitem" style={{width: '39%'}}>
                    <div className="slides">
                        <ButtonMovie movieBu={props.moviesSort[8]}/>
                        <ButtonMovie movieBu={props.moviesSort[9]}/>
                        <ButtonMovie movieBu={props.moviesSort[10]}/>
                        <ButtonMovie movieBu={props.moviesSort[11]}/>
                        <ButtonMovie movieBu={props.moviesSort[12]}/>
                        <ButtonMovie movieBu={props.moviesSort[13]}/>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Sorties;