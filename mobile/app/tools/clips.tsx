import { Ionicons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import * as Haptics from "expo-haptics";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

import { api } from "@/api/client";
import type { Clip } from "@/api/types";
import { RequireChannel } from "@/components/RequireChannel";
import { VideoSheet, type PlayTarget } from "@/components/VideoSheet";
import { Button, Card, EmptyState, StagedProgress, Thumb } from "@/components/ui";
import { C, F, R, S } from "@/theme";

const STAGES = [
  "Searching your transcripts…",
  "Ranking moments by hook strength…",
  "Finding clean in and out points…",
  "Writing the short titles…",
];

const SUGGESTIONS = [
  "my strongest take",
  "a surprising fact",
  "where I disagree",
  "the best story",
  "a bold prediction",
];

const mmss = (s: number) =>
  `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

export default function ClipsScreen() {
  return <RequireChannel>{(ch) => <Clips slug={ch.slug} />}</RequireChannel>;
}

function Clips({ slug }: { slug: string }) {
  const [q, setQ] = useState("");
  const [play, setPlay] = useState<PlayTarget | null>(null);

  const run = useMutation({ mutationFn: (query: string) => api.clips(slug, query) });

  const search = (query: string) => {
    const t = query.trim();
    if (!t) return;
    setQ(t);
    run.mutate(t);
  };

  return (
    <>
      <ScrollView style={st.screen} contentContainerStyle={st.content} keyboardShouldPersistTaps="handled">
        <Text style={F.body}>
          Describe the moment you want. Hindsight searches what you actually
          said and returns clips with exact timestamps.
        </Text>

        <View style={st.searchRow}>
          <TextInput
            value={q}
            onChangeText={setQ}
            placeholder="e.g. my strongest take on AI"
            placeholderTextColor={C.faint}
            style={st.input}
            returnKeyType="search"
            onSubmitEditing={() => search(q)}
            editable={!run.isPending}
          />
          <Pressable
            onPress={() => search(q)}
            disabled={!q.trim() || run.isPending}
            style={[st.go, (!q.trim() || run.isPending) && { opacity: 0.45 }]}
          >
            <Ionicons name="search" size={18} color={C.ink} />
          </Pressable>
        </View>

        {!run.data && !run.isPending ? (
          <View style={st.chips}>
            {SUGGESTIONS.map((sug) => (
              <Pressable key={sug} onPress={() => search(sug)}>
                <View style={st.chip}>
                  <Text style={st.chipText}>{sug}</Text>
                </View>
              </Pressable>
            ))}
          </View>
        ) : null}

        {run.isPending ? <StagedProgress stages={STAGES} /> : null}

        {run.isError ? (
          <Text style={[F.small, { color: C.bad }]}>{(run.error as Error).message}</Text>
        ) : null}

        {run.isSuccess && run.data.clips.length === 0 ? (
          <EmptyState
            icon="cut-outline"
            title="Nothing close enough"
            body="Try describing the idea rather than the exact words — the search matches meaning, not phrasing."
          />
        ) : null}

        {run.data?.clips.map((c) => (
          <ClipCard key={`${c.video_id}-${c.start}`} clip={c} onPlay={setPlay} />
        ))}
      </ScrollView>
      <VideoSheet target={play} onClose={() => setPlay(null)} />
    </>
  );
}

function ClipCard({ clip, onPlay }: { clip: Clip; onPlay: (t: PlayTarget) => void }) {
  const [copied, setCopied] = useState<"cmd" | "url" | null>(null);

  const copy = async (what: "cmd" | "url") => {
    await Clipboard.setStringAsync(what === "cmd" ? clip.ffmpeg : clip.url);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
    setCopied(what);
    setTimeout(() => setCopied(null), 1600);
  };

  return (
    <Card style={{ padding: 0, overflow: "hidden" }}>
      <Pressable
        onPress={() =>
          onPlay({
            videoId: clip.video_id,
            start: clip.start,
            title: clip.short_title,
            subtitle: `${mmss(clip.start)}–${mmss(clip.end)} · ${clip.date}`,
          })
        }
      >
        <View>
          <Thumb uri={clip.thumb} style={{ borderRadius: 0 }} />
          <View style={st.overlay}>
            <Ionicons name="play-circle" size={44} color={C.paper} />
          </View>
          <View style={st.range}>
            <Text style={st.rangeText}>
              {mmss(clip.start)} – {mmss(clip.end)} · {clip.end - clip.start}s
            </Text>
          </View>
        </View>
      </Pressable>

      <View style={{ padding: S.lg, gap: S.sm }}>
        <Text style={F.heading}>{clip.short_title}</Text>
        <Text style={[F.body, { fontStyle: "italic" }]}>“{clip.hook}”</Text>
        <Text style={F.small} numberOfLines={1}>
          from {clip.title} · {clip.date}
        </Text>

        <View style={st.actions}>
          <Button
            title={copied === "cmd" ? "Copied" : "Copy cut command"}
            icon={copied === "cmd" ? "checkmark" : "terminal-outline"}
            variant="ghost"
            onPress={() => copy("cmd")}
            style={{ flex: 1 }}
          />
          <Button
            title={copied === "url" ? "Copied" : "Link"}
            icon={copied === "url" ? "checkmark" : "link-outline"}
            variant="ghost"
            onPress={() => copy("url")}
          />
        </View>
      </View>
    </Card>
  );
}

const st = StyleSheet.create({
  screen: { flex: 1, backgroundColor: C.ink },
  content: { padding: S.lg, gap: S.lg, paddingBottom: S.xxl },
  searchRow: { flexDirection: "row", gap: S.sm, alignItems: "center" },
  input: {
    flex: 1,
    backgroundColor: C.ink2,
    borderColor: C.line,
    borderWidth: 1,
    borderRadius: R.pill,
    paddingHorizontal: S.lg,
    paddingVertical: 12,
    color: C.paper,
    fontSize: 14,
  },
  go: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: C.amber,
    alignItems: "center",
    justifyContent: "center",
  },
  chips: { flexDirection: "row", flexWrap: "wrap", gap: S.sm },
  chip: {
    paddingVertical: 7,
    paddingHorizontal: 13,
    borderRadius: R.pill,
    backgroundColor: C.ink2,
    borderWidth: 1,
    borderColor: C.line,
  },
  chipText: { fontSize: 12.5, color: C.paperDim, fontWeight: "600" },
  overlay: { ...StyleSheet.absoluteFillObject, alignItems: "center", justifyContent: "center" },
  range: {
    position: "absolute",
    bottom: S.sm,
    right: S.sm,
    backgroundColor: "rgba(12,11,9,0.85)",
    borderRadius: R.sm,
    paddingHorizontal: 7,
    paddingVertical: 3,
  },
  rangeText: { fontSize: 11, fontWeight: "700", color: C.amber2 },
  actions: { flexDirection: "row", gap: S.sm, marginTop: S.xs },
});
