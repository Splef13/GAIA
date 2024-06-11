import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { getDatabase, ref, set, push } from 'firebase/database';
import { FIREBASE_DB, FIREBASE_AUTH } from '../../FirebaseConfig';

const AddAttributesPage = () => {
  const [category, setCategory] = useState('');
  const [tempMin, setTempMin] = useState('');
  const [tempMax, setTempMax] = useState('');
  const [lightMin, setLightMin] = useState('');
  const [lightMax, setLightMax] = useState('');
  const [humidityMin, setHumidityMin] = useState('');
  const [humidityMax, setHumidityMax] = useState('');
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    FIREBASE_AUTH.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user.uid);
      } else {
        setCurrentUser(null);
      }
    });
  }, []);

  const handleSubmit = async () => {
    if (!currentUser) {
      alert('Você precisa de estar logado para alterar!');
      return;
    }

    try {
      const attributes = {
        category,
        tempMin,
        tempMax,
        lightMin,
        lightMax,
        humidityMin,
        humidityMax,
      };
      const newRef = push(ref(FIREBASE_DB, `users/${currentUser}/attributes`));
      await set(newRef, attributes);
      alert('Atributos adicionado com sucesso!');
    } catch (error) {
      console.error(error);
      alert('Erro adicionando os atributos!');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Attributes</Text>
      <View style={styles.form}>
        <Text>Planta</Text>
        <TextInput
          style={styles.input}
          value={category}
          onChangeText={(text) => setCategory(text)}
          keyboardType="default"
        />
        <Text>Temperatura minima (°C)</Text>
        <TextInput
          style={styles.input}
          value={tempMin}
          onChangeText={(text) => setTempMin(text)}
          keyboardType="numeric"
        />
        <Text>Temperatura maxima(°C)</Text>
        <TextInput
          style={styles.input}
          value={tempMax}
          onChangeText={(text) => setTempMax(text)}
          keyboardType="numeric"
        />
        <Text>Luminosidade minima</Text>
        <TextInput
          style={styles.input}
          value={lightMin}
          onChangeText={(text) => setLightMin(text)}
          keyboardType="numeric"
        />
        <Text>Luminosidade maxima</Text>
        <TextInput
          style={styles.input}
          value={lightMax}
          onChangeText={(text) => setLightMax(text)}
          keyboardType="numeric"
        />
        <Text>Humidade minima</Text>
        <TextInput
          style={styles.input}
          value={humidityMin}
          onChangeText={(text) => setHumidityMin(text)}
          keyboardType="numeric"
        />
        <Text>Humidade maxima</Text>
        <TextInput
          style={styles.input}
          value={humidityMax}
          onChangeText={(text) => setHumidityMax(text)}
          keyboardType="numeric"
        />
      </View>
      <View style={styles.buttonContainer}>
        <Text style={styles.button} onPress={handleSubmit}>Adicionar</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  form: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#4CAF50',
    color: '#fff',
    padding: 10,
    borderRadius: 5,
  },
});

export default AddAttributesPage;