import { useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { api } from "@/api/client";
import type { Issue } from "@/api/types";
import { ErrorState, Skeleton, Thumb } from "@/components/ui";
import { C, F, R, S } from "@/theme";

/**
 * The public map: 23 issue families, each with real thumbnails pulled from the
 * corpus. This is the "why should I trust this" surface — you can see the
 * breadth of what Hindsight has actually read before you hand it your channel.
 */
export default function Discover() {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["browse"],
    queryFn: api.browse,
  });

  if (isError) {
    return (
      <View style={st.screen}>
        <ErrorState message={(error as Error).message} onRetry={() => refetch()} />
      </View>
    );
  }

  return (
    <ScrollView style={st.screen} contentContainerStyle={st.content}>
      <Text style={F.body}>
        What the wider YouTube map is talking about — {data?.issues.length ?? 23}{" "}
        issue families, drawn from public news and commentary channels.
      </Text>

      {isLoading
        ? [0, 1, 2, 3].map((i) => <Skeleton key={i} style={{ height: 150, borderRadius: R.lg }} />)
        : data!.issues.map((iss) => <IssueCard key={iss.key} issue={iss} />)}
    </ScrollView>
  );
}

function IssueCard({ issue }: { issue: Issue }) {
  const tiles = issue.tiles.slice(0, 3);
  return (
    <Pressable
      onPress={() => router.push(`/issue/${issue.key}`)}
      style={({ pressed }) => [st.card, pressed && { opacity: 0.75 }]}
    >
      <View style={[st.hue, { backgroundColor: issue.hue }]} />
      <View style={{ padding: S.lg, gap: S.sm }}>
        <Text style={F.title}>{issue.label}</Text>
        <Text style={F.small} numberOfLines={2}>
          {issue.issues.slice(0, 3).join(" · ")}
        </Text>
      </View>
      {tiles.length ? (
        <View style={st.tiles}>
          {tiles.map((t) => (
            <View key={t.video_id} style={{ flex: 1 }}>
              <Thumb uri={t.thumb} style={{ borderRadius: R.sm }} />
            </View>
          ))}
        </View>
      ) : null}
    </Pressable>
  );
}

const st = StyleSheet.create({
  screen: { flex: 1, backgroundColor: C.ink },
  content: { padding: S.lg, gap: S.lg, paddingBottom: S.xxl },
  card: {
    backgroundColor: C.ink2,
    borderWidth: 1,
    borderColor: C.line,
    borderRadius: R.lg,
    overflow: "hidden",
  },
  hue: { height: 4, width: "100%" },
  tiles: { flexDirection: "row", gap: 6, paddingHorizontal: S.lg, paddingBottom: S.lg },
});
