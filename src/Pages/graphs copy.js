import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { getDatabase, ref, onValue } from 'firebase/database';
import { FIREBASE_DB, FIREBASE_AUTH } from '../../FirebaseConfig';

const Relatorio = () => {
  const [usuario, setUsuario] = useState(null);
  const [plantas, setPlantas] = useState([]);

  useEffect(() => {
    FIREBASE_AUTH.onAuthStateChanged((user) => {
      if (user) {
        setUsuario(user.uid);
      } else {
        setUsuario(null);
      }
    });
  }, []);

  useEffect(() => {
    if (usuario) {
      const referencia = ref(FIREBASE_DB, `users/${usuario}/attributes`);
      onValue(referencia, (snapshot) => {
        const lista = [];
        snapshot.forEach((planta) => {
          lista.push({ ...planta.val(), id: planta.key });
        });
        setPlantas(lista);
      });
    }
  }, [usuario]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Attributes List</Text>
      <FlatList
        data={plantas}
        renderItem={({ item }) => (
          <View style={styles.attributeContainer}>
            <Text>Nome: {item.category}</Text>
            <Text>Temperatura Ideal: {item.tempMin}°C-{item.tempMax}°C</Text>
            <Text>Luminosidade Ideal: {item.lightMin} - {item.lightMax}</Text>
            <Text>Umidade Ideal: {item.humidityMin}%-{item.humidityMax}%</Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
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
  attributeContainer: {
    marginBottom: 20,
    padding: 10,
    borderColor: 'gray',
    borderWidth: 1,
  },
});

export default Relatorio;