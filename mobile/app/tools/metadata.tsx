import { Ionicons } from "@expo/vector-icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import * as Clipboard from "expo-clipboard";
import * as Haptics from "expo-haptics";
import React, { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

import { api } from "@/api/client";
import type { MetadataResponse, TranscriptRef } from "@/api/types";
import { RequireChannel } from "@/components/RequireChannel";
import { VideoSheet, type PlayTarget } from "@/components/VideoSheet";
import { Button, Card, Loading, StagedProgress, Thumb } from "@/components/ui";
import { C, F, R, S } from "@/theme";

const STAGES = [
  "Reading the transcript…",
  "Drafting title options…",
  "Marking real chapter boundaries…",
  "Writing the description…",
  "Picking tags and a pinned comment…",
];

export default function MetadataScreen() {
  return <RequireChannel>{(ch) => <Studio slug={ch.slug} />}</RequireChannel>;
}

function Studio({ slug }: { slug: string }) {
  const [picked, setPicked] = useState<TranscriptRef | null>(null);
  const [play, setPlay] = useState<PlayTarget | null>(null);

  const run = useMutation({
    mutationFn: (videoId: string) => api.metadata(slug, videoId),
  });

  const choose = (v: TranscriptRef) => {
    setPicked(v);
    run.mutate(v.video_id);
  };

  if (!picked) return <VideoPicker slug={slug} onPick={choose} />;

  return (
    <>
      <ScrollView style={st.screen} contentContainerStyle={st.content}>
        <Pressable onPress={() => { setPicked(null); run.reset(); }}>
          <View style={st.backRow}>
            <Ionicons name="chevron-back" size={16} color={C.amber} />
            <Text style={[F.small, { color: C.amber }]}>Pick a different video</Text>
          </View>
        </Pressable>

        <Card style={{ flexDirection: "row", gap: S.md, alignItems: "center" }}>
          <View style={{ width: 84 }}>
            <Thumb uri={`https://i.ytimg.com/vi/${picked.video_id}/mqdefault.jpg`} />
          </View>
          <Text style={[F.heading, { flex: 1 }]} numberOfLines={3}>
            {picked.title}
          </Text>
        </Card>

        {run.isPending ? <StagedProgress stages={STAGES} /> : null}
        {run.isError ? (
          <Text style={[F.small, { color: C.bad }]}>{(run.error as Error).message}</Text>
        ) : null}
        {run.data ? (
          <Results data={run.data} onPlay={(t) => setPlay(t)} videoId={picked.video_id} />
        ) : null}
      </ScrollView>
      <VideoSheet target={play} onClose={() => setPlay(null)} />
    </>
  );
}

function VideoPicker({
  slug,
  onPick,
}: {
  slug: string;
  onPick: (v: TranscriptRef) => void;
}) {
  const [q, setQ] = useState("");
  const { data, isLoading } = useQuery({
    queryKey: ["transcripts", slug],
    queryFn: () => api.transcripts(slug),
  });

  if (isLoading) return <Loading text="Loading your videos…" />;

  const needle = q.trim().toLowerCase();
  const videos = (data?.videos ?? []).filter(
    (v) => !needle || v.title.toLowerCase().includes(needle),
  );

  return (
    <ScrollView style={st.screen} contentContainerStyle={st.content} keyboardShouldPersistTaps="handled">
      <Text style={F.body}>
        Pick a video and Hindsight will draft its titles, chapters, description,
        tags and a pinned comment — from the transcript, not a guess.
      </Text>
      <TextInput
        value={q}
        onChangeText={setQ}
        placeholder="Filter your videos…"
        placeholderTextColor={C.faint}
        style={st.filter}
      />
      {videos.map((v) => (
        <Card key={v.video_id} onPress={() => onPick(v)} style={st.pickRow}>
          <View style={{ width: 84 }}>
            <Thumb uri={`https://i.ytimg.com/vi/${v.video_id}/mqdefault.jpg`} />
          </View>
          <View style={{ flex: 1, gap: 3 }}>
            <Text style={[F.body, { color: C.paper }]} numberOfLines={2}>
              {v.title}
            </Text>
            <Text style={F.small}>
              {v.published_at ?? ""}
              {v.word_count ? ` · ${v.word_count.toLocaleString()} words` : ""}
            </Text>
          </View>
        </Card>
      ))}
      {videos.length === 0 ? (
        <Text style={[F.small, { textAlign: "center" }]}>No videos match “{q}”.</Text>
      ) : null}
    </ScrollView>
  );
}

function Results({
  data,
  videoId,
  onPlay,
}: {
  data: MetadataResponse;
  videoId: string;
  onPlay: (t: PlayTarget) => void;
}) {
  return (
    <>
      <Section title="Title options">
        {data.titles?.map((t, i) => (
          <CopyRow key={i} value={t.text} tag={t.style} />
        ))}
      </Section>

      {data.description ? (
        <Section title="Description">
          <CopyRow value={data.description} multiline />
        </Section>
      ) : null}

      {data.chapters?.length ? (
        <Section
          title="Chapters"
          action={
            <CopyAll
              label="Copy all"
              value={data.chapters.map((c) => `${c.stamp} ${c.label}`).join("\n")}
            />
          }
        >
          {data.chapters.map((c, i) => (
            <Pressable
              key={i}
              onPress={() => onPlay({ videoId, start: c.t, title: c.label, subtitle: c.stamp })}
              style={({ pressed }) => [st.chapter, pressed && { opacity: 0.7 }]}
            >
              <Text style={st.stamp}>{c.stamp}</Text>
              <Text style={[F.body, { flex: 1, color: C.paper }]}>{c.label}</Text>
              <Ionicons name="play-circle-outline" size={17} color={C.faint} />
            </Pressable>
          ))}
        </Section>
      ) : null}

      {data.tags?.length ? (
        <Section title="Tags" action={<CopyAll label="Copy all" value={data.tags.join(", ")} />}>
          <View style={st.tags}>
            {data.tags.map((t, i) => (
              <View key={i} style={st.tag}>
                <Text style={st.tagText}>{t}</Text>
              </View>
            ))}
          </View>
        </Section>
      ) : null}

      {data.pinned_comments?.length ? (
        <Section title="Pinned comment">
          {data.pinned_comments.map((p, i) => (
            <CopyRow key={i} value={p} multiline />
          ))}
        </Section>
      ) : null}
    </>
  );
}

function Section({
  title,
  action,
  children,
}: {
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <View style={{ gap: S.sm }}>
      <View style={st.sectionHead}>
        <Text style={F.label}>{title}</Text>
        {action}
      </View>
      {children}
    </View>
  );
}

function useCopy() {
  const [done, setDone] = useState(false);
  return {
    done,
    copy: async (v: string) => {
      await Clipboard.setStringAsync(v);
      Haptics.selectionAsync().catch(() => {});
      setDone(true);
      setTimeout(() => setDone(false), 1500);
    },
  };
}

function CopyRow({
  value,
  tag,
  multiline,
}: {
  value: string;
  tag?: string;
  multiline?: boolean;
}) {
  const { done, copy } = useCopy();
  return (
    <Pressable onPress={() => copy(value)} style={({ pressed }) => [st.copyRow, pressed && { opacity: 0.7 }]}>
      <View style={{ flex: 1, gap: 3 }}>
        {tag ? <Text style={F.label}>{tag}</Text> : null}
        <Text style={[F.body, { color: C.paper }]} numberOfLines={multiline ? 12 : 3}>
          {value}
        </Text>
      </View>
      <Ionicons
        name={done ? "checkmark-circle" : "copy-outline"}
        size={17}
        color={done ? C.good : C.faint}
      />
    </Pressable>
  );
}

function CopyAll({ label, value }: { label: string; value: string }) {
  const { done, copy } = useCopy();
  return (
    <Pressable onPress={() => copy(value)} hitSlop={8}>
      <Text style={[F.small, { color: done ? C.good : C.amber, fontWeight: "700" }]}>
        {done ? "Copied" : label}
      </Text>
    </Pressable>
  );
}

const st = StyleSheet.create({
  screen: { flex: 1, backgroundColor: C.ink },
  content: { padding: S.lg, gap: S.lg, paddingBottom: S.xxl },
  backRow: { flexDirection: "row", alignItems: "center", gap: 2 },
  filter: {
    backgroundColor: C.ink2,
    borderColor: C.line,
    borderWidth: 1,
    borderRadius: R.pill,
    paddingHorizontal: S.lg,
    paddingVertical: 11,
    color: C.paper,
    fontSize: 14,
  },
  pickRow: { flexDirection: "row", gap: S.md, alignItems: "center", padding: S.md },
  sectionHead: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  copyRow: {
    flexDirection: "row",
    gap: S.md,
    alignItems: "flex-start",
    backgroundColor: C.ink2,
    borderWidth: 1,
    borderColor: C.line,
    borderRadius: R.md,
    padding: S.md,
  },
  chapter: {
    flexDirection: "row",
    alignItems: "center",
    gap: S.md,
    backgroundColor: C.ink2,
    borderWidth: 1,
    borderColor: C.line,
    borderRadius: R.md,
    padding: S.md,
  },
  stamp: {
    fontSize: 12,
    fontWeight: "700",
    color: C.amber,
    fontVariant: ["tabular-nums"],
    minWidth: 42,
  },
  tags: { flexDirection: "row", flexWrap: "wrap", gap: 6 },
  tag: {
    backgroundColor: C.ink3,
    borderRadius: R.sm,
    paddingHorizontal: 9,
    paddingVertical: 5,
  },
  tagText: { fontSize: 12, color: C.paperDim },
});
