import React from 'react';
import CardWithTitleAndGenre from '../../components/CardWithTitleAndGenre';
import Title from "../../components/Title";
import { Box } from '@material-ui/core';

function Series({ topRatedSeries }) {
    const sliceProps = topRatedSeries.slice(0, 9);

    return (
        <React.Fragment>
            <Title>Top Series</Title>
            <Box display="flex">
                <CardWithTitleAndGenre seriesAndMovies={sliceProps} />
            </Box>
        </React.Fragment>
    );
}

export default Series;
