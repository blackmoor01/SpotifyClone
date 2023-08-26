import {Text, Image, View, Pressable} from 'react-native';
import {AntDesign,Entypo} from "@expo/vector-icons";
import {useContext, useState} from "react";
import {Player} from "../PlayerContext";

const SongItem = ({item,onPress,isPlaying}) => {
  const [currentTrack,setCurrentTrack] = useContext(Player);

  //When any song is automatically tapped on, it should start playing.
  const handlePress = () => {
    setCurrentTrack(item);
    onPress(item)

  }
  return(
    <Pressable
      onPress={handlePress}
      style={{flexDirection:"row",alignItems:"center",padding:10}}>
      <Image style={{height:50,width:50,marginRight:10}} source={{uri:item?.track?.album?.images[0].url}}  />

      <View style={{flex:1}}>
        <Text
          numberOfLines={1}
          style={
          isPlaying? {
            fontWeight:"bold", fontSize:14, color:"#3FFF00"

          } : {
            fontSize:14, fontWeight:"bold", color:"white"
          }
          }

        >
          {item?.track?.name}
        </Text>

        <Text style={{marginTop:4,color:"#989898"}}>
          {item?.track?.artists[0].name}
        </Text>
      </View>

      <View style={{flexDirection:"row",alignItems:"center",gap:7,marginHorizontal:10}}>
        <AntDesign name={"heart"} size={24} color={"#1DB954"} />
        <Entypo name={"dots-three-vertical"} size={24} color={"#C0C0C0"}/>
      </View>
    </Pressable>
  )
}

export default SongItem;
