import React from 'react';
import { View, Text, StyleSheet, Image, Linking } from 'react-native';
import { Button, Header } from 'react-native-elements';

export default function Info({ navigation }) {
    return (
        <View style={styles.container}>
            <Header containerStyle={{ borderBottomColor: 'black', backgroundColor: 'black' }}
                leftComponent={{ icon: 'arrow-back', color: '#fff', onPress: () => navigation.goBack() }}
                centerComponent={{ text: 'Info', style: { color: '#fff' } }}
            />
            <Text style={styles.text}>Appro generator is the final project of Haaga-Helia University of Applied Sciences' mobile programming course.</Text>
            <Text> </Text>
            <Text style={styles.text}>The purpose of the application is to make life easier for a thirsty student.</Text>
            <Text> </Text>
            <Text style={styles.text}>The application uses Google Places API to find the nearest bars and React Native & Expo frameworks. Images are created by using Dall-E.</Text>
            <Text> </Text>
            <Text> </Text>
            <Text style={styles.text}>The application was created by:</Text>
            <Text style={styles.text}>Kristian Riihelä</Text>
            <View style={styles.buttonContainer}>
                <Button
                    title='Email'
                    icon={{
                        name: 'email',
                        type: 'material',
                        color: 'white'
                    }}
                    type='clear'
                    onPress={() => Linking.openURL('mailto:kristian.riihela@gmail.com')}
                />
                <Button
                    title='Github'
                    type='clear'
                    icon={{
                        name: 'github',
                        type: 'font-awesome',
                        color: 'white'
                    }}
                    onPress={() => Linking.openURL('https://github.com/kriihela/appro-generator')}
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
    },
    text: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'white',
        marginTop: 20,
        marginBottom: 5,
        textAlign: 'center',
    },
    link: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'blue',
        marginTop: 30,
        marginBottom: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
        flexWrap: 'nowrap',
        marginHorizontal: 100,
        marginTop: 10,
    },
});