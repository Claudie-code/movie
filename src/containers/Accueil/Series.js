import React from 'react';
import CardsWithTitleAndGenre from '../../components/CardsWithTitleAndGenre';
import Title from "../../components/Title";

function Series({ topRatedSeries, seriesGenres }) {
    const sliceProps = topRatedSeries.slice(0, 10);

    return (
        <React.Fragment>
            <Title>Top Series</Title>
            <CardsWithTitleAndGenre seriesGenres={seriesGenres} seriesAndMovies={sliceProps} />
        </React.Fragment>
    );
}

export default Series;
