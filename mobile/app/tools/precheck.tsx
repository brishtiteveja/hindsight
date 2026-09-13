import { Ionicons } from "@expo/vector-icons";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { api } from "@/api/client";
import type { PastClaim, PrecheckClaim } from "@/api/types";
import { RequireChannel } from "@/components/RequireChannel";
import { VideoSheet, type PlayTarget } from "@/components/VideoSheet";
import { Button, Card, StagedProgress, Thumb } from "@/components/ui";
import { C, F, R, S, VERDICT_COPY, verdictColor } from "@/theme";

const STAGES = [
  "Pulling the checkable claims out of your draft…",
  "Embedding them against your archive…",
  "Finding the closest things you've said before…",
  "Judging each pair for reversals…",
  "Locating the receipts…",
];

/** Contradictions first — that's the whole reason to run this before publishing. */
const ORDER: Record<string, number> = {
  contradiction: 0,
  drift: 1,
  new: 2,
  consistent: 3,
  unrelated: 4,
};

export default function PrecheckScreen() {
  return <RequireChannel>{(ch) => <Precheck slug={ch.slug} />}</RequireChannel>;
}

function Precheck({ slug }: { slug: string }) {
  const [script, setScript] = useState("");
  const [play, setPlay] = useState<PlayTarget | null>(null);

  const run = useMutation({
    mutationFn: () => api.precheck(slug, script),
  });

  const claims = run.data?.claims ?? [];
  const sorted = [...claims].sort(
    (a, b) => (ORDER[a.verdict] ?? 9) - (ORDER[b.verdict] ?? 9),
  );
  const flagged = claims.filter(
    (c) => c.verdict === "contradiction" || c.verdict === "drift",
  ).length;

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: C.ink }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={90}
      >
        <ScrollView contentContainerStyle={st.content} keyboardShouldPersistTaps="handled">
          <Text style={F.body}>
            Paste a draft script or an outline. Hindsight extracts the claims
            you're making and checks each against your own back catalogue.
          </Text>

          <TextInput
            value={script}
            onChangeText={setScript}
            multiline
            textAlignVertical="top"
            placeholder="Paste your script here…"
            placeholderTextColor={C.faint}
            style={st.input}
            editable={!run.isPending}
          />

          <Button
            title="Run pre-flight"
            icon="shield-checkmark"
            onPress={() => run.mutate()}
            disabled={script.trim().length < 80 || run.isPending}
          />
          {script.trim().length > 0 && script.trim().length < 80 ? (
            <Text style={F.small}>
              A little more to work with — {80 - script.trim().length} more characters.
            </Text>
          ) : null}

          {run.isPending ? <StagedProgress stages={STAGES} /> : null}

          {run.isError ? (
            <Text style={[F.small, { color: C.bad }]}>{(run.error as Error).message}</Text>
          ) : null}

          {run.data?.error ? (
            <Text style={[F.small, { color: C.bad }]}>{run.data.error}</Text>
          ) : null}

          {run.isSuccess && !run.data.error ? (
            <>
              <Verdicts count={claims.length} flagged={flagged} />
              {sorted.map((c, i) => (
                <ClaimCard key={i} claim={c} onPlay={setPlay} />
              ))}
            </>
          ) : null}
        </ScrollView>
      </KeyboardAvoidingView>
      <VideoSheet target={play} onClose={() => setPlay(null)} />
    </>
  );
}

function Verdicts({ count, flagged }: { count: number; flagged: number }) {
  const clean = flagged === 0;
  return (
    <Card style={[st.summary, { borderColor: clean ? C.good : C.bad }]}>
      <Ionicons
        name={clean ? "checkmark-circle" : "alert-circle"}
        size={26}
        color={clean ? C.good : C.bad}
      />
      <View style={{ flex: 1 }}>
        <Text style={F.heading}>
          {clean
            ? "Nothing contradicts your archive"
            : `${flagged} claim${flagged === 1 ? "" : "s"} worth a second look`}
        </Text>
        <Text style={F.small}>
          {count} checkable claim{count === 1 ? "" : "s"} found in this draft
        </Text>
      </View>
    </Card>
  );
}

function ClaimCard({
  claim,
  onPlay,
}: {
  claim: PrecheckClaim;
  onPlay: (t: PlayTarget) => void;
}) {
  const [open, setOpen] = useState(claim.verdict === "contradiction");
  const color = verdictColor(claim.verdict);
  const hasPast = (claim.past?.length ?? 0) > 0;

  return (
    <Card style={{ gap: S.md, borderLeftWidth: 3, borderLeftColor: color }}>
      <Pressable onPress={() => hasPast && setOpen((o) => !o)}>
        <View style={st.verdictRow}>
          <Text style={[st.verdictTag, { color, borderColor: color }]}>
            {claim.verdict.toUpperCase()}
          </Text>
          {hasPast ? (
            <Ionicons
              name={open ? "chevron-up" : "chevron-down"}
              size={16}
              color={C.faint}
            />
          ) : null}
        </View>
        <Text style={[F.body, { color: C.paper, marginTop: S.sm }]}>{claim.text}</Text>
        <Text style={[F.small, { marginTop: S.xs }]}>
          {VERDICT_COPY[claim.verdict] ?? ""}
        </Text>
      </Pressable>

      {open && hasPast
        ? claim.past.map((p, i) => <PastCard key={i} past={p} onPlay={onPlay} />)
        : null}
    </Card>
  );
}

function PastCard({
  past,
  onPlay,
}: {
  past: PastClaim;
  onPlay: (t: PlayTarget) => void;
}) {
  return (
    <Pressable
      onPress={() =>
        onPlay({
          videoId: past.video_id,
          start: past.t,
          title: past.title,
          subtitle: `${past.date} — the receipt`,
        })
      }
      style={({ pressed }) => [st.past, pressed && { opacity: 0.72 }]}
    >
      <View style={{ width: 96 }}>
        <Thumb uri={`https://i.ytimg.com/vi/${past.video_id}/mqdefault.jpg`} />
        <View style={st.playPill}>
          <Ionicons name="play" size={9} color={C.ink} />
          <Text style={st.playPillText}>
            {Math.floor(past.t / 60)}:{String(past.t % 60).padStart(2, "0")}
          </Text>
        </View>
      </View>
      <View style={{ flex: 1, gap: 3 }}>
        <Text style={[F.small, { color: C.paperDim }]} numberOfLines={2}>
          “{past.text}”
        </Text>
        <Text style={F.small} numberOfLines={1}>
          {past.title} · {past.date}
        </Text>
        {past.why ? (
          <Text style={[F.small, { color: verdictColor(past.verdict) }]} numberOfLines={3}>
            {past.why}
          </Text>
        ) : null}
      </View>
    </Pressable>
  );
}

const st = StyleSheet.create({
  content: { padding: S.lg, gap: S.lg, paddingBottom: S.xxl },
  input: {
    minHeight: 170,
    backgroundColor: C.ink2,
    borderColor: C.line,
    borderWidth: 1,
    borderRadius: R.lg,
    padding: S.lg,
    color: C.paper,
    fontSize: 14,
    lineHeight: 20,
  },
  summary: { flexDirection: "row", alignItems: "center", gap: S.md },
  verdictRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  verdictTag: {
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1,
    borderWidth: 1,
    borderRadius: R.sm,
    paddingHorizontal: 6,
    paddingVertical: 2,
    overflow: "hidden",
  },
  past: {
    flexDirection: "row",
    gap: S.md,
    backgroundColor: C.ink3,
    padding: S.sm,
    borderRadius: R.sm,
  },
  playPill: {
    position: "absolute",
    bottom: 4,
    right: 4,
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    backgroundColor: C.amber,
    borderRadius: R.pill,
    paddingHorizontal: 5,
    paddingVertical: 1,
  },
  playPillText: { fontSize: 9, fontWeight: "700", color: C.ink },
});
