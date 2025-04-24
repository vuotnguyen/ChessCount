import { StyleSheet, Text, TouchableOpacity, View, TextInput, Modal } from 'react-native';

import { useEffect, useState } from 'react';



export default function HomeScreen() {
  const [click, setClick] = useState(0)
  const [timeOne, setTimeOne] = useState(900)
  const [timeTwo, setTimeTwo] = useState(900)
  const [showConfig, setShowConfig] = useState(false)
  const [inputTimeOne, setInputTimeOne] = useState('15')
  const [inputTimeTwo, setInputTimeTwo] = useState('15')

  useEffect(() => {
    if (click == 1) {
      const timeout = setInterval(() => {
        setTimeTwo((prevTime: number) => prevTime - 1)
      }, 1000);
      return () => clearInterval(timeout);
    }
    if (click == 2) {
      const timeout = setInterval(() => {
        setTimeOne((prevTime: number) => prevTime - 1)
      }, 1000);
      return () => clearInterval(timeout);
    }
  }, [click])


  const convertTimeToMMSS = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleSaveConfig = () => {
    setTimeOne(parseInt(inputTimeOne) * 60);
    setTimeTwo(parseInt(inputTimeTwo) * 60);
    setShowConfig(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setClick(1)} style={{ flex: 1, backgroundColor: 'gray', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 30, transform: [{ rotate: '180deg' }], fontWeight: 600 }}>{convertTimeToMMSS(timeOne)}</Text>
      </TouchableOpacity >
      <View style={{ backgroundColor: 'blue', height: 50, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
        <TouchableOpacity onPress={() => setShowConfig(true)}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>Config</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          setClick(0)
          setTimeOne(parseInt(inputTimeOne) * 60)
          setTimeTwo(parseInt(inputTimeTwo) * 60)
        }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>Reset</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => setClick(2)} style={{ flex: 1, backgroundColor: 'red', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 30, fontWeight: 600 }}>{convertTimeToMMSS(timeTwo)}</Text>
      </TouchableOpacity>

      <Modal
        visible={showConfig}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Time Configuration</Text>
            
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Player 1 Time (minutes):</Text>
              <TextInput
                style={styles.input}
                value={inputTimeOne}
                onChangeText={setInputTimeOne}
                keyboardType="numeric"
                placeholder="Enter time in minutes"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Player 2 Time (minutes):</Text>
              <TextInput
                style={styles.input}
                value={inputTimeTwo}
                onChangeText={setInputTimeTwo}
                keyboardType="numeric"
                placeholder="Enter time in minutes"
              />
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={() => setShowConfig(false)}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={handleSaveConfig}>
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gray'
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    padding: 10,
    borderRadius: 5,
    minWidth: 100,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: 'gray',
  },
  saveButton: {
    backgroundColor: 'blue',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
