import 'react-native-get-random-values';
import {times} from 'rambdax';
import {v4 as uuid} from 'uuid';
import moviesData from '@data/Movies';
import reviewsData from '@data/Reviews';
import MovieType from '@app/types/Movie';

export interface Id {
    id: string;
}

type RandomMovie = Id & MovieType;

const flatMap = (fn: Function, arr: MovieType[]) =>
    arr.map(fn).reduce((a, b) => {
        return a.concat(b);
    }, []);

const fuzzCount = (count: number): number => {
    // makes the number randomly a little larger or smaller for fake data to seem more realistic
    const maxFuzz = 4;
    const fuzz = Math.round((Math.random() - 0.5) * maxFuzz * 2);
    return count + fuzz;
};

const makeRandomMovie = (i: number): RandomMovie => {
    const movie = moviesData[i];
    return {
        id: uuid(),
        ...movie,
    };
};

const makeRandomReview = (i: number) => {
    const review = {
        id: uuid(),
        body: reviewsData[i % reviewsData.length],
    };

    return review;
};

const makeReviews = (movie: MovieType, count: number) => {
    const reviews = times((i) => makeRandomReview(i), count);
    movie.reviews = reviews;
};

const generateMovies = (
    moviesCount: number,
    numberOfReviewsPerMovie: number,
) => {
    const movies = times((i) => makeRandomMovie(i), moviesCount);

    flatMap(
        (movie: MovieType) =>
            makeReviews(movie, fuzzCount(numberOfReviewsPerMovie)),
        movies,
    );
    return movies;
};

export default generateMovies;
