import {
  Dimensions,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LanguageModel from "../components/LanguageModel";
import { useState } from "react";
import Spacing from "../constants/Spacing";
import FontSize from "../constants/FontSize";
import Colors from "../constants/Colors";
import Font from "../constants/Font";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import { translation } from "../constants/translations/utils";
const { height } = Dimensions.get("window");

type Props = NativeStackScreenProps<RootStackParamList, "Welcome">;

const WelcomeScreen: React.FC<Props> = ({ navigation: { navigate } }) => {
  const [langModalVisible, setLangModalVisible] = useState(false);
  const [selectedLang, setSelectedLang] = useState<number>(0);
  const saveSelectedLang = async (index: number): Promise<void> => {
    try {
      await AsyncStorage.setItem("LANG", index.toString());
    } catch (error) {
      console.error("Failed to save selected language:", error);
    }
  };
  const onSelectLang = (index: number): void => {
    setSelectedLang(index);
    saveSelectedLang(index);
  };
  return (
    <SafeAreaView>
      <ScrollView>
        <ImageBackground
          style={{
            height: height / 1.88,
            alignItems: "center",
          }}
          resizeMode="contain"
          source={require("../assets/images/Farmer.jpg")}
        />
        <View
          style={{
            paddingHorizontal: Spacing * 4,
            paddingTop: Spacing * 4,
          }}
        >
          <Text
            style={{
              fontSize: FontSize.xxLarge,
              color: Colors.primary,
              fontFamily: Font["poppins-bold"],
              textAlign: "center",
            }}
          >
            {selectedLang == 0
              ? translation[0].English
              : selectedLang == 1
              ? translation[0].Bangla
              : selectedLang == 2
              ? translation[0].Hindi
              : null}
          </Text>

          {/* <Text
            style={{
              fontSize: FontSize.small,
              color: Colors.text,
              fontFamily: Font["poppins-regular"],
              textAlign: "center",
              marginTop: Spacing * 2,
            }}
          >
            Explore all the existing job roles based or your interest and study
            major
          </Text> */}
        </View>
        <View
          style={{
            paddingHorizontal: Spacing * 2,
            paddingTop: Spacing * 6,
            flexDirection: "row",
          }}
        >
          <TouchableOpacity
            onPress={() => navigate("Login")}
            style={{
              backgroundColor: Colors.primary,
              paddingVertical: Spacing * 1.5,
              paddingHorizontal: Spacing * 2,
              width: "48%",
              borderRadius: Spacing,
              shadowColor: Colors.primary,
              shadowOffset: {
                width: 0,
                height: Spacing,
              },
              shadowOpacity: 0.3,
              shadowRadius: Spacing,
            }}
          >
            <Text
              style={{
                fontFamily: Font["poppins-bold"],
                color: Colors.onPrimary,
                fontSize: FontSize.large,
                textAlign: "center",
              }}
            >
              {selectedLang == 0
                ? translation[1].English
                : selectedLang == 1
                ? translation[1].Bangla
                : selectedLang == 2
                ? translation[1].Hindi
                : null}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigate("Register")}
            style={{
              paddingVertical: Spacing * 1.5,
              paddingHorizontal: Spacing * 2,
              width: "48%",
              borderRadius: Spacing,
            }}
          >
            <Text
              style={{
                fontFamily: Font["poppins-bold"],
                color: Colors.text,
                fontSize: FontSize.large,
                textAlign: "center",
              }}
            >
              {selectedLang == 0
                ? translation[2].English
                : selectedLang == 1
                ? translation[2].Bangla
                : selectedLang == 2
                ? translation[2].Hindi
                : null}
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.selectLangaugeBtn}
          onPress={() => {
            setLangModalVisible(!langModalVisible);
          }}
        ><Image source={require("../assets/icons/languages.png")} style={styles.img}/>
          <Text>
          
            {selectedLang == 0
              ? translation[3].English
              : selectedLang == 1
              ? translation[3].Bangla
              : selectedLang == 2
              ? translation[3].Hindi
              : null}
          </Text>
        </TouchableOpacity>
        <LanguageModel
          langModalVisible={langModalVisible}
          setLangModalVisible={setLangModalVisible}
          onSelectLang={onSelectLang}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  selectLangaugeBtn: {
    flexDirection: 'row',
    width: "50%",
    height: 50,
    borderWidth: 0.2,
    borderRadius: 10,
    position: "relative",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  img:{
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    resizeMode: 'stretch',
  }
});
