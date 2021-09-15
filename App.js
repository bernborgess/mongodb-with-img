import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Realm from "realm";


const Person = {
  name: "Person",
  primaryKey: "_id",
  properties: {
    _id: "objectId",
    name: "string",
    image: "string"
  },
  required: [
    _id,
    name,
    image
  ],
};

// Cria o banco
const realm = await Realm.open({
  //? Entra outros schemas
  schema: [Person],
});

// imageName = nome da imagem de teste
const imageName;

// C - Create
// Provável que _id tem como gerar automaticamente pelo realm, se n tiver nanoid
const newPerson = realm.create("Person",{
  name: "Daniel",
  image: imageName,
});

// realm.write(() => {newPerson});
realm.write(newPerson);

// R - Read
// ! OUT NISSO
const people = realm.objects("Person");
const person = realm.objectForPrimaryKey('Person', item_id);


// U - Update



// D - Delete


export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
