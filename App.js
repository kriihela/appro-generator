import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Details from './components/Details';
import Results from './components/Results';
import Info from './components/Info';
import Favorites from './components/Favorites';
import * as SQLite from 'expo-sqlite';
import { useEffect } from 'react';

const db = SQLite.openDatabase('favorite_places.db');
const Stack = createNativeStackNavigator();

export default function App() {

  useEffect (() => {
    db.transaction(tx => {
      tx.executeSql(
          'create table if not exists favorites (id integer primary key not null, name text, address text);'
      );
  });
  }, []);


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
        <Stack.Screen name='Info' component={Info} />
        <Stack.Screen name='Favorites' component={Favorites} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}