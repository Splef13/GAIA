import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { getDatabase, ref, onValue } from 'firebase/database';
import { FIREBASE_DB, FIREBASE_AUTH } from '../../FirebaseConfig';
import { VictoryChart, VictoryLine, VictoryTheme } from 'victory-native';

const Relatorio = () => {
  const [usuario, setUsuario] = useState(null);
  const [attributes, setAttributes] = useState([]);
  const [chartData, setChartData] = useState([]);

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
      const attributesRef = ref(FIREBASE_DB, `users/${usuario}/attributes`);
      onValue(attributesRef, (snapshot) => {
        const attributesList = [];
        snapshot.forEach((planta) => {
          attributesList.push({ ...planta.val(), id: planta.key });
        });
        setAttributes(attributesList);

        // Create chart data
        const chartDataList = attributesList.map((attribute) => ({
          x: attribute.category,
          y: (attribute.tempMin + attribute.tempMax) / 2,
        }));
        setChartData(chartDataList);
      });

      // Fetch readings data
      const readingsRef = ref(FIREBASE_DB, `UsersData/${usuario}/readings`);
      onValue(readingsRef, (snapshot) => {
        const chartDataList = [];
        snapshot.forEach((reading) => {
          const readingData = reading.val();
          chartDataList.push({
            x: readingData.timestamp, // or whatever field you want to use for x-axis
            y: readingData.value, // or whatever field you want to use for y-axis
          });
        });
        setChartData(chartDataList);
      });
    }
  }, [usuario]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Relatórios</Text>
      <FlatList
        data={attributes}
        renderItem={({ item }) => (
          <View style={styles.attributeContainer}>
            <Text style={styles.attributeLabel}>Nome:</Text>
            <Text style={styles.attributeValue}>{item.category}</Text>
            <Text style={styles.attributeLabel}>Temperatura Ideal:</Text>
            <Text style={styles.attributeValue}>{item.tempMin}°C - {item.tempMax}°C</Text>
            <Text style={styles.attributeLabel}>Luz Ideal:</Text>
            <Text style={styles.attributeValue}>{item.lightMin} - {item.lightMax}</Text>
            <Text style={styles.attributeLabel}>Umidade Ideal:</Text>
            <Text style={styles.attributeValue}>{item.humidityMin}% - {item.humidityMax}%</Text>
            <VictoryChart width={350} theme={VictoryTheme.material}>
              <VictoryLine
                style={{
                  data: { stroke: "#c43a31" },
                  parent: { border: "1px solid #ccc" }
                }}
                data={chartData}
              />
            </VictoryChart>
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