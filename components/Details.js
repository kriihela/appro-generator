import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Image, KeyboardAvoidingView, ActivityIndicator } from 'react-native';
import { Input, Button, Header, Slider } from 'react-native-elements';
import { GOOGLE_API_KEY } from '@env';

export default function Details({ navigation }) {

    // Details for the search
    const [userLocation, setUserLocation] = useState('');
    const [numOfPlaces, setNumOfPlaces] = useState(1);
    const [radius, setRadius] = useState(1);
    const [places, setPlaces] = useState([]);

    // Details for the map
    const [region, setRegion] = useState({
        latitude: 60.1708,
        longitude: 24.9375,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });

    // Loading screen while fetching user location on startup
    //
    const [loading, setLoading] = useState(false);

    const userLocationBoot = async () => {
        setLoading(true);
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
        }
        let location = await Location.getCurrentPositionAsync({});
        setRegion({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        });
        setLoading(false);
    };

    useEffect(() => {
        userLocationBoot();
    }, []);
    //
    // End of loading screen

    // Fetch nearest bars
    const fetchPlaces = async () => {
        const response = await fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${region.latitude},${region.longitude}&radius=${radius * 1000}&type=bar&key=${GOOGLE_API_KEY}`)
        const data = await response.json();
        const places = data.results;
        return places;
    }

    // when user clicks the button, fetch places and set them to the state and navigate to the Results screen
    const search = async () => {
        const places = await fetchPlaces();
        setPlaces(places);
        navigation.navigate('Results', { places: places, numOfPlaces: numOfPlaces });
    }

    // Get user location
    const getUserLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
        }
        let location = await Location.getCurrentPositionAsync({});
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
    };

    // get coordinates from input
    const getCoordinates = async () => {
        const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${userLocation}&key=${GOOGLE_API_KEY}`);
        const json = await response.json();
        return json;
    };
    
    // handle coordinates from input
    const handleCoordinates = async () => {
        const json = await getCoordinates();
        setRegion({
            latitude: json.results[0].geometry.location.lat,
            longitude: json.results[0].geometry.location.lng,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        });
    };
    
    if (loading) {
        return (
            <View style={styles.bootContainer}>
                <Image style={{
                    height: 400,
                    margin: 20,
                    resizeMode: 'contain',
                    alignContent: 'center',
                    justifyContent: 'center',
                    opacity: 0.9,
                }} source={require('../assets/boot-screen.png')} />
                <Text style={styles.text}>APPRO GENERATOR</Text>
                <ActivityIndicator size="large" color="white" />
            </View>
        );

    } else {
        return (
            <View style={styles.container}>
                <Header
                    containerStyle={{ borderBottomColor: 'black', backgroundColor: 'black' }}
                    rightComponent={{ icon: 'info', color: '#fff', onPress: () => navigation.navigate('Info') }}
                    centerComponent={{ text: 'APPRO GENERATOR', style: { color: '#fff' } }}
                />
                <Image style={styles.image} source={require('../assets/app-picture.png')} />
                <View style={styles.inputContainer}>
                    <Input
                        placeholder='Enter the address'
                        inputStyle={{ color: 'white' }}
                        keyboardAppearance='dark'
                        value={userLocation}
                        rightIcon={{
                            type: 'material',
                            name: 'clear',
                            color: 'white',
                            onPress: () => setUserLocation(''),
                        }}
                        onChangeText={value => setUserLocation(value)}
                        onSubmitEditing={handleCoordinates}
                    />
                    <Button
                        icon={{
                            name: 'location-on',
                            type: 'material',
                            color: 'white'

                        }}
                        type='clear'
                        onPress={() => {
                            getUserLocation();
                            getAddress();
                        }}
                    />
                </View>
                <KeyboardAvoidingView style={styles.radiusAndPlacesContainer} behavior="padding" enabled>
                    {/*}
                <Input
                    placeholder='Enter radius in kilometers'
                    value={radius}
                    clearButtonMode='always'
                    keyboardType='number-pad'
                    returnKeyType='done'
                    keyboardAppearance='dark'
                    inputStyle={{ color: 'white' }}
                    clearTextOnFocus={true}
                    onChangeText={value => setRadius(value * 1000)}
                />
                <Input
                    placeholder='Number of places'
                    value={numOfPlaces}
                    clearButtonMode='always'
                    clearTextOnFocus={true}
                    keyboardType='number-pad'
                    inputStyle={{ color: 'white' }}
                    keyboardAppearance='dark'
                    returnKeyType='done'
                    onChangeText={value => setNumOfPlaces(value)}
                />
                */}
                </KeyboardAvoidingView>
                <Slider
                    value={radius}
                    onValueChange={value => setRadius(value)}
                    minimumValue={1}
                    maximumValue={10}
                    step={1}
                    thumbTintColor='white'
                    minimumTrackTintColor='grey'
                    maximumTrackTintColor='grey'
                    style={{ width: 300 }}
                />
                <Text style={{ color: 'white' }}>Radius: {radius} km</Text>
                <Slider
                    value={numOfPlaces}
                    onValueChange={value => setNumOfPlaces(value)}
                    minimumValue={1}
                    maximumValue={20}
                    step={1}
                    thumbTintColor='white'
                    minimumTrackTintColor='red'
                    maximumTrackTintColor='green'
                    style={{ width: 300 }}
                />
                <Text style={{ color: 'white', marginBottom: 20 }}>Number of places: {numOfPlaces}</Text>
                <Button
                    type='outline'
                    buttonStyle={{ borderColor: 'white', borderRadius: 10, width: 200 }}
                    titleStyle={{ color: 'white' }}
                    icon={{
                        name: 'arrow-right',
                        type: 'font-awesome',
                        color: 'white'
                    }}
                    containerStyle={{ marginBottom: 30 }}
                    onPress={search}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center',
    },
    image: {
        flex: 1,
        width: '100%',
        marginBottom: 20,
        borderRadius: 20,
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
    inputContainer: {
        marginHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'nowrap',
    },
    radiusAndPlacesContainer: {
        flexDirection: 'row',
        flexWrap: 'nowrap',
        marginHorizontal: 100,
    },
    text: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        margin: 20,
    },
    bootContainer: {
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
    },
});