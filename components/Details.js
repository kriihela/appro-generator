import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { GOOGLE_API_KEY } from '@env';

export default function Details() {

    // Details for the search
    const [userLocation, setUserLocation] = useState('');
    const [numOfPlaces, setNumOfPlaces] = useState(3);
    const [places, setPlaces] = useState([]);
    const [radius, setRadius] = useState(1000);

    // Details for the map
    const [region, setRegion] = useState({
        latitude: 60.1708,
        longitude: 24.9375,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });

    // Details for the loading screen
    const [loading, setLoading] = useState(false);

    // Details for the error screen
    const [error, setError] = useState(false);

    // Fetch nearest restaurants that sell alcohol from Google Places
    const fetchPlaces = async () => {
        setLoading(true);
        setError(false);
        try {
            const response = await fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${region.latitude},${region.longitude}&radius=${radius}&type=restaurant&keyword=alcohol&key=${GOOGLE_API_KEY}`);
            const json = await response.json();
            setPlaces(json.results);
            console.log(filteredPlaces);
            setLoading(false);
        } catch (error) {
            setError(true);
            setLoading(false);
        }
    };

    // filter the places to show only the ones that are open now and randomly select the value of numOfPlaces from the array
    const filterPlaces = () => {
        const openNow = places.filter(place => place.opening_hours.open_now === true);
        const randomPlaces = openNow.sort(() => 0.5 - Math.random()).slice(0, numOfPlaces);
        return randomPlaces;
    };

    const filteredPlaces = filterPlaces();

    // Get user location
    const getUserLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setUserLocation(location);
        console.log('user location', userLocation);
        setRegion({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        });
    };

    // use google places api to get the address of the current location
    const getAddress = async () => {
        const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${region.latitude},${region.longitude}&key=${GOOGLE_API_KEY}`);
        const json = await response.json();
        setUserLocation(json.results[0].formatted_address);
        console.log('address', userLocation);
    };

    useEffect(() => {
        getUserLocation();
    }, []);

    useEffect(() => {
        getAddress();
    }, [region]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>APPRO GENERATOR</Text>
            <Text style={styles.subtitle}>Appros whenever you want</Text>
            <Image style={styles.image} source={require('../assets/app-picture.png')} />
            <Input
                placeholder='Address'
                //label='Address'
                clearButtonMode='always'
                value={userLocation}
                onChangeText={value => setUserLocation(value)}
            />
            <Button
                size='sm'
                title='Use current location'
                type='outline'
                onPress={() => {
                    getUserLocation();
                    getAddress();
                }}
            />
            <Input
                placeholder='Enter radius in kilometers'
                //label='Radius'
                value={radius}
                clearButtonMode='always'
                onChangeText={value => setRadius(value * 1000)}
                keyboardType='numeric'
            />
            <Input
                placeholder='Number of places'
                //label='Number of places'
                clearButtonMode='always'
                onChangeText={value => setNumOfPlaces(value)}
                keyboardType='numeric'
            />
            <Button
                title='Search'
                type='outline'
                size='sm'
                onPress={fetchPlaces}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center',
    },
    image: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
        width: '90%',
        height: '90%',
        marginBottom: 20,
        borderRadius: 20,
        opacity: 0.7,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        marginTop: 30,
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 10,
        fontWeight: 'bold',
        color: 'gray',
        marginBottom: 10,
    },
});