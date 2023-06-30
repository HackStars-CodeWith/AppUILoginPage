import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import fonts from "./config/fonts";

import Navigation from "./navigation";

export default function App() {
  const [fontsLoaded] = useFonts(fonts);

  return !fontsLoaded ? null : (
    <SafeAreaProvider>
      <Navigation />
      <StatusBar />
    </SafeAreaProvider>
  );
}


// WebClientId: 266923605492-r5ddnpke4h9msb59jh9oh5adikv4m61s.apps.googleusercontent.com
//Android 266923605492-uet71us6ugp7vpf3ejc80jmf6af07rom.apps.googleusercontent.com