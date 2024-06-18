import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { getDatabase, ref, onValue, query, orderByKey, limitToLast, limitToFirst } from 'firebase/database';
import { FIREBASE_DB, FIREBASE_AUTH } from '../../FirebaseConfig';
import { VictoryChart, VictoryLine, VictoryTheme, VictoryLabel, VictoryAxis } from 'victory-native';
const Relatorio = () => {
  const [usuario, setUsuario] = useState(null);
  const [attributes, setAttributes] = useState([]);
  const [dadosGrafico, setDadosGrafico] = useState([]);
  const [filterOption, setFilterOption] = useState('autitude');
  const [dominio, setDominio] = useState([700, 750]);


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
      const attributesRef = ref(getDatabase(), `users/${usuario}/attributes`);
      onValue(attributesRef, (snapshot) => {
        const attributesList = [];
        snapshot.forEach((planta) => {
          attributesList.push({ ...planta.val(), id: planta.key });
        });
        setAttributes(attributesList);
      });
    }
  }, [usuario]);

  useEffect(() => {
    if (usuario) {
      const readingsRef = ref(FIREBASE_DB, `Usuarios/${usuario}/Medicoes`);
      onValue(
        query(readingsRef, limitToLast(5)),
        (snapshot) => {
          const dadosGraficoLista = [];
          snapshot.forEach((reading, index) => {
            const readingData = reading.val();
            let value;
            switch (filterOption) {
              case 'autitude':
                value = parseFloat(readingData.autitude);
                setDominio([700, 750])
                break;
              case 'umidade':
                value = parseFloat(readingData.humidade);
                break;
              case 'luminosidade':
                value = parseFloat(readingData.luminosidade);
                break;
              case 'pressão':
                value = parseFloat(readingData.pressao);
                break;
              case 'temperatura':
                value = parseFloat(readingData.temperatura);
                break;
              default:
                value = 0;
            }
            dadosGraficoLista.push(value);
          });
          setDadosGrafico(dadosGraficoLista);
        }
      );
    }
  }, [usuario, filterOption]);

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
          </View>
        )}
        keyExtractor={(item) => item.id}
      />

      <View style={styles.filterContainer}>
        <Picker
          selectedValue={filterOption}
          onValueChange={(itemValue) => setFilterOption(itemValue)}
        >
          <Picker.Item label="Autitude" value="autitude" />
          <Picker.Item label="Humidade" value="umidade" />
          <Picker.Item label="Luminosidade" value="luminosidade" />
          <Picker.Item label="Pressão" value="pressão" />
          <Picker.Item label="Temperatura" value="temperatura" />
        </Picker>
      </View>

      <VictoryChart
        theme={VictoryTheme.material}
      >
        <VictoryLine
          style={{
            data: { stroke: "#c43a31" },
            parent: { border: "1px solid #ccc" }
          }}
          labels={({ datum }) => datum.y}
          labelComponent={<VictoryLabel renderInPortal dy={-20} />}
          data={dadosGrafico.map((y, index) => ({ x: index, y }))}
        />
        <VictoryAxis
          offsetY={50}
        />
        {/* <VictoryAxis
          
          tickLabelComponent={() => null} // hide y-axis labels
          key="y-axis"
        /> */}

      </VictoryChart>
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