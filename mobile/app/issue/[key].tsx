import { useQuery } from "@tanstack/react-query";
import { Stack, useLocalSearchParams } from "expo-router";
import React, { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { api } from "@/api/client";
import type { IssueEvent } from "@/api/types";
import { VideoSheet, type PlayTarget } from "@/components/VideoSheet";
import { Card, Chip, ErrorState, Loading, Thumb } from "@/components/ui";
import { C, F, R, S } from "@/theme";

const STANCE_COLOR: Record<string, string> = {
  supportive: C.good,
  critical: C.bad,
  mixed: C.mix,
  neutral: C.faint,
};

const LEANS = ["all", "left", "center", "right"] as const;

export default function IssueScreen() {
  const { key } = useLocalSearchParams<{ key: string }>();
  const [lean, setLean] = useState<(typeof LEANS)[number]>("all");
  const [play, setPlay] = useState<PlayTarget | null>(null);

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["issue", key],
    queryFn: () => api.issueTimeline(key!),
    enabled: !!key,
  });

  const events = useMemo(
    () => (data?.events ?? []).filter((e) => lean === "all" || e.lean === lean),
    [data, lean],
  );

  if (isLoading) return <Loading text="Loading the issue…" />;
  if (isError) {
    return (
      <View style={st.screen}>
        <ErrorState message={(error as Error).message} onRetry={() => refetch()} />
      </View>
    );
  }

  const d = data!;

  return (
    <>
      <Stack.Screen options={{ title: d.label }} />
      <ScrollView style={st.screen} contentContainerStyle={st.content}>
        <View style={{ gap: S.xs }}>
          <Text style={F.display}>{d.label}</Text>
          <Text style={F.small}>
            {d.total.toLocaleString()} claims across {d.channels} channels
          </Text>
          <Text style={[F.small, { marginTop: S.xs }]}>{d.issues.join(" · ")}</Text>
        </View>

        <Card style={{ gap: S.md }}>
          <Text style={F.label}>How the room splits</Text>
          <StanceBar counts={d.stances} />
          <View style={st.legend}>
            {Object.entries(d.stances).map(([k, v]) => (
              <View key={k} style={st.legendItem}>
                <View style={[st.swatch, { backgroundColor: STANCE_COLOR[k] ?? C.faint }]} />
                <Text style={F.small}>
                  {k} {v}
                </Text>
              </View>
            ))}
          </View>
        </Card>

        <Card style={{ gap: S.md }}>
          <Text style={F.label}>By political lean</Text>
          {(["left", "center", "right"] as const).map((l) =>
            d.by_lean[l] ? (
              <View key={l} style={{ gap: 5 }}>
                <Text style={[F.small, { color: C.paperDim }]}>{l}</Text>
                <StanceBar counts={d.by_lean[l]} />
              </View>
            ) : null,
          )}
        </Card>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: S.sm }}>
          {LEANS.map((l) => (
            <Chip key={l} label={l} active={lean === l} onPress={() => setLean(l)} />
          ))}
        </ScrollView>

        <Text style={F.label}>What was said ({events.length})</Text>
        {events.slice(0, 60).map((e, i) => (
          <EventCard key={`${e.video_id}-${i}`} event={e} onPlay={setPlay} />
        ))}
      </ScrollView>
      <VideoSheet target={play} onClose={() => setPlay(null)} />
    </>
  );
}

/** Proportional stance split — the one chart that says "this is contested". */
function StanceBar({ counts }: { counts: Record<string, number> }) {
  const total = Object.values(counts).reduce((a, b) => a + b, 0) || 1;
  return (
    <View style={st.bar}>
      {["supportive", "mixed", "neutral", "critical"].map((k) =>
        counts[k] ? (
          <View
            key={k}
            style={{
              flex: counts[k] / total,
              backgroundColor: STANCE_COLOR[k],
            }}
          />
        ) : null,
      )}
    </View>
  );
}

function EventCard({
  event,
  onPlay,
}: {
  event: IssueEvent;
  onPlay: (t: PlayTarget) => void;
}) {
  return (
    <Pressable
      onPress={() =>
        onPlay({
          videoId: event.video_id,
          start: event.t,
          title: event.title,
          subtitle: `${event.channel} · ${event.date}`,
        })
      }
      style={({ pressed }) => [st.event, pressed && { opacity: 0.75 }]}
    >
      <View style={{ width: 92 }}>
        <Thumb uri={event.thumb} />
      </View>
      <View style={{ flex: 1, gap: 3 }}>
        <View style={st.eventHead}>
          <Text style={[F.small, { color: C.paperDim, flex: 1 }]} numberOfLines={1}>
            {event.channel}
          </Text>
          <Text style={[st.stanceTag, { color: STANCE_COLOR[event.stance] ?? C.faint }]}>
            {event.stance}
          </Text>
        </View>
        <Text style={[F.small, { color: C.paper }]} numberOfLines={3}>
          {event.summary}
        </Text>
        <Text style={F.small}>{event.date}</Text>
      </View>
    </Pressable>
  );
}

const st = StyleSheet.create({
  screen: { flex: 1, backgroundColor: C.ink },
  content: { padding: S.lg, gap: S.lg, paddingBottom: S.xxl },
  bar: { flexDirection: "row", height: 9, borderRadius: 5, overflow: "hidden", backgroundColor: C.ink3 },
  legend: { flexDirection: "row", flexWrap: "wrap", gap: S.md },
  legendItem: { flexDirection: "row", alignItems: "center", gap: 5 },
  swatch: { width: 9, height: 9, borderRadius: 3 },
  event: {
    flexDirection: "row",
    gap: S.md,
    backgroundColor: C.ink2,
    borderWidth: 1,
    borderColor: C.line,
    borderRadius: R.md,
    padding: S.sm,
  },
  eventHead: { flexDirection: "row", alignItems: "center", gap: S.sm },
  stanceTag: { fontSize: 10, fontWeight: "700", letterSpacing: 0.6 },
});
