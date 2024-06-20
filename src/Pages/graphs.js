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
  const [filtro, setFiltro] = useState('autitude');
  const [dominio, setDominio] = useState();
  const [cor,setCor] = useState();


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
      onValue(attributesRef, (docs) => {
        const attributesList = [];
        docs.forEach((planta) => {
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
        (medicoes) => {
          const dadosGraficoLista = [];
          medicoes.forEach((reading, index) => {
            const readingData = reading.val();
            let value;
            switch (filtro) {
              case 'autitude':
                value = parseFloat(readingData.autitude);
                const min = Math.min(...dadosGraficoLista);
                const max = Math.max(...dadosGraficoLista);
                setDominio([min - 1, max + 1]);
                setCor("#34C759");
                break;
              case 'umidade':
                value = parseFloat(readingData.humidade);
                const minUmidade = Math.min(...dadosGraficoLista);
                const maxUmidade = Math.max(...dadosGraficoLista);
                setDominio([minUmidade - 1, maxUmidade + 1]);
                setCor("#45B3FA");
                break;
              case 'luminosidade':
                value = parseFloat(readingData.luminosidade);
                const minLuminosidade = Math.min(...dadosGraficoLista);
                const maxLuminosidade = Math.max(...dadosGraficoLista);
                setDominio([minLuminosidade - 1, maxLuminosidade + 1]);
                setCor("#F7DC6F");
                break;
              case 'pressão':
                value = parseFloat(readingData.pressao);
                const minPressao = Math.min(...dadosGraficoLista);
                const maxPressao = Math.max(...dadosGraficoLista);
                setDominio([minPressao - 0.05, maxPressao + 0.05]);
                setCor("#9B59B6");
                break;
              case 'temperatura':
                value = parseFloat(readingData.temperatura);
                const minTemperatura = Math.min(...dadosGraficoLista);
                const maxTemperatura = Math.max(...dadosGraficoLista);
                setDominio([minTemperatura - 1, maxTemperatura + 1]);
                setCor("#E74C3C")
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
  }, [usuario, filtro]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Relatórios</Text>
      <View style={styles.containerLista}>
        <FlatList
          data={attributes}
          renderItem={({ item }) => (
            <View>
              <View style={styles.attributeContainer}>
                <Text style={styles.attributeLabel}>Nome:</Text>
                <Text style={styles.attributeValue}>{item.category}</Text>
              </View>
              <View style={styles.attributeContainer}>
                <Text style={styles.attributeLabel}>Temperatura Ideal:</Text>
                <Text style={styles.attributeValue}>{item.tempMin}°C - {item.tempMax}°C</Text>
              </View>
              <View style={styles.attributeContainer}>
                <Text style={styles.attributeLabel}>Luz Ideal:</Text>
                <Text style={styles.attributeValue}>{item.lightMin} - {item.lightMax}</Text>
              </View>
              <View style={styles.attributeContainer}>
                <Text style={styles.attributeLabel}>Umidade Ideal:</Text>
                <Text style={styles.attributeValue}>{item.humidityMin}% - {item.humidityMax}%</Text>
              </View>
            </View>
          )
          }
          keyExtractor={(item) => item.id}
        />
      </View>
      < View style={styles.filterContainer} >
        <Picker
          selectedValue={filtro}
          onValueChange={(filtro) => setFiltro(filtro)}
        >
          <Picker.Item label="Autitude" value="autitude" />
          <Picker.Item label="Umidade" value="umidade" />
          <Picker.Item label="Luminosidade" value="luminosidade" />
          <Picker.Item label="Pressão" value="pressão" />
          <Picker.Item label="Temperatura" value="temperatura" />
        </Picker>
      </View >


      <View style={styles.chartContainer}>
        <VictoryChart
          theme={VictoryTheme.material}
        >
          <VictoryLine
            style={{
              data: { stroke: cor },
              parent: { border: "1px solid #ccc" }
            }}
            domain={{ y: dominio }}
            labels={dadosGrafico.map((valor) => `${valor}`)}
            labelComponent={<VictoryLabel renderInPortal dy={-20} />}
            data={dadosGrafico.map((y, index) => ({ x: index + 1, y }))}
            animate={{
              duration: 500
            }}
          />
          <VictoryAxis
            offsetY={50}
          />


        </VictoryChart>
      </View>

    </View >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eeeeee',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 40,
    marginBottom: 10,
    color: '#000',
  },
  attributeContainer: {
    flexDirection: 'row',
  },
  attributeLabel: {
    fontWeight: 'bold',
    margin: 5
  },
  attributeValue: {
    margin: 5
  },
  chartContainer: {
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 2
  },
  filterContainer: {
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 10,
    elevation: 2,
  },
  containerLista:{
    height: 170, 
    backgroundColor: '#fff',
    borderRadius: 8, 
    elevation: 2, 
    marginBottom: 20
  }
});

export default Relatorio;