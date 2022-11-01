import MapView, { Marker } from'react-native-maps';

export default function Map() {

    return (
        <MapView
        style={{ flex: 1 }}
        region={{
            latitude: 60.1708,
            longitude: 24.9375,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        }}
        >
        <Marker
            coordinate={{ latitude: 60.1708, longitude: 24.9375 }}
            title="Title"
            description="This is a marker"
        />
        </MapView>
    );
    }