import { Image, StyleSheet, Platform, View, TouchableOpacity, Text } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useEffect, useState } from 'react';



export default function HomeScreen() {
  const [click, setClick] = useState(0)
  const [timeOne, setTimeOne] = useState(900)
  const [timeTwo, setTimeTwo] = useState(900)

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

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setClick(1)} style={{ flex: 1, backgroundColor: 'gray', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 30, transform: [{ rotate: '180deg' }], fontWeight: 600 }}>{convertTimeToMMSS(timeOne)}</Text>
      </TouchableOpacity >
      <TouchableOpacity style={{ backgroundColor: 'blue', height: 50, alignItems: 'center' }}
        onPress={() => {
          setClick(0)
          setTimeOne(900)
          setTimeTwo(900)
         }}>
        <Text style={{ fontSize: 30, fontWeight: 'bold', color: 'white' }}>Amazon River</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setClick(2)} style={{ flex: 1, backgroundColor: 'red', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 30, fontWeight: 600 }}>{convertTimeToMMSS(timeTwo)}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gray'
  },

});
