import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";

import { C, F, R, S } from "@/theme";

export type PlayTarget = {
  videoId: string;
  /** Seconds to start at — the whole point is landing on the receipt. */
  start?: number;
  title?: string;
  subtitle?: string;
};

/**
 * Plays a YouTube video inline at a given second. Uses the official iframe
 * embed in a WebView rather than deep-linking out to the YouTube app: the
 * evidence only means something next to the claim it backs, and bouncing to
 * another app loses that context.
 */
export function VideoSheet({
  target,
  onClose,
}: {
  target: PlayTarget | null;
  onClose: () => void;
}) {
  const insets = useSafeAreaInsets();
  if (!target) return null;

  const start = Math.max(0, Math.floor(target.start ?? 0));
  const src =
    `https://www.youtube.com/embed/${target.videoId}` +
    `?start=${start}&autoplay=1&playsinline=1&rel=0&modestbranding=1`;

  return (
    <Modal
      visible
      animationType="slide"
      transparent={false}
      onRequestClose={onClose}
      supportedOrientations={["portrait", "landscape"]}
    >
      <View style={[st.root, { paddingTop: insets.top }]}>
        <View style={st.bar}>
          <Pressable
            onPress={onClose}
            hitSlop={12}
            accessibilityRole="button"
            accessibilityLabel="Close video"
          >
            <Ionicons name="chevron-down" size={26} color={C.paper} />
          </Pressable>
          <View style={st.barText}>
            {target.title ? (
              <Text style={st.title} numberOfLines={1}>
                {target.title}
              </Text>
            ) : null}
            {target.subtitle ? (
              <Text style={st.sub} numberOfLines={1}>
                {target.subtitle}
              </Text>
            ) : null}
          </View>
        </View>

        <View style={st.player}>
          <WebView
            source={{ uri: src }}
            style={st.web}
            allowsInlineMediaPlayback
            mediaPlaybackRequiresUserAction={false}
            allowsFullscreenVideo
            javaScriptEnabled
            domStorageEnabled
          />
        </View>

        {start > 0 ? (
          <Text style={st.stamp}>
            Starting at {Math.floor(start / 60)}:
            {String(start % 60).padStart(2, "0")} — the moment in question
          </Text>
        ) : null}
      </View>
    </Modal>
  );
}

const st = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#000" },
  bar: {
    flexDirection: "row",
    alignItems: "center",
    gap: S.md,
    paddingHorizontal: S.lg,
    paddingVertical: S.md,
  },
  barText: { flex: 1 },
  title: { ...F.heading, fontSize: 14 },
  sub: { ...F.small, marginTop: 2 },
  player: { width: "100%", aspectRatio: 16 / 9, backgroundColor: "#000" },
  web: { flex: 1, backgroundColor: "#000" },
  stamp: {
    ...F.small,
    textAlign: "center",
    paddingVertical: S.lg,
    paddingHorizontal: S.lg,
  },
});
