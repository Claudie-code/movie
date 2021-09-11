import React from 'react';
import CardWithTitleAndGenre from '../../components/CardWithTitleAndGenre';
import Title from "../../components/Title";
import { Box } from '@material-ui/core';

function Series({ topRatedSeries, seriesGenres }) {
    const sliceProps = topRatedSeries.slice(0, 10);

    return (
        <React.Fragment>
            <Title>Top Series</Title>
            <Box display="flex" flexWrap="wrap" justifyContent="space-around">
                <CardWithTitleAndGenre seriesGenres={seriesGenres} seriesAndMovies={sliceProps} />
            </Box>
        </React.Fragment>
    );
}

export default Series;
