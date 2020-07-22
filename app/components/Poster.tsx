import React from 'react';
import {StyleSheet, Text, View, useWindowDimensions} from 'react-native';
import Animated from 'react-native-reanimated';
import memoize from 'memoize-one';

import type MovieType from '@app/types/Movie';

interface PosterProps {
    movie: MovieType;
    borderRadius?: Animated.Value<number>;
}

const Poster = ({borderRadius, movie}: PosterProps) => {
    const {width, height} = useWindowDimensions();
    const styles = getStyles(width, height);
    return (
        <View style={styles.container}>
            <Animated.Image
                source={{uri: movie.poster}}
                style={[styles.image, {borderRadius: borderRadius || 8}]}
            />
            <View style={styles.content}>
                <Text style={styles.name}>{movie.name}</Text>
                <Text style={styles.reviews}>{`Reviews: ${
                    movie.reviews?.length || 0
                }`}</Text>
            </View>
        </View>
    );
};

const getStyles = memoize((width: number, height: number) =>
    StyleSheet.create({
        container: {
            marginVertical: 45,
        },
        content: {
            padding: 16,
            paddingTop: 20,
            borderRadius: 8,
            borderColor: '#fff',
            backgroundColor: 'rgba(0, 0, 0, 0.04)',
            width: '100%',
        },
        name: {
            color: 'white',
            fontSize: 34,
            lineHeight: 41,
            fontWeight: 'bold',
            textShadowColor: '#000',
            textShadowOffset: {
                width: 1,
                height: 2,
            },
            textShadowRadius: 2,
            flex: 1,
        },
        reviews: {
            color: 'white',
            fontSize: 18,
            textShadowColor: '#000',
            textShadowOffset: {
                width: 1,
                height: 2,
            },
            textShadowRadius: 2,
        },
        image: {
            ...StyleSheet.absoluteFillObject,
            width: undefined,
            height: height / 2,
        },
    }),
);

export default Poster;
