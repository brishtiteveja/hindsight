import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { api } from "@/api/client";
import { Button, Card, Skeleton, Thumb } from "@/components/ui";
import { useChannels } from "@/store";
import { C, F, R, S } from "@/theme";

type Tool = {
  key: string;
  route: "/tools/ideas" | "/tools/precheck" | "/tools/clips" | "/tools/metadata";
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  blurb: string;
};

const TOOLS: Tool[] = [
  {
    key: "ideas",
    route: "/tools/ideas",
    icon: "bulb-outline",
    title: "Idea Hub",
    blurb: "What to make next, argued from your own back catalogue",
  },
  {
    key: "precheck",
    route: "/tools/precheck",
    icon: "shield-checkmark-outline",
    title: "Pre-flight",
    blurb: "Check a draft against everything you've already said",
  },
  {
    key: "clips",
    route: "/tools/clips",
    icon: "cut-outline",
    title: "Clip Finder",
    blurb: "Shorts-worthy moments with exact in/out points",
  },
  {
    key: "metadata",
    route: "/tools/metadata",
    icon: "pricetags-outline",
    title: "Metadata Studio",
    blurb: "Titles, chapters, tags and a pinned comment",
  },
];

export default function Studio() {
  const { active, ready } = useChannels();

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: C.ink }}
      contentContainerStyle={st.content}
      showsVerticalScrollIndicator={false}
    >
      {ready && !active ? <FirstRun /> : <ActiveHeader />}

      <Text style={[F.label, { marginTop: S.xl, marginBottom: S.md }]}>Your tools</Text>
      <View style={st.grid}>
        {TOOLS.map((t) => (
          <Pressable
            key={t.key}
            onPress={() => router.push(t.route)}
            style={({ pressed }) => [st.tool, pressed && { opacity: 0.72 }]}
          >
            <View style={st.toolIcon}>
              <Ionicons name={t.icon} size={19} color={C.amber} />
            </View>
            <Text style={st.toolTitle}>{t.title}</Text>
            <Text style={st.toolBlurb}>{t.blurb}</Text>
          </Pressable>
        ))}
      </View>

      <TodaysProof />
    </ScrollView>
  );
}

/** The empty state is the pitch: explain the product, then ask for one link. */
function FirstRun() {
  return (
    <Card style={{ padding: 0, overflow: "hidden" }}>
      <LinearGradient
        colors={[C.ink3, C.ink2]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ padding: S.xl }}
      >
        <Text style={F.label}>Hindsight</Text>
        <Text style={[F.display, { marginTop: S.sm }]}>
          Your archive, finally useful.
        </Text>
        <Text style={[F.body, { marginTop: S.md }]}>
          Drop a few YouTube links from your channel. Hindsight reads the
          captions and turns them into next-video ideas, a contradiction check
          for your drafts, clip-ready moments, and metadata — all grounded in
          what you actually said.
        </Text>
        <Button
          title="Add your channel"
          icon="add-circle-outline"
          onPress={() => router.push("/onboard")}
          style={{ marginTop: S.xl }}
        />
      </LinearGradient>
    </Card>
  );
}

function ActiveHeader() {
  const { active } = useChannels();
  const { data, isLoading } = useQuery({
    queryKey: ["persona", active?.slug],
    queryFn: () => api.persona(active!.slug),
    enabled: !!active,
  });

  if (!active) return null;

  return (
    <Pressable onPress={() => router.push(`/channel/${active.slug}`)}>
      <Card style={{ padding: 0, overflow: "hidden" }}>
        {data?.poster ? (
          <Thumb uri={data.poster} style={{ aspectRatio: 21 / 9, borderRadius: 0 }} />
        ) : null}
        <View style={{ padding: S.lg }}>
          <Text style={F.label}>Working on</Text>
          <Text style={[F.title, { marginTop: S.xs }]}>{active.name}</Text>
          {isLoading ? (
            <Skeleton style={{ width: 160, marginTop: S.sm }} />
          ) : (
            <Text style={[F.small, { marginTop: S.xs }]}>
              {data?.total_videos ?? 0} videos indexed
              {data?.date_range ? ` · ${data.date_range[0]} → ${data.date_range[1]}` : ""}
            </Text>
          )}
        </View>
      </Card>
    </Pressable>
  );
}

/**
 * A live artifact from the public corpus so the app has something real on screen
 * before the user has added anything of their own.
 */
function TodaysProof() {
  const { data, isLoading } = useQuery({
    queryKey: ["showcase"],
    queryFn: api.showcase,
  });

  if (isLoading) {
    return (
      <View style={{ marginTop: S.xl, gap: S.sm }}>
        <Skeleton style={{ width: 140 }} />
        <Skeleton style={{ height: 90, borderRadius: R.lg }} />
      </View>
    );
  }
  if (!data?.clip) return null;

  return (
    <View style={{ marginTop: S.xl }}>
      <Text style={[F.label, { marginBottom: S.md }]}>Made by Hindsight today</Text>
      <Card onPress={() => router.push(`/channel/${data.channel}`)} style={{ padding: 0 }}>
        <Thumb uri={data.clip.thumb} style={{ borderTopLeftRadius: R.lg, borderTopRightRadius: R.lg }} />
        <View style={{ padding: S.lg }}>
          <Text style={F.heading}>{data.clip.short_title}</Text>
          <Text style={[F.body, { marginTop: S.xs }]} numberOfLines={3}>
            “{data.clip.hook}”
          </Text>
          <Text style={[F.small, { marginTop: S.sm }]}>
            {data.name} · a clip found in the archive, not written from scratch
          </Text>
        </View>
      </Card>
    </View>
  );
}

const st = StyleSheet.create({
  content: { padding: S.lg, paddingBottom: S.xxl },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: S.md },
  tool: {
    width: "48%",
    flexGrow: 1,
    backgroundColor: C.ink2,
    borderWidth: 1,
    borderColor: C.line,
    borderRadius: R.lg,
    padding: S.lg,
    minHeight: 140,
  },
  toolIcon: {
    width: 36,
    height: 36,
    borderRadius: R.sm,
    backgroundColor: C.ink3,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: S.md,
  },
  toolTitle: { ...F.heading, marginBottom: S.xs },
  toolBlurb: { ...F.small, lineHeight: 17 },
});
