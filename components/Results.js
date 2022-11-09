import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import { Input, Button, Icon, ListItem } from 'react-native-elements';
import { GOOGLE_API_KEY } from '@env';
import MapView, { Marker } from 'react-native-maps';
import { Location } from 'expo-location';

export default function Results({ route, navigation }) {

    const { places } = route.params;
    const { numOfPlaces } = route.params;

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
            <FlatList
                style={styles.list}
                keyExtractor={item => item.id}
                data={filteredPlaces}
                renderItem={({ item }) =>
                    <ListItem
                        bottomDivider
                        containerStyle={styles.listItem}
                        onPress={() => navigation.navigate('Info', { item })}
                    >
                        <ListItem.Content>
                            <ListItem.Title onPress={() => navigation.navigate('Info', { item: item })}>{item.name}</ListItem.Title>
                        </ListItem.Content>
                        <Button
                            type="clear"
                            icon={<Icon name="check" size={25} color="green" />}
                            title="I'm here"
                            onPress={() => console.log('delete')}
                        />
                    </ListItem>
                }
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
    list: {
        width: '100%',
        height: '5%',
        backgroundColor: 'black',
    },
    map: {
        flex: 1,
        width: '100%',
        height: '100%',
        borderRadius: 20,
        marginTop: 35,
    },
    listItem: {
        padding: 10,
        marginVertical: 8,
        borderRadius: 10,
        flexDirection: 'row',
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