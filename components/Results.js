import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, FlatList, Modal, Image } from 'react-native';
import { Input, Button, Icon, ListItem } from 'react-native-elements';
import { GOOGLE_API_KEY } from '@env';
import MapView, { Marker } from 'react-native-maps';
import { Location } from 'expo-location';

export default function Results({ route, navigation }) {

    const { places } = route.params;
    const { numOfPlaces } = route.params;
    const [placesNumber, setPlacesNumber] = useState(places.length);
    const [placesLeft, setPlacesLeft] = useState(numOfPlaces);
    const [filteredPlaces, setFilteredPlaces] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [item, setItem] = useState({});
    const showModal = (item) => {
        setItem(item);
        setModalVisible(true);
    }

    // filter the places randomly to show only the number of places the user wants to see
    useEffect(() => {
        const filterPlaces = () => {
            let filteredPlaces = [];
            for (let i = 0; i < numOfPlaces; i++) {
                let randomIndex = Math.floor(Math.random() * places.length);
                filteredPlaces.push(places[randomIndex]);
                places.splice(randomIndex, 1);
            }
            setFilteredPlaces(filteredPlaces);
        }
        filterPlaces();
    }, []);

    // delete a place from the list
    const deletePlace = (item) => {
        setFilteredPlaces(filteredPlaces.filter(place => place.place_id !== item.place_id));
        setPlacesLeft(placesLeft - 1);
    }

    // if there are less places than the user wants, show a message
    if (placesNumber < placesLeft) {
        return (
            <View style={styles.container}>
                <Text style={styles.header}>Not enough places found.</Text>
                <Text> </Text>
                <Image source={require('../assets/no-places.png')} style={styles.image} />
                <Text> </Text>
                <Text style={styles.text}>In the settings, add more distance or reduce the number of places</Text>
                <Text> </Text>
                <Button
                    title="Go back"
                    buttonStyle={{ backgroundColor: 'black' }}
                    titleStyle={{ color: 'red' }}
                    type="outline"
                    containerStyle={{ borderColor: 'white', borderWidth: 1 }}
                    icon={<Icon name="arrow-back" color="white" />}
                    onPress={() => navigation.navigate('Details')}
                />
            </View>
        );

    // when every place is deleted, show a message
    } else if (placesLeft === 0) {
        return (
            <View style={styles.container}>
                <Text style={styles.header}>Congratulations!</Text>
                <Text> </Text>
                <Image source={require('../assets/Celebration.png')} style={styles.image} />
                <Text style={styles.text}>You've visited every place!</Text>
                <Text style={styles.text}>Remember to eat and drink water!</Text>
                <Text> </Text>
                <Button
                    title="Go back"
                    buttonStyle={{ backgroundColor: 'black' }}
                    titleStyle={{ color: 'green' }}
                    type="outline"
                    containerStyle={{ borderColor: 'white', borderWidth: 1 }}
                    // check icon
                    icon={<Icon name="arrow-back" color="white" />}
                    onPress={() => navigation.navigate('Details')} />
            </View>
        );

    } else {
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
                            onPress={() => showModal(item)}
                        >
                            <ListItem.Content>
                                <Text>{item.name}</Text>
                            </ListItem.Content>
                            <Button
                                type="clear"
                                icon={<Icon name="check" size={25} color="green" />}
                                title=" I'm here"
                                onPress={() => deletePlace(item)}
                            />
                        </ListItem>
                    }
                />
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}
                >
                    <View style={styles.modalView}>
                        {item.photos && <Image
                            style={styles.image}
                            source={{ uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${item.photos[0].photo_reference}&key=${GOOGLE_API_KEY}` }}
                        />}
                        <Text style={styles.modalText}>{item.name}</Text>
                        <Text style={styles.modalText}>{item.vicinity}</Text>
                        <Text style={styles.modalText}>Rating: {item.rating}</Text>
                        <Button
                            title="Close"
                            onPress={() => setModalVisible(!modalVisible)}
                        />
                    </View>
                </Modal>
            </View>
        );
    }
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
    modalView: {
        marginTop: 20,
        backgroundColor: "black",
        padding: 22,
        alignItems: "center",
    },
    modalText: {
        marginBottom: 15,
        color: 'white',
        textAlign: "center"
    },
    image: {
        width: 400,
        height: 400,
        marginBottom: 15,
        borderRadius: 20,
    },
    header: {
        fontSize: 30,
        color: 'white',
        textAlign: 'center',
    },
});