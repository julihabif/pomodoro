import {StyleSheet, Platform, Text, View, SafeAreaView, Touchable, TouchableOpacity} from 'react-native';
import React from 'react';
import {useState,useEffect} from 'react';
import Header from './src/components/Header';
import Timer from "./src/components/Timer";
import {Audio} from "expo-av";

const colors = ["#F7DC6F","#A2D9CE","#D7BDE2"];


export default function App(){
  const [isWorking, setIsWorking] = useState(false); //lo inicializo en false para que el reloj no empiece apenas arranca la app
  const [time, setTime] = useState(25*60); //lo inicializo en 25 minutos
  const [currentTime, setCurrentTime] = useState("POMO"| "SHORT" | "BREAK");
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;

    if(isActive){
      //correr el timer
      interval = setInterval(() => {
        setTime(time-1);
      },10)
    } else {
      //pausar el timer
      clearInterval(interval)
    }
    if(time === 0){
      setIsActive(false);
      setIsWorking((prev) => !prev);
      setTime(isWorking ? 25*60 : 5*60);
    }
    return() => clearInterval(interval);
  }, [isActive,time]);

  function handleStartStop(){
    playSound()
    setIsActive(!isActive);

  }

  async function playSound(){
    const { sound } = await Audio.Sound.createAsync(
        require('./assets/off-click.mp3')
    );
    await sound.playAsync();
    sound.setOnPlaybackStatusUpdate((status) => {
      if (status.didJustFinish) {
        sound.unloadAsync();
      }
    });


  }
  return (
      <SafeAreaView style={[styles.container, {backgroundColor: colors[currentTime]}]}>
        <View style={{
          flex:1,
          paddingHorizontal:15,
          paddingTop: Platform.OS === "android" && 30,
        }}>
          <Text style={styles.text}>Pomodoro</Text>
          <Header setTime={setTime} currentTime={currentTime} setCurrentTime={setCurrentTime}/>
          <Timer time={time}/>
          <TouchableOpacity style={styles.button} onPress={handleStartStop}>
            <Text style={{color:"white",fontWeight:"bold"}}>{isActive ? "STOP" : "START"}</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text:{
    fontSize:32,
    fontWeight:'bold'
  },
  button:{
    alignItems:"center",
    backgroundColor:"#333333",
    padding:15,
    marginTop:15,
    borderRadius:15
  }
});
