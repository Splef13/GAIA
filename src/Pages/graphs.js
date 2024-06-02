import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getDatabase, ref, onValue } from 'firebase/database';
import { FIREBASE_DB } from '../../FirebaseConfig';

const Relatorio = () => {
  const [attributes, setAttributes] = useState([]);

  useEffect(() => {
    const dbRef = ref(getDatabase(), 'attributes');
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      const attributeList = [];
      for (const key in data) {
        attributeList.push({ id: key,...data[key] });
      }
      setAttributes(attributeList);
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Relatório</Text>
      {attributes.map((attribute) => (
        <View key={attribute.id} style={styles.attributeContainer}>
          <Text style={styles.attributeLabel}>Nome:</Text>
          <Text style={styles.attributeValue}>{attribute.category}</Text>
          <Text style={styles.attributeLabel}>Temperatura Recomendada:</Text>
          <Text style={styles.attributeValue}>
            {attribute.tempMin}°C - {attribute.tempMax}°C
          </Text>
          <Text style={styles.attributeLabel}>Luminosidade Recomendada:</Text>
          <Text style={styles.attributeValue}>
            {attribute.lightMin} - {attribute.lightMax}
          </Text>
          <Text style={styles.attributeLabel}>Humidade Recomendada:</Text>
          <Text style={styles.attributeValue}>
            {attribute.humidityMin}% - {attribute.humidityMax}%
          </Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 40,
    marginBottom: 20,
    color: '#000', 
  },
  attributeContainer: {
    backgroundColor: '#fff', 
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  attributeLabel: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  attributeValue: {
    marginBottom: 10,
  },
});

export default Relatorio;