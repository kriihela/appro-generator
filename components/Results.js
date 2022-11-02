import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, FlatList, ActivityIndicator } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { GOOGLE_API_KEY } from '@env';
import MapView, { Marker } from 'react-native-maps';
import { Location } from 'expo-location';

export default function Results({ route, navigation }) {

    const { places } = route.params;
    const { fetchPlaces } = route.params;
    const { numOfPlaces } = route.params;

    const [numOfPlacesToShow, setNumOfPlacesToShow] = useState(numOfPlaces);

    // return the names of the places in the list
    const renderItem = ({ item }) => (
        <View style={styles.listItem}>
            <Text style={styles.listItemText}>{item.name}</Text>
        </View>
    );

    // filter places
    const filterPlaces = () => {
        const randomPlaces = places.sort(() => 0.5 - Math.random()).slice(0, numOfPlacesToShow);
        return randomPlaces;
    };

    const filteredPlaces = filterPlaces();

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
});
