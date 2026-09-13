import { Ionicons } from "@expo/vector-icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { ApiError, api } from "@/api/client";
import type { Idea, VideoRef } from "@/api/types";
import { RequireChannel } from "@/components/RequireChannel";
import { VideoSheet, type PlayTarget } from "@/components/VideoSheet";
import { Button, Card, EmptyState, ErrorState, StagedProgress, Thumb } from "@/components/ui";
import { C, F, R, S } from "@/theme";

const STAGES = [
  "Reading your back catalogue…",
  "Finding topics you left unresolved…",
  "Checking what the wider map is talking about…",
  "Scoring the gaps by opportunity…",
  "Writing the pitches…",
];

const GAP_COPY: Record<string, string> = {
  stance_unresolved: "You changed your mind here and never said so on camera",
  never_covered: "The map is loud on this; your channel is silent",
  stale: "You owned this topic once — it's been a while",
  momentum: "Rising fast right now",
};

export default function IdeasScreen() {
  return <RequireChannel>{(ch) => <Ideas slug={ch.slug} />}</RequireChannel>;
}

function Ideas({ slug }: { slug: string }) {
  const qc = useQueryClient();
  const [play, setPlay] = useState<PlayTarget | null>(null);

  const cached = useQuery({
    queryKey: ["ideas", slug],
    queryFn: () => api.ideas(slug),
    // A 404 here just means "not generated yet" — a normal state, not a failure.
    retry: false,
  });

  const generate = useMutation({
    mutationFn: () => api.generateIdeas(slug),
    onSuccess: (data) => qc.setQueryData(["ideas", slug], data),
  });

  const notYetGenerated =
    cached.isError && cached.error instanceof ApiError && cached.error.status === 404;

  if (generate.isPending) {
    return (
      <View style={st.screen}>
        <StagedProgress stages={STAGES} />
      </View>
    );
  }

  if (cached.isLoading) {
    return (
      <View style={st.screen}>
        <StagedProgress stages={["Loading your ideas…"]} />
      </View>
    );
  }

  if (notYetGenerated || (!cached.data?.ideas?.length && !cached.isError)) {
    return (
      <View style={st.screen}>
        <EmptyState
          icon="bulb-outline"
          title="No ideas yet"
          body="Hindsight will compare what you've covered against what the wider map is discussing, and pitch the gaps worth filling."
          action={
            <Button
              title="Generate ideas"
              icon="sparkles"
              onPress={() => generate.mutate()}
            />
          }
        />
      </View>
    );
  }

  if (cached.isError) {
    return (
      <View style={st.screen}>
        <ErrorState
          message={(cached.error as Error).message}
          onRetry={() => cached.refetch()}
        />
      </View>
    );
  }

  return (
    <>
      <ScrollView style={st.screen} contentContainerStyle={st.content}>
        <Text style={F.body}>
          Ranked by how much of a gap they fill. Every pitch cites your own
          videos and what the wider map is saying.
        </Text>

        {cached.data!.ideas.map((idea, i) => (
          <IdeaCard key={i} idea={idea} onPlay={setPlay} />
        ))}

        <Button
          title={generate.isPending ? "Working…" : "Regenerate"}
          icon="refresh"
          variant="ghost"
          onPress={() => generate.mutate()}
          style={{ marginTop: S.md }}
        />
        {generate.isError ? (
          <Text style={[F.small, { color: C.bad, marginTop: S.sm }]}>
            {(generate.error as Error).message}
          </Text>
        ) : null}
      </ScrollView>
      <VideoSheet target={play} onClose={() => setPlay(null)} />
    </>
  );
}

function IdeaCard({
  idea,
  onPlay,
}: {
  idea: Idea;
  onPlay: (t: PlayTarget) => void;
}) {
  const pct = Math.round((idea.confidence ?? 0) * 100);
  return (
    <Card style={{ gap: S.md }}>
      <View style={st.row}>
        <View style={st.badge}>
          <Text style={st.badgeText}>{pct}%</Text>
        </View>
        <Text style={[F.small, { flex: 1 }]}>
          {GAP_COPY[idea.gap_type] ?? idea.gap_type.replace(/_/g, " ")}
        </Text>
      </View>

      <Text style={F.title}>{idea.title_pitch}</Text>
      <Text style={F.body}>{idea.angle}</Text>

      <View style={st.why}>
        <Ionicons name="time-outline" size={14} color={C.amber} />
        <Text style={[F.small, { flex: 1, color: C.paperDim }]}>{idea.why_now}</Text>
      </View>

      {idea.your_history?.length ? (
        <Receipts label="From your channel" videos={idea.your_history} onPlay={onPlay} />
      ) : null}
      {idea.market_evidence?.length ? (
        <Receipts label="What the map is saying" videos={idea.market_evidence} onPlay={onPlay} />
      ) : null}
    </Card>
  );
}

function Receipts({
  label,
  videos,
  onPlay,
}: {
  label: string;
  videos: VideoRef[];
  onPlay: (t: PlayTarget) => void;
}) {
  // The API can repeat a video across evidence lists; showing it twice reads as a bug.
  const seen = new Set<string>();
  const unique = videos.filter((v) => !seen.has(v.video_id) && seen.add(v.video_id));

  return (
    <View style={{ gap: S.sm }}>
      <Text style={F.label}>{label}</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: S.sm }}>
        {unique.map((v) => (
          <Card
            key={v.video_id}
            style={st.receipt}
            onPress={() => onPlay({ videoId: v.video_id, title: v.title, subtitle: v.channel })}
          >
            <Thumb uri={v.thumb} />
            <Text style={[F.small, { color: C.paperDim, marginTop: S.xs }]} numberOfLines={2}>
              {v.title}
            </Text>
            <Text style={F.small}>{v.channel ? `${v.channel} · ` : ""}{v.date}</Text>
          </Card>
        ))}
      </ScrollView>
    </View>
  );
}

const st = StyleSheet.create({
  screen: { flex: 1, backgroundColor: C.ink },
  content: { padding: S.lg, gap: S.lg, paddingBottom: S.xxl },
  row: { flexDirection: "row", alignItems: "center", gap: S.md },
  badge: {
    paddingHorizontal: S.sm,
    paddingVertical: 3,
    borderRadius: R.sm,
    backgroundColor: C.ink3,
    borderWidth: 1,
    borderColor: C.amber,
  },
  badgeText: { fontSize: 11, fontWeight: "700", color: C.amber2 },
  why: {
    flexDirection: "row",
    gap: S.sm,
    backgroundColor: C.ink3,
    padding: S.md,
    borderRadius: R.sm,
  },
  receipt: { width: 190, padding: S.sm, gap: 2 },
});
