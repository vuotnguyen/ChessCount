import { Image, StyleSheet, Platform, View, TouchableOpacity, Text } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useEffect, useState } from 'react';



export default function HomeScreen() {
  const [click, setClick] = useState(true)
  const [timeOne, setTimeOne] = useState(900)
  const [timeTwo, setTimeTwo] = useState(900)

  useEffect(() => {
    if(click){
      const timeout = setInterval(() => {
        setTimeOne((prevTime: number) => prevTime -1)
      }, 1000);
      return () => clearInterval(timeout);
    }else{
      const timeout = setInterval(() => {
        setTimeTwo((prevTime: number) => prevTime -1)
      }, 1000);
      return () => clearInterval(timeout);
    }
  }, [click])

  const onClick = () => {
    setClick(!click)
    
  }
  const convertTimeToMMSS = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <View style = {styles.container}>
      <TouchableOpacity onPress={onClick} style = {{flex: 1, backgroundColor: 'gray', justifyContent: 'center', alignItems: 'center'}}>
      <Text style = {{fontSize: 30, transform: [{ rotate: '180deg' }], }}>{convertTimeToMMSS(timeOne)}</Text>
      </TouchableOpacity >
      <TouchableOpacity onPress={onClick} style = {{flex: 1, backgroundColor: 'red' , justifyContent: 'center', alignItems: 'center'}}>
      <Text style = {{fontSize: 30}}>{convertTimeToMMSS(timeTwo)}</Text>
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
