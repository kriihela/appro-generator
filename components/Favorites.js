import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import { ListItem, Header, Icon } from 'react-native-elements';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('favorite_places.db');

export default function Favorites({ navigation }) {

  const [favorites, setFavorites] = useState([]);

  // get
  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('select * from favorites;', [], (_, { rows }) =>
        setFavorites(rows._array)
      );
    });
  }
    , []);

  // delete
  const deletePlace = (item) => {
    db.transaction(
      tx => {
        tx.executeSql(`delete from favorites where id = ?;`, [item.id]);
      },
      null,
      updateList
    )
  }

  // update
  const updateList = () => {
    db.transaction(tx => {
      tx.executeSql('select * from favorites;', [], (_, { rows }) =>
        setFavorites(rows._array)
      );
    });
  }

  if (favorites.length === 0) {

    return (
      <View style={{backgroundColor: "black", flex: 1}}>
        <Header
          containerStyle={{ backgroundColor: 'black', borderBottomColor: 'black' }}
          leftComponent={<Icon name="arrow-back" color="white" onPress={() => navigation.navigate('Details')} />}
          centerComponent={{ text: 'Favorites', style: { color: 'white', fontSize: 20 } }}
        />
        <Text style={{ color: 'white', alignSelf: 'center', margin: 20 }}>No favorites yet</Text>
      </View>
    );

  } else {

    return (
      <View style={styles.container}>
        <Header
          containerStyle={{ backgroundColor: 'black', borderBottomColor: 'black' }}
          leftComponent={<Icon name="arrow-back" color="white" onPress={() => navigation.navigate('Details')} />}
          centerComponent={{ text: 'Favorites', style: { color: 'white', fontSize: 20 } }}
        />
        <FlatList
          style={styles.list}
          keyExtractor={item => item.id.toString()}
          data={favorites}
          renderItem={({ item }) => (
            <ListItem bottomDivider style={styles.listItem}>
              <ListItem.Content>
                <ListItem.Title>{item.name}</ListItem.Title>
                <ListItem.Subtitle>{item.address}</ListItem.Subtitle>
              </ListItem.Content>
              <Icon
                name="delete"
                size={30}
                color="red"
                onPress={() => deletePlace(item)}
              />
            </ListItem>
          )}
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
    justifyContent: 'center',
  },
  list: {
    width: '100%',
    backgroundColor: 'black',
  },
  listItem: {
    backgroundColor: 'black',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
});