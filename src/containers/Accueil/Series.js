import React from 'react';
import TopSeries from './TopSeries';
import Title from "../../components/Title";
import { Grid, Box } from '@material-ui/core';

function Series(props) {
    return (
        <React.Fragment>
            <Title>Top Series</Title>
                <Box display="flex">
                <TopSeries serieTop={props.seriesTop[0]}/>

                <TopSeries serieTop={props.seriesTop[1]}/>

                <TopSeries serieTop={props.seriesTop[2]}/>

                <TopSeries serieTop={props.seriesTop[3]}/>

                <TopSeries serieTop={props.seriesTop[4]}/>

                <TopSeries serieTop={props.seriesTop[5]}/>

                <TopSeries serieTop={props.seriesTop[6]}/>

                <TopSeries serieTop={props.seriesTop[7]}/>

                <TopSeries serieTop={props.seriesTop[8]}/>

                </Box>
        </React.Fragment>
    );
}

export default Series;
