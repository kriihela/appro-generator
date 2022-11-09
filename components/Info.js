import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, FlatList, ActivityIndicator, ListItem, Image } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { GOOGLE_API_KEY } from '@env';
import MapView, { Marker } from 'react-native-maps';
import { Location } from 'expo-location';

export default function Info({ route, navigation }) {

    const { item } = route.params;

    return (
        <View style={styles.container}>
            <Image
                style={styles.image}
                source={{ uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${item.photos[0].photo_reference}&key=${GOOGLE_API_KEY}` }}
            />
            <Text> </Text>
            <Text style={styles.text}>{item.name}</Text>
            <Text> </Text>
            <Text style={styles.text}>{item.address}</Text>
            <Text> </Text>
            <Text style={styles.text}>{item.phone}</Text>
            <Text> </Text>
            <Text style={styles.text}>{item.website}</Text>
            <Text> </Text>
            <Text style={styles.text}>{item.rating}</Text>
            <Text> </Text>
            <Button
                title="Go back"
                onPress={() => navigation.navigate('Results')}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 20,
        color: 'white',
    },
    image: {
        width: 400,
        height: 400,
    },
});