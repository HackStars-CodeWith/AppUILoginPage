import { View, Text, Dimensions } from "react-native";
// import React from "react";
import Spacing from "../constants/Spacing";
import FontSize from "../constants/FontSize";
import Colors from "../constants/Colors";
import Font from "../constants/Font";
import BackgroundAnimation from "./BackgroundAnimation";
const { height } = Dimensions.get("window");
export default function HomeScreen() {
  return (
    <View
      style={{
        paddingHorizontal: Spacing * 4,
        paddingTop: Spacing * 4,
        shadowOpacity: 0.2,
        shadowRadius: 3,
        marginBottom: height / 4,
      }}
    >
     
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
    
    </View>
  );
}
