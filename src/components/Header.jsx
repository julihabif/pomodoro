import {TouchableOpacity,Text, View,StyleSheet} from "react-native";
const options = ["Pomodoro", "Short Break", "Long Break"]
export default function Header({setTime,currentTime,setCurrentTime}){
    function handlePress(index){
        const newTime = index === 0 ? 25 : index === 1? 5 : 15;
        setCurrentTime(index);
        setTime(newTime*60);
    }
    return (
        <View style={{flexDirection:"row"}}>
            {options.map((option, index) => (
                <TouchableOpacity
                    key={index}
                    style={[styles.itemStyle,currentTime !== index && {borderColor: 'transparent'}]}
                    onPress={() => handlePress(index)}>
                    <Text style={{fontWeight:"bold"}}>{option}</Text>
                </TouchableOpacity>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    itemStyle:{
        width:"33%",
        alignItems:"center",
        borderWidth:3,
        padding:5,
        borderColor:"white",
        borderRadius:10,
        marginVertical:20


    }
})
