import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function ElectricalScreen() {
  const [displayValue, setDisplayValue] = useState('0');
  const [operator, setOperator] = useState(null);
  const [previousValue, setPreviousValue] = useState(null);

  const handleNumberInput = (num) => {
    if (displayValue === '0') {
      setDisplayValue(num.toString());
    } else {
      setDisplayValue(displayValue + num.toString());
    }
  };

  const handleOperatorInput = (op) => {
    setOperator(op);
    setPreviousValue(displayValue);
    setDisplayValue('0');
  };

  const handleEqual = () => {
    const current = parseFloat(displayValue);
    const previous = parseFloat(previousValue);

    if (operator === '+') {
      setDisplayValue((previous + current).toString());
    } else if (operator === '-') {
      setDisplayValue((previous - current).toString());
    } else if (operator === '*') {
      setDisplayValue((previous * current).toString());
    } else if (operator === '/') {
      setDisplayValue((previous / current).toString());
    }

    setOperator(null);
    setPreviousValue(null);
  };

  const handleClear = () => {
    setDisplayValue('0');
    setOperator(null);
    setPreviousValue(null);
  };

  const handlePercent = () => {
    const current = parseFloat(displayValue);
    setDisplayValue((current / 100).toString());
  };

  const handleToggleSign = () => {
    const current = parseFloat(displayValue);
    setDisplayValue((-current).toString());
  };

  const handleDecimal = () => {
    if (!displayValue.includes('.')) {
      setDisplayValue(displayValue + '.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.displayContainer}>
        <Text style={styles.displayText}>{displayValue}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.row}>
          <TouchableOpacity style={[styles.button, styles.specialButton]} onPress={handleClear}><Text style={styles.buttonText}>C</Text></TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.specialButton]} onPress={handleToggleSign}><Text style={styles.buttonText}>+/-</Text></TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.specialButton]} onPress={handlePercent}><Text style={styles.buttonText}>%</Text></TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.operatorButton]} onPress={() => handleOperatorInput('/')}><Text style={styles.buttonText}>/</Text></TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity style={styles.button} onPress={() => handleNumberInput(7)}><Text style={styles.buttonText}>7</Text></TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleNumberInput(8)}><Text style={styles.buttonText}>8</Text></TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleNumberInput(9)}><Text style={styles.buttonText}>9</Text></TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.operatorButton]} onPress={() => handleOperatorInput('*')}><Text style={styles.buttonText}>*</Text></TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity style={styles.button} onPress={() => handleNumberInput(4)}><Text style={styles.buttonText}>4</Text></TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleNumberInput(5)}><Text style={styles.buttonText}>5</Text></TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleNumberInput(6)}><Text style={styles.buttonText}>6</Text></TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.operatorButton]} onPress={() => handleOperatorInput('-')}><Text style={styles.buttonText}>-</Text></TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity style={styles.button} onPress={() => handleNumberInput(1)}><Text style={styles.buttonText}>1</Text></TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleNumberInput(2)}><Text style={styles.buttonText}>2</Text></TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleNumberInput(3)}><Text style={styles.buttonText}>3</Text></TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.operatorButton]} onPress={() => handleOperatorInput('+')}><Text style={styles.buttonText}>+</Text></TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity style={[styles.button, styles.zeroButton]} onPress={() => handleNumberInput(0)}><Text style={styles.buttonText}>0</Text></TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleDecimal}><Text style={styles.buttonText}>.</Text></TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.equalButton]} onPress={handleEqual}><Text style={styles.buttonText}>=</Text></TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingBottom: 20,
  },
  displayContainer: {
    flex: 0.8,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 15,
  },
  displayText: {
    fontSize: 36,
    color: '#fff',
  },
  buttonContainer: {
    flex: 2.2,
    margin: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333',
    margin: 3,
    height: 50,
    borderRadius: 25,
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
  },
  zeroButton: {
    flex: 2,
  },
  operatorButton: {
    backgroundColor: '#f09a36',
  },
  equalButton: {
    backgroundColor: '#f09a36',
  },
  specialButton: {
    backgroundColor: '#a5a5a5',
  },
});
