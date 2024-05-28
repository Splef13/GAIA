import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { getDatabase, ref, set } from 'firebase/database';
import { FIREBASE_DB } from '../../FirebaseConfig';

const AddAttributesPage = () => {
  const [category, setCategory] = useState('');
  const [tempMin, setTempMin] = useState('');
  const [tempMax, setTempMax] = useState('');
  const [lightMin, setLightMin] = useState('');
  const [lightMax, setLightMax] = useState('');
  const [humidityMin, setHumidityMin] = useState('');
  const [humidityMax, setHumidityMax] = useState('');

  const handleSubmit = async () => {
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
      await set(ref(FIREBASE_DB, 'attributes', category), attributes);
      alert('Attributes added successfully!');
    } catch (error) {
      console.error(error);
      alert('Error adding attributes!');
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
        <Text>Minimum Temperature (°C)</Text>
        <TextInput
          style={styles.input}
          value={tempMin}
          onChangeText={(text) => setTempMin(text)}
          keyboardType="numeric"
        />
        <Text>Maximum Temperature (°C)</Text>
        <TextInput
          style={styles.input}
          value={tempMax}
          onChangeText={(text) => setTempMax(text)}
          keyboardType="numeric"
        />
        <Text>Minimum Light</Text>
        <TextInput
          style={styles.input}
          value={lightMin}
          onChangeText={(text) => setLightMin(text)}
          keyboardType="numeric"
        />
        <Text>Maximum Light</Text>
        <TextInput
          style={styles.input}
          value={lightMax}
          onChangeText={(text) => setLightMax(text)}
          keyboardType="numeric"
        />
        <Text>Minimum Humidity</Text>
        <TextInput
          style={styles.input}
          value={humidityMin}
          onChangeText={(text) => setHumidityMin(text)}
          keyboardType="numeric"
        />
        <Text>Maximum Humidity</Text>
        <TextInput
          style={styles.input}
          value={humidityMax}
          onChangeText={(text) => setHumidityMax(text)}
          keyboardType="numeric"
        />
      </View>
      <View style={styles.buttonContainer}>
        <Text style={styles.button} onPress={handleSubmit}>Save</Text>
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