import {Text, Image, View,SafeAreaView, Pressable} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {Entypo, MaterialIcons,AntDesign} from "@expo/vector-icons"
import * as AppAuth from 'expo-app-auth'
import {useNavigation} from "@react-navigation/native";
import {useEffect} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";


const LoginScreen = () => {

  const navigation = useNavigation();
  useEffect(() =>{
    const checkTokenValidity = async () => {
      const accessToken = await AsyncStorage.getTime("token");
      const expirationDate = await  AsyncStorage.getTime("expirationDate");
      console.log("access token", accessToken);
      console.log("expiration date", expirationDate);

      if(accessToken && expirationDate){
        const currentTime = Date.now();
        if(currentTime < parseInt(expirationDate)){
          //Here the token is still valid.
          navigation.replace("Main");
        }
        else{
          //Token will be expired so there's therefore the need to remove it from Async Storage.
          AsyncStorage.removeItem("token");
          AsyncStorage.removeItem("expirationDate")
        }
      }

    }
    checkTokenValidity();

  },[])
  async function authenticate () {
    const config = {
      issuer:"https://accounts.spotify.com",
      clientId:"",
      scopes:[
        "user-read-email",
        "user-library-read",
        "user-read-recently-played",
        "user-top-read",
        "playlist-read-private",
        "playlist-read-collaborative",
        "playlist-modify-public" // or "playlist-modify-private"
      ],
      redirectUrl:""
    }
    const result = await AppAuth.authSync(config);
    console.log(result)
    if(result.accessToken){
      const expirationDate = new Date(result.accessTokenExpirationDate).getTime();
      AsyncStorage.setItem("token",result.accessToken);
      AsyncStorage.setItem("expirationDate",expirationDate.toString());
      navigation.navigate("Main")
    }
  }


  return(
    <LinearGradient colors={["#040306","#131624"]} style={{flex:1}}>
      <SafeAreaView>
        <View style={{height:80}}/>
        <Entypo style={{textAlign:"center"}} name={"Spotify"} size={24} color={"white"} />
        <Text style={{color:"white", fontSize:40, fontWeight:"bold", textAlign:"center", marginTop:40}}>
          Millions of songs.Free on Spotify!
        </Text>

        <View style={{height:80}}/>

        <Pressable
          onPress={authenticate}
          style={{
            alignItems: "center",
            backgroundColor: "#1DB954",
            borderRadius: 25,
            borderWidth:0.8,
            justifyContent: "center",
            marginLeft: "auto",
            marginRight: "auto",
            marginVertical: 10,
            padding: 10,
            width: 300
          }}>
          <Text style={{
            fontWeight:"500",
            color:"white",
            textAlign:"center"}}>
            Sign in with spotify.
          </Text>
        </Pressable>

        <Pressable style={{
          alignItems: "center",
          backgroundColor: "#131624",
          borderColor: "#C0C0C0",
          borderRadius: 25,
          borderWidth: 0.8,
          flexDirection: "row",
          justifyContent: "center",
          marginLeft: 0,
          marginRight: 0,
          marginVertical: 10,
          padding: 10,
          width: 300
        }}>
          <MaterialIcons name={"Phone-android"} size={24} color={"white"} />
          <Text style={{fontWeight:"500",color:"white", textAlign:"center", flex:1}} >Continue with phone number.
          </Text>
        </Pressable>

        <Pressable style={{
          alignItems: "center",
          backgroundColor: "#131624",
          borderColor: "#C0C0C0",
          borderRadius: 25,
          borderWidth: 0.8,
          flexDirection: "row",
          justifyContent: "center",
          marginLeft: 0,
          marginRight: 0,
          marginVertical: 10,
          padding: 10,
          width: 300
        }}>
          <AntDesign name="google" size={24} color="red" />
          <Text style={{fontWeight:"500",color:"white", textAlign:"center", flex:1}}> Sign In with Google</Text>
        </Pressable>

        <Pressable style={{
          alignItems: "center",
          backgroundColor: "#131624",
          borderColor: "#C0C0C0",
          borderRadius: 25,
          borderWidth: 0.8,
          flexDirection: "row",
          justifyContent: "center",
          marginLeft: 0,
          marginRight: 0,
          marginVertical: 10,
          padding: 10,
          width: 300
        }}>
          <Entypo name="facebook" size={24} color="blue" />
          <Text style={{fontWeight:"500",color:"white", textAlign:"center", flex:1}} >Sign In with Facebook.</Text>
        </Pressable>

      </SafeAreaView>
    </LinearGradient>
  );
}
export default LoginScreen;
