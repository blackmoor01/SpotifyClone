import {View, Text, Image, ScrollView} from 'react-native';
import {LinearGradient} from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useEffect, useState} from "react";
import axios from "axios";

const ProfileScreen = () => {
  const getProfile = async () =>{
    const [userProfile,setUserProfile] = useState();
    const [playlists,setPlaylists] = useState([]);
    const accessToken = await AsyncStorage.getItem("token");
    try{
      const response = await fetch("https://api.spotify.com/v1.me",{
        headers:{
          Authorization:`Bearer ${accessToken}`
        }
      })
      const data = await response.json();
      setUserProfile(data);
      return data;

    }catch (err){
      console.log(err.message);
    }

  }
  useEffect(() => {
    getProfile()
  },[]);

  useEffect(() => {
    const getPlaylists = async () => {
      const accessToken = await AsyncStorage.getItem("token");
      try{
        const response = await axios.get(
          "https://api.spotify.com/v1/playlists",{
            headers:{
              Authorization:`Bearer ${accessToken}`
            },
          }
        );
        setPlaylists(response.data.items)

      }catch(err){
        console.log(err.message)
      }
    }
  })
  console.log(playlists)
  return(
    <LinearGradient colors={["#040306","#131624"]} style={{flex:1}}>
      <ScrollView style={{marginTop:50}}>
        <View syle={{
          padding:12
        }}>
          <View style={{
            flexDirection:"row",
            alignItems:"center",
            gap:10
          }}>
            <Image
              style={{
              width:40,
              height:40,
              borderRadius:20,
              resizeMode:"cover"
            }}
              source={{uri:userProfile?.images[0].url}}
            />
            <View>
              <Text style={{color:"white",fontSze:16,fontWeight:"bold"}}>
                {userProfile?.display_name}
              </Text>
              <Text style={{color:"gray",fontSize:16,fontWeight:"bold"}}>
                {userProfile?.email}
              </Text>
            </View>
          </View>
        </View>
        <Text style={{
          color:"white",
          fontSize:20,
          fontWeight:"500",
          marginHorizontal:12,
        }}>
          Your playlist
        </Text>
        <View style={{padding:15,}}>
          {playlist.map((item,index) => (
            <View style={{
              flexDirection:"row",
              alignItems:"center",
              gap:8,
              marginVertical:10}}>
              <Image source={{
                uri:"https://images.pexels.com/photos/3944091/pexels-photo-3944091.jpeg?auto=compress&cs=tinysrgb&w=800"}} />
              <View>
                <Text style={{color:"white"}}>{item?.name}</Text>
                <Text style={{color:"gray",marginTop:7}}>0 followers</Text>
              </View>

            </View>
          ))}
        </View>
      </ScrollView>
    </LinearGradient>


  );
};

export default ProfileScreen;
