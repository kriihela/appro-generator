import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Details from './components/Details';
import Results from './components/Results';

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
        <Stack.Screen name='Results' component={Results} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}