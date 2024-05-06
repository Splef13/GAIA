import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { MaterialCommunityIcons, Entypo } from '@expo/vector-icons';

const plants = [
  { label: 'Lavanda', value: '1' },
  { label: 'Lírio', value: '2' },
  { label: 'Margarida', value: '3' },
  { label: 'Colve', value: '4' },
  { label: 'Cebolinha', value: '5' },
  { label: 'Salcinha', value: '6' },
  { label: 'Repolho', value: '7' },
  { label: 'Alface', value: '8' },
];

const controlador = [
  { label: 'Controlador 1', value: '1' },
  { label: 'Controlador 2', value: '2' },
  { label: 'Controlador 3', value: '3' },
];

export default function AddPlantsPage() {
  const [plantValue, setPlantValue] = useState(null);
  const [controllerValue, setControllerValue] = useState(null);
  const [isFocusPlants, setIsFocusPlants] = useState(false);
  const [isFocusController, setIsFocusController] = useState(false);
  const [tempMin, setTempMin] = useState('');
  const [tempMax, setTempMax] = useState('');
  const [lightMin, setLightMin] = useState('');
  const [lightMax, setLightMax] = useState('');
  const [humidityMin, setHumidityMin] = useState('');
  const [humidityMax, setHumidityMax] = useState('');

  const inputStyle = (isFocused) => ({
    ...styles.inputNumber,
    borderColor: isFocused ? '#165B42' : 'transparent',
  });

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.container}>
          <Text style={{ marginTop: 40, fontSize: 16, fontWeight: 'bold' }}>Incluir no Jardim</Text>

          <Text style={{ marginTop: 30 }}>Espécie:</Text>
          <Dropdown
            style={[styles.dropdown, isFocusPlants && { borderColor: '#165B42' }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={plants}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocusPlants ? 'Selecionar espécie' : '...'}
            searchPlaceholder="Pesquisar..."
            onFocus={() => setIsFocusPlants(true)}
            onBlur={() => setIsFocusPlants(false)}
            value={plantValue}
            onChange={item => {
              setPlantValue(item.value);
              setIsFocusPlants(false);
            }}
            renderLeftIcon={() => (
              <MaterialCommunityIcons
                style={styles.icon}
                name="flower"
                size={38}
                color={isFocusPlants ? '#165B42' : 'black'}
              />
            )}
          />

          <Text style={{ marginTop: 10, fontWeight: 'bold' }}>Controlador:</Text>
          <Dropdown
            style={[styles.dropdown, isFocusController && { borderColor: '#165B42' }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={controlador}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocusController ? 'Selecionar o controlador' : '...'}
            searchPlaceholder="Pesquisar..."
            onFocus={() => setIsFocusController(true)}
            onBlur={() => setIsFocusController(false)}
            value={controllerValue}
            onChange={item => {
              setControllerValue(item.value);
              setIsFocusController(false);
            }}
            renderLeftIcon={() => (
              <Entypo
                name="classic-computer"
                style={styles.icon}
                size={38}
                color={isFocusController ? '#165B42' : 'black'}
              />
            )}
          />
          <Text
            style={{
              marginTop: 20,
              fontWeight: 'bold',
              fontSize: 16
            }}>
            Condições ideais de nova espécie
          </Text>

          <Text style={{ marginTop: 20, fontWeight: 'bold' }}>Temperatura:</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text>Mín.:</Text>
            <TextInput
              style={inputStyle(tempMin !== '')}
              placeholder="Min."
              value={tempMin}
              onChangeText={setTempMin}
              keyboardType="number-pad"
            />
            <Text>Máx.:</Text>
            <TextInput
              style={inputStyle(tempMax !== '')}
              placeholder="Máx."
              value={tempMax}
              onChangeText={setTempMax}
              keyboardType="number-pad"
            />
          </View>

          <Text style={{ marginTop: 10, fontWeight: 'bold' }}>Luminosidade:</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text>Mín.:</Text>
            <TextInput
              style={inputStyle(lightMin !== '')}
              placeholder="50%"
              value={lightMin}
              onChangeText={setLightMin}
              keyboardType="number-pad"
            />
            <Text>Máx.:</Text>
            <TextInput
              style={inputStyle(lightMax !== '')}
              placeholder="65%"
              value={lightMax}
              onChangeText={setLightMax}
              keyboardType="number-pad"
            />
          </View>

          <Text style={{ marginTop: 10, fontWeight: 'bold' }}>Umidade:</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text>Mín.:</Text>
            <TextInput
              style={inputStyle(humidityMin !== '')}
              placeholder="60%"
              value={humidityMin}
              onChangeText={setHumidityMin}
              keyboardType="number-pad"
            />
            <Text>Máx.:</Text>
            <TextInput
              style={inputStyle(humidityMax !== '')}
              placeholder="70%"
              value={humidityMax}
              onChangeText={setHumidityMax}
              keyboardType="number-pad"
            />
          </View>

          <View style={{ alignItems: 'center' }}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Salvar</Text>
            </TouchableOpacity>
          </View>

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eeeeee',
    paddingHorizontal: 16,
  },
  dropdown: {
    height: 55,
    borderColor: 'transparent',
    backgroundColor: "#ffffff",
    shadowColor: '#000000',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    width: '100%',
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  inputNumber: {
    height: 55,
    backgroundColor: "#ffffff",
    shadowColor: '#000000',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    width: '35%',
    marginTop: 10,
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
  }
});
