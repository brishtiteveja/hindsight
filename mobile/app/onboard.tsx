import { Ionicons } from "@expo/vector-icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { api } from "@/api/client";
import type { OnboardStep } from "@/api/types";
import { Button, Card, Thumb } from "@/components/ui";
import { useChannels } from "@/store";
import { C, F, R, S } from "@/theme";

const PHASE_COPY: Record<string, string> = {
  captions: "Fetching captions",
  analysis: "Reading what you said",
  "second chance": "Retrying the blocked ones",
  indexing: "Building your index",
};

/** Rough count of how many links are in the box, for the button label. */
const countIds = (s: string) =>
  (s.match(/[\w-]{11}/g) ?? []).filter((x) => x.length === 11).length;

export default function Onboard() {
  const [urls, setUrls] = useState("");
  const [slug, setSlug] = useState<string | null>(null);
  const { add } = useChannels();

  const start = useMutation({
    mutationFn: () => api.onboard(urls),
    onSuccess: (r) => {
      setSlug(r.slug);
      add({ slug: r.slug, name: r.channel });
    },
  });

  if (slug) return <Progress slug={slug} />;

  const n = countIds(urls);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: C.ink }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={st.content} keyboardShouldPersistTaps="handled">
        <Text style={[F.title]}>Paste YouTube links</Text>
        <Text style={F.body}>
          One per line. Hindsight detects the channel from the first video,
          pulls the captions, and builds your studio. Start with 3–10 of your
          own videos — you can always add more later.
        </Text>

        <TextInput
          value={urls}
          onChangeText={setUrls}
          multiline
          textAlignVertical="top"
          autoCapitalize="none"
          autoCorrect={false}
          placeholder={"https://www.youtube.com/watch?v=…\nhttps://youtu.be/…"}
          placeholderTextColor={C.faint}
          style={st.input}
        />

        <Button
          title={
            start.isPending
              ? "Starting…"
              : n > 0
                ? `Index ${n} video${n === 1 ? "" : "s"}`
                : "Index these videos"
          }
          icon="cloud-download-outline"
          onPress={() => start.mutate()}
          disabled={n === 0 || start.isPending}
        />

        {start.isError ? (
          <Text style={[F.small, { color: C.bad }]}>{(start.error as Error).message}</Text>
        ) : null}

        <Card style={{ gap: S.sm }}>
          <View style={{ flexDirection: "row", gap: S.sm, alignItems: "center" }}>
            <Ionicons name="lock-closed-outline" size={14} color={C.faint} />
            <Text style={F.label}>Use your own channel</Text>
          </View>
          <Text style={F.small}>
            Hindsight reads caption files you have the rights to. It's built for
            your own archive — that's where the tools are useful anyway, since
            every answer is grounded in what you said.
          </Text>
        </Card>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

function Progress({ slug }: { slug: string }) {
  const { data } = useQuery({
    queryKey: ["onboard", slug],
    queryFn: () => api.onboardStatus(slug),
    // Poll while it's working; stop the moment it settles.
    refetchInterval: (q) => {
      const s = q.state.data?.state;
      return s === "done" || s === "error" ? false : 1500;
    },
  });

  const steps = data?.steps ?? [];
  const done = steps.filter((s) => s.state === "done").length;
  const failed = steps.filter((s) => s.state === "failed").length;
  const finished = data?.state === "done";
  const errored = data?.state === "error";

  return (
    <ScrollView style={{ flex: 1, backgroundColor: C.ink }} contentContainerStyle={st.content}>
      <View style={{ alignItems: "center", gap: S.sm }}>
        {finished ? (
          <Ionicons name="checkmark-circle" size={40} color={C.good} />
        ) : errored ? (
          <Ionicons name="alert-circle" size={40} color={C.bad} />
        ) : (
          <ActivityIndicator color={C.amber} size="large" />
        )}
        <Text style={F.title}>
          {finished
            ? "Your studio is ready"
            : errored
              ? "That didn't work"
              : (PHASE_COPY[data?.phase ?? ""] ?? "Working")}
        </Text>
        <Text style={F.small}>
          {finished
            ? `${done} video${done === 1 ? "" : "s"} indexed${failed ? ` · ${failed} skipped` : ""}`
            : errored
              ? (data?.error ?? "Unknown error")
              : `${done} of ${steps.length} done`}
        </Text>
      </View>

      {finished ? (
        <Button
          title="Open the studio"
          icon="color-wand-outline"
          onPress={() => router.replace("/(tabs)")}
        />
      ) : null}
      {errored ? (
        <Button title="Back" icon="chevron-back" variant="ghost" onPress={() => router.back()} />
      ) : null}

      <View style={{ gap: S.sm }}>
        {steps.map((s) => (
          <StepRow key={s.video_id} step={s} />
        ))}
      </View>

      {!finished && !errored ? (
        <Text style={[F.small, { textAlign: "center" }]}>
          Captions come through a rotating proxy, so the odd video needs a second
          attempt. Hindsight retries automatically.
        </Text>
      ) : null}
    </ScrollView>
  );
}

function StepRow({ step }: { step: OnboardStep }) {
  const icon: Record<string, { name: keyof typeof Ionicons.glyphMap; color: string }> = {
    queued: { name: "ellipse-outline", color: C.faint },
    fetching: { name: "cloud-download-outline", color: C.amber },
    fetched: { name: "document-text-outline", color: C.amber },
    analyzing: { name: "sparkles-outline", color: C.amber },
    done: { name: "checkmark-circle", color: C.good },
    failed: { name: "close-circle", color: C.bad },
  };
  const m = icon[step.state] ?? icon.queued;

  return (
    <View style={st.step}>
      <View style={{ width: 64 }}>
        <Thumb uri={`https://i.ytimg.com/vi/${step.video_id}/mqdefault.jpg`} />
      </View>
      <View style={{ flex: 1, gap: 2 }}>
        <Text style={[F.small, { color: C.paperDim }]} numberOfLines={2}>
          {step.title || step.video_id}
        </Text>
        <Text style={[F.small, { color: m.color }]} numberOfLines={2}>
          {step.error ? step.error : step.state}
        </Text>
      </View>
      <Ionicons name={m.name} size={18} color={m.color} />
    </View>
  );
}

const st = StyleSheet.create({
  content: { padding: S.lg, gap: S.lg, paddingBottom: S.xxl },
  input: {
    minHeight: 140,
    backgroundColor: C.ink2,
    borderColor: C.line,
    borderWidth: 1,
    borderRadius: R.lg,
    padding: S.lg,
    color: C.paper,
    fontSize: 13.5,
    lineHeight: 20,
  },
  step: {
    flexDirection: "row",
    alignItems: "center",
    gap: S.md,
    backgroundColor: C.ink2,
    borderWidth: 1,
    borderColor: C.line,
    borderRadius: R.md,
    padding: S.sm,
  },
});
