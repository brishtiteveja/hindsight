import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { QueryClient } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { ChannelProvider } from "@/store";
import { C } from "@/theme";

/**
 * Everything the API serves is precomputed and changes at most daily, so cached
 * data is worth showing immediately and revalidating behind. Persisting the
 * cache to disk means a cold launch on a train still has content.
 */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 24 * 60 * 60 * 1000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const persister = createAsyncStoragePersister({ storage: AsyncStorage });

const navTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: C.ink,
    card: C.ink,
    text: C.paper,
    border: C.line,
    primary: C.amber,
  },
};

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PersistQueryClientProvider
        client={queryClient}
        persistOptions={{ persister, maxAge: 24 * 60 * 60 * 1000 }}
      >
        <SafeAreaProvider>
          <ChannelProvider>
            <ThemeProvider value={navTheme}>
              <StatusBar style="light" />
              <Stack
                screenOptions={{
                  headerStyle: { backgroundColor: C.ink },
                  headerTintColor: C.paper,
                  headerTitleStyle: { fontWeight: "700" },
                  contentStyle: { backgroundColor: C.ink },
                  headerShadowVisible: false,
                }}
              >
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen
                  name="onboard"
                  options={{ title: "Add your channel", presentation: "modal" }}
                />
                <Stack.Screen name="tools/ideas" options={{ title: "Idea Hub" }} />
                <Stack.Screen name="tools/precheck" options={{ title: "Pre-flight" }} />
                <Stack.Screen name="tools/clips" options={{ title: "Clip Finder" }} />
                <Stack.Screen name="tools/metadata" options={{ title: "Metadata Studio" }} />
                <Stack.Screen name="issue/[key]" options={{ title: "" }} />
                <Stack.Screen name="channel/[slug]" options={{ title: "" }} />
              </Stack>
            </ThemeProvider>
          </ChannelProvider>
        </SafeAreaProvider>
      </PersistQueryClientProvider>
    </GestureHandlerRootView>
  );
}
