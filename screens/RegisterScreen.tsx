import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator
} from "react-native";
import React, { useState, useEffect } from "react";
import Spacing from "../constants/Spacing";
import FontSize from "../constants/FontSize";
import Colors from "../constants/Colors";
import Font from "../constants/Font";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import AppTextInput from "../components/AppTextInput";
import * as WebBrowser from "expo-web-browser";
import { useContext } from "react";
import LangContext from "../components/LangContext";
import { getTranslation,translation } from "../constants/translations/utils";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Alert } from "react-native";

WebBrowser.maybeCompleteAuthSession();
const API_URL = "https://farmappbackend.onrender.com";
type Props = NativeStackScreenProps<RootStackParamList, "Register">;

const RegisterScreen: React.FC<Props> = ({ navigation: { navigate } }) => {
  const { selectedLang, setSelectedLang } = useContext(LangContext);
  const [loading,setLoading]=useState(false);
  const [userInfo, setUserInfo] = React.useState(null);
  const [token, setToken] = useState("");
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      "266923605492-uet71us6ugp7vpf3ejc80jmf6af07rom.apps.googleusercontent.com",
    webClientId:
      "266923605492-r5ddnpke4h9msb59jh9oh5adikv4m61s.apps.googleusercontent.com",
    expoClientId:
      "266923605492-afdsv528mjbp5g9sf1s52viao09dqq7f.apps.googleusercontent.com",
  });
  //function to login directly
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const HandleRegister = async () => {
    if (Password === "" || ConfirmPassword === "" || Email === "") {
      return;
    }
    if (Password !== ConfirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }
    const credentials = {
      email: Email,
      password: Password,
    };

    try {
      setLoading(true);
      const response = await axios.post(`${API_URL}/signup`, credentials);
      const { data } = response;
      setTimeout(() => {
        Alert.alert("Register Success🚀🚀");
      }, 500);
      navigate("Login");
    } catch (error: any) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log(error.config);
    }finally{
      setLoading(false);
    }
  };

  useEffect(() => {
    handleEffect();
  }, [response, token]);

  async function handleEffect() {
    const user = await getLocalUser();
    console.log("user", user);
    if (!user) {
      if (response?.type === "success") {
        setToken(response.authentication.accessToken);
        getUserInfo(response.authentication.accessToken);
      }
    } else {
      setUserInfo(user);
      navigate("Home");
      console.log("loaded locally");
    }
  }

  const getLocalUser = async () => {
    const data = await AsyncStorage.getItem("@user");
    if (!data) return null;
    return JSON.parse(data);
  };

  const getUserInfo = async (token) => {
    if (!token) return;
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const user = await response.json();
      await AsyncStorage.setItem("@user", JSON.stringify(user));
      setUserInfo(user);
    } catch (error) {
      console.log("Error found");
    }
  };
  return (
    <SafeAreaView>
      <View
        style={{
          padding: Spacing * 2,
        }}
      >
        <View
          style={{
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: FontSize.xLarge,
              color: Colors.Primary,
              fontFamily: Font["poppins-bold"],
              marginVertical: Spacing * 4,
            }}
          >
            {getTranslation('create_acc',selectedLang)}
          </Text>
        </View>
        <View
          style={{
            marginVertical: Spacing * 3,
          }}
        >
          <AppTextInput
            placeholder="Email"
            defaultValue={Email}
            onChangeText={(newText) => setEmail(newText)}
          />
          <AppTextInput
            placeholder="Password"
            defaultValue={Password}
            onChangeText={(newPassword) => setPassword(newPassword)}
            secureTextEntry
          />
          <AppTextInput
            placeholder="Confirm Password"
            defaultValue={ConfirmPassword}
            onChangeText={(newPassword) => {
              setConfirmPassword(newPassword);
              setPasswordError(""); // Clear password error when the Confirm Password changes
            }}
            secureTextEntry
            style={{
              ...(passwordError ? styles.inputError : null),
              ...styles.appTextInput,
            }}
          />
          {passwordError ? (
            <Text style={styles.errorText}>{passwordError}</Text>
          ) : null}
        </View>

        <TouchableOpacity
          onPress={HandleRegister}
          style={{
            padding: Spacing * 2,
            backgroundColor: Colors.Primary,
            marginVertical: Spacing * 3,
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
              textAlign: "center",
              fontSize: FontSize.large,
            }}
          >
            {loading==true?<ActivityIndicator/>:getTranslation('register',selectedLang)}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigate("Login")}
          style={{
            padding: Spacing,
          }}
        >
          <Text
            style={{
              fontFamily: Font["poppins-semiBold"],
              color: Colors.text,
              textAlign: "center",
              fontSize: FontSize.small,
            }}
          >
            {getTranslation('acc_already',selectedLang)}
          </Text>
        </TouchableOpacity>

        <View
          style={{
            marginVertical: Spacing * 3,
          }}
        >
          <Text
            style={{
              fontFamily: Font["poppins-semiBold"],
              color: Colors.Primary,
              textAlign: "center",
              fontSize: FontSize.small,
            }}
          >
            {getTranslation('login_opt',selectedLang)}
          </Text>

          <View
            style={{
              marginTop: Spacing,
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity
              style={{
                padding: Spacing,
                backgroundColor: Colors.gray,
                borderRadius: Spacing / 2,
                marginHorizontal: Spacing,
              }}
            >
              <Ionicons
                name="logo-google"
                color={Colors.text}
                size={Spacing * 2}
                onPress={() => {
                  promptAsync();
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                padding: Spacing,
                backgroundColor: Colors.gray,
                borderRadius: Spacing / 2,
                marginHorizontal: Spacing,
              }}
            >
              <Ionicons
                name="logo-apple"
                color={Colors.text}
                size={Spacing * 2}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                padding: Spacing,
                backgroundColor: Colors.gray,
                borderRadius: Spacing / 2,
                marginHorizontal: Spacing,
              }}
            >
              <Ionicons
                name="logo-facebook"
                color={Colors.text}
                size={Spacing * 2}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  inputError: {
    borderColor: "red",
    borderWidth: 1,
  },
  errorText: {
    color: "red",
    marginTop: 5,
  },
  appTextInput: {
    // Add your custom styles for the AppTextInput component here
    // For example:
    fontFamily: Font["poppins-regular"],
    fontSize: FontSize.small,
    padding: Spacing * 2,
    backgroundColor: Colors.lightPrimary,
    borderRadius: Spacing,
    marginVertical: Spacing,
    // Add more styles as needed
  },
});

export default RegisterScreen;
