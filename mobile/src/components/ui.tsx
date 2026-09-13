import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  Easing,
  Pressable,
  StyleSheet,
  Text,
  View,
  type ImageStyle,
  type StyleProp,
  type ViewStyle,
} from "react-native";

import { C, F, R, S } from "@/theme";

export function Card({
  children,
  style,
  onPress,
}: {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
}) {
  const body = <View style={[s.card, style]}>{children}</View>;
  if (!onPress) return body;
  return (
    <Pressable onPress={onPress} style={({ pressed }) => pressed && s.pressed}>
      {body}
    </Pressable>
  );
}

export function Label({ children }: { children: React.ReactNode }) {
  return <Text style={F.label}>{children}</Text>;
}

export function Button({
  title,
  onPress,
  icon,
  variant = "primary",
  disabled,
  style,
}: {
  title: string;
  onPress: () => void;
  icon?: keyof typeof Ionicons.glyphMap;
  variant?: "primary" | "ghost";
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}) {
  const primary = variant === "primary";
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      style={({ pressed }) => [
        s.btn,
        primary ? s.btnPrimary : s.btnGhost,
        disabled && s.btnDisabled,
        pressed && !disabled && s.pressed,
        style,
      ]}
    >
      {icon ? (
        <Ionicons name={icon} size={16} color={primary ? C.ink : C.amber} />
      ) : null}
      <Text style={[s.btnText, { color: primary ? C.ink : C.amber }]}>{title}</Text>
    </Pressable>
  );
}

export function Chip({
  label,
  active,
  onPress,
}: {
  label: string;
  active?: boolean;
  onPress?: () => void;
}) {
  return (
    <Pressable onPress={onPress} disabled={!onPress}>
      <View style={[s.chip, active && s.chipOn]}>
        <Text style={[s.chipText, active && { color: C.amber2 }]} numberOfLines={1}>
          {label}
        </Text>
      </View>
    </Pressable>
  );
}

export function Thumb({
  uri,
  style,
}: {
  uri?: string;
  /** Image styles — the callers only ever pass box props (radius, aspect ratio). */
  style?: StyleProp<ImageStyle>;
}) {
  if (!uri) {
    return <View style={[s.thumb, s.thumbEmpty, style as StyleProp<ViewStyle>]} />;
  }
  return (
    <Image
      source={{ uri }}
      style={[s.thumb, style]}
      contentFit="cover"
      transition={180}
      cachePolicy="memory-disk"
    />
  );
}

/**
 * Staged progress. Model-backed calls take 20–120s with no server-side progress
 * to report, so we narrate the stages we know happen and ease the bar toward
 * 92% — never to 100%, which would be a lie until the response lands.
 */
export function StagedProgress({ stages }: { stages: string[] }) {
  const width = useRef(new Animated.Value(0)).current;
  const [stage, setStage] = useState(0);

  useEffect(() => {
    Animated.timing(width, {
      toValue: 92,
      duration: 45_000,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
    const every = 4200;
    const id = setInterval(
      () => setStage((i) => Math.min(i + 1, stages.length - 1)),
      every,
    );
    return () => clearInterval(id);
  }, [stages.length, width]);

  return (
    <View style={s.progressWrap}>
      <View style={s.progressTrack}>
        <Animated.View
          style={[
            s.progressFill,
            { width: width.interpolate({ inputRange: [0, 100], outputRange: ["0%", "100%"] }) },
          ]}
        />
      </View>
      <Text style={s.progressText}>{stages[stage]}</Text>
    </View>
  );
}

/** Shimmering placeholder block, sized by the caller. */
export function Skeleton({ style }: { style?: StyleProp<ViewStyle> }) {
  const pulse = useRef(new Animated.Value(0.4)).current;
  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1,
          duration: 850,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 0.4,
          duration: 850,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [pulse]);
  return <Animated.View style={[s.skeleton, { opacity: pulse }, style]} />;
}

export function Loading({ text }: { text?: string }) {
  return (
    <View style={s.center}>
      <ActivityIndicator color={C.amber} />
      {text ? <Text style={[F.small, { marginTop: S.md }]}>{text}</Text> : null}
    </View>
  );
}

export function EmptyState({
  icon = "sparkles-outline",
  title,
  body,
  action,
}: {
  icon?: keyof typeof Ionicons.glyphMap;
  title: string;
  body?: string;
  action?: React.ReactNode;
}) {
  return (
    <View style={s.center}>
      <Ionicons name={icon} size={34} color={C.faint} />
      <Text style={[F.title, { marginTop: S.md, textAlign: "center" }]}>{title}</Text>
      {body ? (
        <Text style={[F.body, { marginTop: S.sm, textAlign: "center", maxWidth: 320 }]}>
          {body}
        </Text>
      ) : null}
      {action ? <View style={{ marginTop: S.lg }}>{action}</View> : null}
    </View>
  );
}

export function ErrorState({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <EmptyState
      icon="cloud-offline-outline"
      title="Something went sideways"
      body={message}
      action={onRetry ? <Button title="Try again" icon="refresh" onPress={onRetry} /> : undefined}
    />
  );
}

export const s = StyleSheet.create({
  card: {
    backgroundColor: C.ink2,
    borderColor: C.line,
    borderWidth: 1,
    borderRadius: R.lg,
    padding: S.lg,
  },
  pressed: { opacity: 0.72 },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: S.sm,
    paddingVertical: 12,
    paddingHorizontal: S.lg,
    borderRadius: R.pill,
    borderWidth: 1,
  },
  btnPrimary: { backgroundColor: C.amber, borderColor: C.amber },
  btnGhost: { backgroundColor: "transparent", borderColor: C.line },
  btnDisabled: { opacity: 0.45 },
  btnText: { fontSize: 14, fontWeight: "700" },
  chip: {
    paddingVertical: 7,
    paddingHorizontal: 13,
    borderRadius: R.pill,
    backgroundColor: C.ink2,
    borderWidth: 1,
    borderColor: C.line,
  },
  chipOn: { backgroundColor: C.ink3, borderColor: C.amber },
  chipText: { fontSize: 12.5, color: C.paperDim, fontWeight: "600" },
  thumb: { width: "100%", aspectRatio: 16 / 9, borderRadius: R.sm, backgroundColor: C.ink3 },
  thumbEmpty: { borderWidth: 1, borderColor: C.line },
  center: { alignItems: "center", justifyContent: "center", padding: S.xl, flexGrow: 1 },
  progressWrap: { paddingVertical: S.lg, gap: S.md },
  progressTrack: {
    height: 6,
    borderRadius: 3,
    backgroundColor: C.ink3,
    overflow: "hidden",
  },
  progressFill: { height: "100%", backgroundColor: C.amber, borderRadius: 3 },
  progressText: { ...F.small, color: C.paperDim, textAlign: "center" },
  skeleton: { backgroundColor: C.ink3, borderRadius: R.sm, height: 14 },
});
