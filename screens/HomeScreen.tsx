import { View, Text, Dimensions, Button, Alert, ActivityIndicator, TouchableOpacity, StyleSheet } from "react-native";
// import React from "react";
import Spacing from "../constants/Spacing";
import FontSize from "../constants/FontSize";
import Colors from "../constants/Colors";
import Font from "../constants/Font";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BackgroundAnimation from "./BackgroundAnimation";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
const { height } = Dimensions.get("window");
const API_URL = "https://farmappbackend.onrender.com";
import Weather from "./Weather";

export default function HomeScreen() {
  const[loading,setLoading]=useState(false)
  const [redirect, setRedirect] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    if (redirect) {
      navigation.navigate("Login");
    }
  }, [redirect, navigation]);
  
  const handleLogout = async () => {
    try {
      setLoading(true)
      await AsyncStorage.removeItem("@user");
      const response = await axios.post(API_URL + "/logout");
      setTimeout(() => {
        Alert.alert("Logout Success🚀🚀");
      }, 500);
      setRedirect(true);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }finally{
      setLoading(false)
    }
  };

  return (
    <View
      style={{
        paddingHorizontal: Spacing * 4,
        paddingTop: Spacing * 4,
        shadowOpacity: 0.2,
        shadowRadius: 3,
        marginBottom: height / 4,
      }} className="my-auto"
    >
      <Weather/>
      <Text
        style={{
          fontSize: FontSize.xxLarge,
          color: Colors.Primary,
          fontWeight: "bold",
          fontStyle: "italic",
          textDecorationLine: "underline",
          fontFamily: Font["poppins-bold"],
          textAlign: "center",
        }}
      >
        Hello Welcome userName
        
      </Text>
      <TouchableOpacity
        onPress={handleLogout}
        className="mx-12 border-2 border-indigo-600 rounded-full"
      >
        <Text className="text-center text-lg font-medium text-indigo-600">{loading == true ? <ActivityIndicator  className="flex justify-center"/> : "Logout"}</Text>
      </TouchableOpacity>
      
    </View>
  );
}
const styles=StyleSheet.create({
  btnStyle: {
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  }
})