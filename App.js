import {View, Text, StyleSheet } from 'react-native';

import Login from 'src/app/Login'
import CreateAcount from 'src/app/CreateAcount'

export default function App() {
  return (
    <View style={styles.container}>
      <Text>HOME</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});