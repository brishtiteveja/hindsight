import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { Stack, router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { api } from "@/api/client";
import { VideoSheet, type PlayTarget } from "@/components/VideoSheet";
import { Button, Card, ErrorState, Loading, Thumb } from "@/components/ui";
import { titleize, useChannels } from "@/store";
import { C, F, R, S } from "@/theme";

const STANCE_COLOR: Record<string, string> = {
  supportive: C.good,
  critical: C.bad,
  neutral: C.paperDim,
  mixed: C.mix,
};

export default function ChannelScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const { channels, add, setActive, active } = useChannels();
  const [play, setPlay] = useState<PlayTarget | null>(null);

  const persona = useQuery({
    queryKey: ["persona", slug],
    queryFn: () => api.persona(slug!),
    enabled: !!slug,
  });
  const transcripts = useQuery({
    queryKey: ["transcripts", slug],
    queryFn: () => api.transcripts(slug!),
    enabled: !!slug,
  });

  const saved = channels.some((c) => c.slug === slug);
  const isActive = active?.slug === slug;

  if (persona.isLoading) return <Loading text="Loading channel…" />;
  if (persona.isError) {
    return (
      <View style={st.screen}>
        <ErrorState
          message={(persona.error as Error).message}
          onRetry={() => persona.refetch()}
        />
      </View>
    );
  }

  const p = persona.data!;

  return (
    <>
      <Stack.Screen options={{ title: p.channel ?? titleize(slug ?? "") }} />
      <ScrollView style={st.screen} contentContainerStyle={st.content}>
        {p.poster ? <Thumb uri={p.poster} style={{ aspectRatio: 21 / 9 }} /> : null}

        <View style={{ gap: S.xs }}>
          <Text style={F.display}>{p.channel}</Text>
          <Text style={F.small}>
            {[p.handle, p.role, p.group].filter(Boolean).join(" · ")}
          </Text>
          <Text style={F.small}>
            {p.total_videos} videos
            {p.date_range ? ` · ${p.date_range[0]} → ${p.date_range[1]}` : ""}
          </Text>
        </View>

        {isActive ? (
          <Button
            title="Open the studio tools"
            icon="color-wand-outline"
            onPress={() => router.push("/(tabs)")}
          />
        ) : saved ? (
          <Button
            title="Work on this channel"
            icon="radio-button-on"
            onPress={() => {
              setActive(slug!);
              router.push("/(tabs)");
            }}
          />
        ) : (
          <Button
            title="Add to my channels"
            icon="add-circle-outline"
            onPress={() => add({ slug: slug!, name: p.channel ?? titleize(slug!) })}
          />
        )}

        {p.top_topics?.length ? (
          <Card style={{ gap: S.md }}>
            <Text style={F.label}>What this channel covers</Text>
            {p.top_topics.slice(0, 8).map((t) => (
              <View key={t.topic} style={st.topicRow}>
                <Text style={[F.body, { color: C.paper, flex: 1 }]} numberOfLines={1}>
                  {t.topic.replace(/_/g, " ")}
                </Text>
                <Text style={[F.small, { color: STANCE_COLOR[t.stance] ?? C.faint }]}>
                  {t.stance}
                </Text>
                <Text style={[F.small, { minWidth: 30, textAlign: "right" }]}>{t.count}</Text>
              </View>
            ))}
          </Card>
        ) : null}

        {p.sample_quotes?.length ? (
          <Card style={{ gap: S.md }}>
            <Text style={F.label}>In their own words</Text>
            {p.sample_quotes.slice(0, 4).map((q, i) => (
              <Text key={i} style={[F.body, { fontStyle: "italic" }]}>
                “{q}”
              </Text>
            ))}
          </Card>
        ) : null}

        {p.recent_narratives?.length ? (
          <View style={{ gap: S.sm }}>
            <Text style={F.label}>Recent narratives</Text>
            {p.recent_narratives.slice(0, 6).map((n, i) => (
              <Card key={i} style={{ gap: 4 }}>
                <Text style={[F.body, { color: C.paper }]}>{n.text}</Text>
                <Text style={F.small} numberOfLines={1}>
                  {n.title} · {n.date}
                </Text>
              </Card>
            ))}
          </View>
        ) : null}

        {transcripts.data?.videos?.length ? (
          <View style={{ gap: S.sm }}>
            <Text style={F.label}>Indexed videos ({transcripts.data.count})</Text>
            {transcripts.data.videos.slice(0, 30).map((v) => (
              <Pressable
                key={v.video_id}
                onPress={() =>
                  setPlay({ videoId: v.video_id, title: v.title, subtitle: v.published_at })
                }
                style={({ pressed }) => [st.videoRow, pressed && { opacity: 0.72 }]}
              >
                <View style={{ width: 76 }}>
                  <Thumb uri={`https://i.ytimg.com/vi/${v.video_id}/mqdefault.jpg`} />
                </View>
                <View style={{ flex: 1, gap: 2 }}>
                  <Text style={[F.small, { color: C.paperDim }]} numberOfLines={2}>
                    {v.title}
                  </Text>
                  <Text style={F.small}>{v.published_at}</Text>
                </View>
                <Ionicons name="play-circle-outline" size={18} color={C.faint} />
              </Pressable>
            ))}
          </View>
        ) : null}
      </ScrollView>
      <VideoSheet target={play} onClose={() => setPlay(null)} />
    </>
  );
}

const st = StyleSheet.create({
  screen: { flex: 1, backgroundColor: C.ink },
  content: { padding: S.lg, gap: S.lg, paddingBottom: S.xxl },
  topicRow: { flexDirection: "row", alignItems: "center", gap: S.md },
  videoRow: {
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
