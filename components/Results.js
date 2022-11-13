import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, FlatList, Modal, Image } from 'react-native';
import { Input, Button, Icon, ListItem } from 'react-native-elements';
import { GOOGLE_API_KEY } from '@env';
import MapView, { Marker } from 'react-native-maps';
import { Location } from 'expo-location';

export default function Results({ route, navigation }) {

    const { places } = route.params;
    const { numOfPlaces } = route.params;
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
                        onPress={() => showModal(item)}
                    >
                        <ListItem.Content>
                            <Text>{item.name}</Text>
                        </ListItem.Content>
                        <Button
                            type="clear"
                            icon={<Icon name="check" size={25} color="green" />}
                            title=" I'm here"
                            onPress={() => console.log('I\'m here')}
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
        width: 300,
        height: 300,
        marginBottom: 15,
        borderRadius: 20,
    },
});