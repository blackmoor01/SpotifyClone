import {Text, Image, View, Pressable} from 'react-native';
import {useNavigation} from "@react-navigation/native";

const RecentlyPlayedCard = ({item}) => {
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() => navigation.navigate("Info",{
        item:item
      })}
      style={{margin:10}}>
      <Image
        style={{
          width:130,
          height:130,
          borderRadius:5
       }}
        source={{
          uri:item.track.album.images[0].url
       }}
      />
      <Text numberOfLines={1} style={{
        color: "white",
        fontSize: 13,
        fontWeight: "500",
        marginTop: 10
      }}
      >
        {item?.track?.name}
      </Text>
    </Pressable>

  );
};


export default RecentlyPlayedCard;

