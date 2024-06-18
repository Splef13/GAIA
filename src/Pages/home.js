import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { CaretLeft, CaretRight, Drop, Info, Sun, Thermometer } from "phosphor-react-native";
import { getDatabase, ref, onValue, query, orderByKey, limitToLast, limitToFirst } from 'firebase/database';
import { FIREBASE_DB, FIREBASE_AUTH } from '../../FirebaseConfig';


function Card({ icon: Icon, title, value }) {
  return (
    <View style={styles.card}>
      {Icon && Icon}
      <Text style={styles.cardText}>{title}</Text>
      <Text style={[styles.cardText, { marginLeft: "auto" }]}>{value}</Text>
    </View>
  );
}

const HomeScreen = () => {
  const [umidade, setUmidade] = useState('');
  const [temperatura, setTemperatura] = useState('');
  const [luz,setLuz] = useState('');


  const navigation = useNavigation();

  const handleLoginPress = () => {
    navigation.navigate("Login");
  };
  const [usuario, setUsuario] = useState(null);
  const [attributes, setAttributes] = useState([]);


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
        query(readingsRef, limitToLast(1)),
        (snapshot) => {
          const umidadeValor = [];
          const luzValor = [];
          const tempValor = [];
          snapshot.forEach((reading, index) => {
            const readingData = reading.val();
            umidadeValor.push(readingData.humidade);
            luzValor.push(readingData.luminosidade);
            tempValor.push(readingData.temperatura);
          });
          setUmidade(umidadeValor);
          setLuz(luzValor);
          setTemperatura(tempValor);
        }
      );
    }
  }, [usuario]);

  return (
    <ScrollView>
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("../Assts/logo.png")}
          style={{
            width: 50,
            height: 50,
          }}
        />
        <Image
          source={require("../Assts/mo-removebg-preview.png")}
          style={{
            width: 100,
            height: 25,
            marginLeft: 10,
            marginTop: 5
          }}
        />
      </View>

      <View style={styles.plantinfo}>
        {/* CHAMAR NOME PLANTA NO BANCO */}
        <Text style={styles.headerText}>Orquídea</Text>
        <Info size={20} color="green" style={{ marginLeft: 10 }} />
      </View>

      <View style={styles.plantaa}>
        <CaretLeft style={styles.runrun} size={40} color="#999999" />

        <View style={styles.plantContainer}>
          <Image
            source={require("../Assts/plant.png")}
            style={{
              width: 150,
              height: 190,
            }}
          />
        </View>

        <CaretRight style={styles.runrun} size={40} color="#999999" />
      </View>

      <View style={styles.plantinfo}>
        <Text style={styles.headerText}>Status: Bom</Text>
      </View>

      <View style={styles.cards}>
        <Card
          icon={<Drop size={24} color="#165B42" weight="fill" />}
          title="Umidade"
          value= {umidade+"%"}
        />
        <Card
          icon={<Thermometer size={24} color="#165B42" weight="fill" />}
          title="Temperatura"
          value= {temperatura+"ºC"}
        />
        <Card
          icon={<Sun size={24} color="#165B42" weight="fill" />}
          title="Iluminação"
          value={luz+" lx"}
        />
      </View>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: "center",
    paddingTop: 64,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    // marginBottom: 50,
  },
  headerText: {
    color: "#1c1c1c",
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 12,
  },
  plantContainer: {
    padding: 50,
    backgroundColor: "#fff",
    borderRadius: 500,
    elevation: 2
  },
  plantinfo: {
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginTop: 10,
  },

  plantaa: {
    marginTop: 10,
    paddingHorizontal: 130,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",

  },
  runrun: {
    margin: 20
  },
  cards: {
    justifyContent: "space-around",
    gap: 24,
    marginTop: 24,
    paddingHorizontal: 24,
    
  },
  card: {
    width: "100%",
    flexDirection: "row",
    backgroundColor: "#FFF",
    borderRadius: 8,
    gap: 16,
    paddingHorizontal: 24,
    paddingVertical: 16,
    elevation: 2
  },
  cardText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default HomeScreen;
