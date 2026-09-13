import { Ionicons } from "@expo/vector-icons";
import Constants from "expo-constants";
import * as WebBrowser from "expo-web-browser";
import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { API_BASE } from "@/api/client";
import { Card } from "@/components/ui";
import { C, F, R, S } from "@/theme";

const LINKS: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  sub: string;
  url: string;
}[] = [
  {
    icon: "globe-outline",
    label: "Hindsight on the web",
    sub: "The full dashboard, with the galaxy and narrative cut views",
    url: "https://dev.perspectivity.co/hindsight",
  },
  {
    icon: "logo-github",
    label: "Source code",
    sub: "MIT licensed — the core is open",
    url: "https://github.com/brishtiteveja/hindsight",
  },
  {
    icon: "shield-outline",
    label: "Privacy policy",
    sub: "What the app stores, and what it doesn't",
    url: "https://dev.perspectivity.co/hindsight/privacy",
  },
];

export default function About() {
  const version = Constants.expoConfig?.version ?? "1.0.0";

  return (
    <ScrollView style={st.screen} contentContainerStyle={st.content}>
      <Card style={{ gap: S.md }}>
        <Text style={F.label}>What this is</Text>
        <Text style={F.body}>
          Hindsight reads the captions of videos you already made and turns that
          archive into working tools: what to cover next, whether a draft
          contradicts your past self, which moments cut into Shorts, and the
          metadata for a finished upload.
        </Text>
        <Text style={F.body}>
          Every answer cites a video and a timestamp. If it can't point at
          something you actually said, it doesn't claim it.
        </Text>
      </Card>

      <Card style={{ gap: S.md }}>
        <Text style={F.label}>How it works</Text>
        {[
          ["Captions", "Transcripts are fetched for the videos you point it at."],
          ["Meaning", "Each claim is embedded so it can be matched by meaning, not keywords."],
          ["Judgement", "A model compares new claims against your past ones and explains the verdict."],
          ["Receipts", "Every result carries the video and the second it happened."],
        ].map(([k, v]) => (
          <View key={k} style={st.step}>
            <View style={st.dot} />
            <View style={{ flex: 1 }}>
              <Text style={F.heading}>{k}</Text>
              <Text style={F.small}>{v}</Text>
            </View>
          </View>
        ))}
      </Card>

      <View style={{ gap: S.sm }}>
        {LINKS.map((l) => (
          <Pressable
            key={l.url}
            onPress={() => WebBrowser.openBrowserAsync(l.url)}
            style={({ pressed }) => [st.link, pressed && { opacity: 0.72 }]}
          >
            <Ionicons name={l.icon} size={19} color={C.amber} />
            <View style={{ flex: 1 }}>
              <Text style={F.heading}>{l.label}</Text>
              <Text style={F.small}>{l.sub}</Text>
            </View>
            <Ionicons name="open-outline" size={15} color={C.faint} />
          </Pressable>
        ))}
      </View>

      <Text style={[F.small, { textAlign: "center" }]}>
        Hindsight {version} · by Perspectivity{"\n"}
        {API_BASE.replace(/^https?:\/\//, "")}
      </Text>
    </ScrollView>
  );
}

const st = StyleSheet.create({
  screen: { flex: 1, backgroundColor: C.ink },
  content: { padding: S.lg, gap: S.lg, paddingBottom: S.xxl },
  step: { flexDirection: "row", gap: S.md, alignItems: "flex-start" },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: C.amber,
    marginTop: 6,
  },
  link: {
    flexDirection: "row",
    alignItems: "center",
    gap: S.md,
    backgroundColor: C.ink2,
    borderWidth: 1,
    borderColor: C.line,
    borderRadius: R.md,
    padding: S.lg,
  },
});
