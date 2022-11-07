import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, FlatList, ActivityIndicator } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { GOOGLE_API_KEY } from '@env';
import MapView, { Marker } from 'react-native-maps';
import { Location } from 'expo-location';

export default function Results({ route, navigation }) {

    const { places } = route.params;
    const { numOfPlaces } = route.params;

    // return the names of the places in the list
    const renderItem = ({ item }) => (
        <View style={styles.listItem}>
            <Text style={styles.listItemText}>{item.name}</Text>
        </View>
    );

    // filter places
    const filterPlaces = () => {
        const randomPlaces = places.sort(() => 0.5 - Math.random()).slice(0, numOfPlaces);
        return randomPlaces;
    };

    const filteredPlaces = filterPlaces();

    // if there are less places than the user wants, show a message
    if (filteredPlaces.length < numOfPlaces) {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Not enough places found.</Text>
                <Text> </Text>
                <Text style={styles.text}>In the settings, add more distance or reduce the number of places</Text>
                <Text> </Text>
                <Button
                    title="Go back"
                    onPress={() => navigation.navigate('Details')}
                />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                showsUserLocation={true}
                region={{
                    latitude: 60.1708,
                    longitude: 24.9375,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                {filteredPlaces.map((place, index) => (
                    <Marker
                        key={index}
                        coordinate={{
                            latitude: place.geometry.location.lat,
                            longitude: place.geometry.location.lng,
                        }}
                        title={place.name}
                        description={place.vicinity}
                    />
                ))}
            </MapView>
            <View style={styles.list}>
                <FlatList
                    data={filteredPlaces}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />
            </View>
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
    list: {
        flex: 1,
        width: '100%',
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        flex: 1,
        width: '100%',
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        marginTop: 40,
    },
    listItem: {
        padding: 10,
        marginVertical: 8,
        marginHorizontal: 16,
        backgroundColor: 'white',
        borderRadius: 10,
    },
    listItemText: {
        fontSize: 18,
    },
    text: {
        fontSize: 18,
        color: 'white',
        textAlign: 'center',
    },
});
