import React from 'react';
import { View, StyleSheet, TouchableOpacity, Alert, Text } from 'react-native';

export default function ElectricalScreen() {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => Alert.alert('Test', 'Button pressed!')}>
        <Text style={styles.buttonText}>Solve for Voltage</Text>
      </TouchableOpacity>
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
});