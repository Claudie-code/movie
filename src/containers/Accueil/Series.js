import React from 'react';
import TopSeries from './TopSeries';
import Title from "../../components/Title";
import { Box } from '@material-ui/core';
function Series(props) {
    console.log(props)

    return (
        <React.Fragment>
            <Title>Top Series</Title>
                <Box display="flex">
                {props.seriesTop.slice(0,9).map(propsSerie => {
                    {console.log(propsSerie)}
                    <TopSeries serieTop={propsSerie}/>
                })}
                </Box>
        </React.Fragment>
    );
}

export default Series;
