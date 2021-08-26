import React from 'react';
import CardWithTitleAndGenre from '../../components/CardWithTitleAndGenre';
import Title from "../../components/Title";
import { Box } from '@material-ui/core';

function Series({ series }) {
    const sliceProps = series.slice(0, 8);

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
