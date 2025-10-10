import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert, Text, TextInput } from 'react-native';

export default function ElectricalScreen() {
  const [current, setCurrent] = useState<string>('');
  const [resistance, setResistance] = useState<string>('');
  const [voltage, setVoltage] = useState<string>('');

  const calculateVoltage = () => {
    const i = parseFloat(current);
    const r = parseFloat(resistance);

    if (isNaN(i) || isNaN(r)) {
      Alert.alert('Invalid Input', 'Please enter valid numbers for current and resistance.');
      return;
    }

    const v = i * r;
    setVoltage(v.toFixed(2)); // Display voltage with 2 decimal places
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter Current (Amps)"
        keyboardType="numeric"
        value={current}
        onChangeText={setCurrent}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Resistance (Ohms)"
        keyboardType="numeric"
        value={resistance}
        onChangeText={setResistance}
      />
      <TouchableOpacity style={styles.button} onPress={calculateVoltage}>
        <Text style={styles.buttonText}>Calculate Voltage</Text>
      </TouchableOpacity>
      {voltage ? <Text style={styles.resultText}>Voltage: {voltage} V</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0', // Added a background color for visibility
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
    width: '80%',
    fontSize: 16,
    backgroundColor: '#fff',
  },
  resultText: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
});