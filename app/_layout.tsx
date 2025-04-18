import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Stack, useRouter, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { Platform } from "react-native";
import { ErrorBoundary } from "./error-boundary";
import { useAuthStore } from "@/store/auth-store";
import { colors } from "@/constants/colors";

export const unstable_settings = {
initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
const [loaded, error] = useFonts({
  ...FontAwesome.font,
});

useEffect(() => {
  if (error) {
    console.error(error);
    throw error;
  }
}, [error]);

useEffect(() => {
  if (loaded) {
    SplashScreen.hideAsync();
  }
}, [loaded]);

if (!loaded) {
  return null;
}

return (
  <ErrorBoundary>
    <RootLayoutNav />
  </ErrorBoundary>
);
}

function RootLayoutNav() {
const { isAuthenticated } = useAuthStore();
const router = useRouter();
const segments = useSegments();

useEffect(() => {
  // Check if the user is authenticated
  const inAuthGroup = segments[0] === "(tabs)";

  if (!isAuthenticated && inAuthGroup) {
    // Redirect to the login page if not authenticated
    router.replace("/login");
  } else if (isAuthenticated && segments[0] === "login") {
    // Redirect to the home page if already authenticated
    router.replace("/");
  }
}, [isAuthenticated, segments]);

return (
  <Stack
    screenOptions={{
      headerStyle: {
        backgroundColor: colors.background,
      },
      headerTintColor: colors.text,
      contentStyle: {
        backgroundColor: colors.background,
      },
    }}
  >
    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    <Stack.Screen name="modal" options={{ presentation: "modal" }} />
    <Stack.Screen name="login" options={{ headerShown: false }} />
    <Stack.Screen name="projects/[id]" options={{ headerShown: true }} />
    <Stack.Screen name="campaigns" options={{ headerShown: false }} />
  </Stack>
);
}