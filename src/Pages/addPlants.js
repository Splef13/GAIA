import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Pressable } from 'react-native';
import { getDatabase, ref, set, push } from 'firebase/database';
import { FIREBASE_DB, FIREBASE_AUTH } from '../../FirebaseConfig';

const AdicionarPlanta = () => {
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

    if (
      Number(tempMin) > Number(tempMax) ||
      Number(lightMin) > Number(lightMax) ||
      Number(humidityMin) > Number(humidityMax)
    ) {
      alert('O valor mínimo não pode ser maior que o máximo!');
      return;
    }

    if (
      Number(tempMax) < Number(tempMin) ||
      Number(lightMax) < Number(lightMin) ||
      Number(humidityMax) < Number(humidityMin)
    ) {
      alert('O valor máximo não pode ser menor que o mínimo!');
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
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Incluir no Jardim</Text>
        <View style={styles.form}>
          <Text>Espécie:</Text>
          <TextInput
            style={styles.inputText}
            value={category}
            onChangeText={(text) => setCategory(text)}
            keyboardType="default"
          />
          <Text style={styles.inputTitle}>Condições ideais para a nova espécie</Text>
          <Text style={styles.inputTitle}>Temperatura</Text>
          <View style={styles.inputContainer}>
            <Text>Min.:</Text>
            <TextInput
              style={styles.inputNumber}
              value={tempMin}
              onChangeText={(text) => setTempMin(text)}
              keyboardType="numeric"
            />
            <Text>°C</Text>
            <Text>Máx.:</Text>
            <TextInput
              style={styles.inputNumber}
              value={tempMax}
              onChangeText={(text) => setTempMax(text)}
              keyboardType="numeric"
            />
            <Text>°C</Text>
          </View>

          <Text style={styles.inputTitle}>Luminosidade</Text>
          <View style={styles.inputContainer}>
            <Text>Min.:</Text>
            <TextInput
              style={styles.inputNumber}
              value={lightMin}
              onChangeText={(text) => setLightMin(text)}
              keyboardType="numeric"
            />
            <Text>lx</Text>
            <Text>Máx.:</Text>
            <TextInput
              style={styles.inputNumber}
              value={lightMax}
              onChangeText={(text) => setLightMax(text)}
              keyboardType="numeric"
            />
            <Text>lx</Text>
          </View>
          <Text style={styles.inputTitle}>Umidade</Text>
          <View style={styles.inputContainer}>
            <Text>Min.:</Text>
            <TextInput
              style={styles.inputNumber}
              value={humidityMin}
              onChangeText={(text) => setHumidityMin(text)}
              keyboardType="numeric"
            />
            <Text>%</Text>
            <Text>Máx.:</Text>
            <TextInput
              style={styles.inputNumber}
              value={humidityMax}
              onChangeText={(text) => setHumidityMax(text)}
              keyboardType="numeric"
            />
            <Text>%</Text>
          </View>
        </View>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText} onPress={handleSubmit}>Adicionar</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eeeeee',
    paddingHorizontal: 16,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 40, 
    marginBottom: 20
  },
  inputTitle: {
    fontWeight: 'bold', 
    marginBottom: 10,
    marginTop: 10
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  inputText: {
    height: 45,
    backgroundColor: "#ffffff",
    shadowColor: '#000000',
    borderRadius: 8,
    paddingHorizontal: 10,
    width: '100%',
    marginTop: 10,
    elevation: 2
  },
  inputNumber: {
    height: 45,
    backgroundColor: "#ffffff",
    shadowColor: '#000000',
    borderRadius: 8,
    paddingHorizontal: 10,
    width: '25%',
    marginTop: 10,
    elevation: 2,
  },
  button: {
    backgroundColor: '#165B42',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginTop: 30,
  },
  buttonText: {
    color: '#eeeeee',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center'
  }
});

export default AdicionarPlanta;