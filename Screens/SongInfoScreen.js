import {Text, View, Image, ScrollView, Pressable} from 'react-native';
import {useNavigation, useRoute} from "@react-navigation/native";
import {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {LinearGradient} from "expo-linear-gradient";
import {AntDesign, Entypo, Ionicons, MaterialCommunityIcons} from "@expo/vector-icons";


const SongInfoScreen = () => {
  const [tracks,setTracks] = useState([]);
  const navigation = useNavigation();
  const route = useRoute();
  console.log(route.params)
  const albumUrl = route?.params?.item?.track?.album?.uri
  const albumId= albumUrl.split(":")[2]
  console.log(albumId)

  //take note of the async
  useEffect( () => {
    async function fetchSongs() {
      const accessToken = await AsyncStorage.getItem("token");

      try {
        const response = await fetch(`https://api.spotify.com/v1/albums/${albumId}/tracks`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
//alternate block of code used
        if (response.ok) {
          const data = await response.json();
          const tracks = data.items
          setTracks(tracks);
        } else {
          throw new Error("Failed to fetch album songs");
        }

      } catch (err) {
        console.log(err.message);
      }
    }
    fetchSongs();


  },[])

  console.log(tracks)

  return(
    <LinearGradient colors={["#040306","#131624"]} style={{flex:1}}>

      <ScrollView style={{marginTop:50}}>

        <View style={{flexDirection:"row",padding:12}}>

          <Ionicons
            onPress={() => navigation.goBack() }
            name={"arrow-back"} size={24} color={"white"} />
        </View>

        <View style={{flex:1,alignItems:"center"}}>

          <Image
            style={{width:200,height:200}}
            source={{uri:route?.params?.item?.track?.album?.images[0].url}} />
        </View>

        <Text style={{
          color:"white",
          marginHorizontal:12,
          marginTop:10,
          fontSize:22,
          fontWeight:"bold"}}>

          {route?.params?.track?.album?.name}

        </Text>

        <View style={{
          marginHorizontal:12,
          flexDirection:"row",
          alignItems:"center",
          flexWrap:"wrap",
          marginTop:10,
          gap:7
        }}>
          {route?.params?.track?.artist?.map(({item,index}) => (
            <Text style={{color:"#909090",fontSize:13,fontWeight:"500"}}>{item.name}</Text>
            ))}
        </View>

        <Pressable
          style={{
            flexDirection:"row",
            alignItems:"center",
            justifyContent:"space-between",
            marginHorizontal:10}} >

          <Pressable
            style={{
              width:30,
              height:30,
              borderRadius:15,
              backgroundColor:"#1D8954",
              justifyContent:"center",
              alignItems:"center"
            }}
          >
            <AntDesign name={"arrow down"} size={24} color={"white"} />
          </Pressable >
          <View style={{flexDirection:"row",alignItems:"center",gap:10}}>
            <MaterialCommunityIcons name={"cross-bolnisi"} size={24} color={"white"} />
            <Pressable
              style={{
                width:60,
                height:60,
                borderRadius:35,
                backgroundColor:"#1D8954",
                justifyContent:"center",
                alignItems:"center"
              }}>
              <Entypo name={"controller-play"} size={24} color={"white"} />
            </Pressable>
          </View>
        </Pressable>

        <View>
          <View style={{marginTop:10,marginVertical:12}}>
            {tracks?.map((item,index) => (
              <Pressable style={{
                marginVertical:16,
                flexDirection:"row",
                justifyContent:"center"}}>

                <View>
                  <Text style={{
                    color:"white",
                    fontSize:16,
                    fontWeight:"500"
                  }}>{track?.name}</Text>

                  <View style={{flexDirection:"row",alignItems:"center",gap:8,marginTop:5}}>
                    {track?.artists?.map((item,index) => (
                      <Text style={{fontSize:16,fontWeight:"500",color:"gray"}}>{item?.name}</Text>
                    ))}
                  </View>
                </View>
                <Entypo name={"dots-three-vertical"} size={24} color={"white"} />
              </Pressable>
            ))}
          </View>
        </View>

      </ScrollView>
    </LinearGradient>

  )
}

export default SongInfoScreen;
