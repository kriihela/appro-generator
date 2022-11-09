import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Map from './components/Map';
import Details from './components/Details';
import Results from './components/Results';
import Info from './components/Info';

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Details'
        screenOptions={
          {
            headerShown: false
          }
        }>
        <Stack.Screen name='Details' component={Details} />
        <Stack.Screen name='Map' component={Map} />
        <Stack.Screen name='Results' component={Results} />
        <Stack.Screen name='Info' component={Info} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    width: '100%',
  },
});