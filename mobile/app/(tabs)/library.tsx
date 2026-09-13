import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import React, { useState } from "react";
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

import { api } from "@/api/client";
import { Button, Card, EmptyState, Skeleton } from "@/components/ui";
import { titleize, useChannels } from "@/store";
import { C, F, R, S } from "@/theme";

export default function Library() {
  const { channels, active, setActive, remove, add } = useChannels();
  const [q, setQ] = useState("");

  const all = useQuery({ queryKey: ["channels"], queryFn: api.channels });

  const needle = q.trim().toLowerCase();
  const browsable = (all.data?.channels ?? []).filter(
    (slug) => needle && slug.includes(needle.replace(/\s+/g, "-")),
  );

  const confirmRemove = (slug: string, name: string) =>
    Alert.alert("Remove channel?", `${name} will disappear from your list. The indexed data stays on the server.`, [
      { text: "Cancel", style: "cancel" },
      { text: "Remove", style: "destructive", onPress: () => remove(slug) },
    ]);

  return (
    <ScrollView style={st.screen} contentContainerStyle={st.content} keyboardShouldPersistTaps="handled">
      <Text style={F.label}>Your channels</Text>

      {channels.length === 0 ? (
        <EmptyState
          icon="albums-outline"
          title="No channels yet"
          body="Add your own channel to unlock the studio tools."
          action={
            <Button
              title="Add your channel"
              icon="add-circle-outline"
              onPress={() => router.push("/onboard")}
            />
          }
        />
      ) : (
        channels.map((c) => (
          <Card key={c.slug} style={st.row}>
            <Pressable style={st.rowMain} onPress={() => setActive(c.slug)}>
              <Ionicons
                name={active?.slug === c.slug ? "radio-button-on" : "radio-button-off"}
                size={19}
                color={active?.slug === c.slug ? C.amber : C.faint}
              />
              <View style={{ flex: 1 }}>
                <Text style={F.heading}>{c.name}</Text>
                <Text style={F.small}>{c.slug}</Text>
              </View>
            </Pressable>
            <Pressable onPress={() => router.push(`/channel/${c.slug}`)} hitSlop={8}>
              <Ionicons name="chevron-forward" size={18} color={C.faint} />
            </Pressable>
            <Pressable onPress={() => confirmRemove(c.slug, c.name)} hitSlop={8}>
              <Ionicons name="trash-outline" size={17} color={C.faint} />
            </Pressable>
          </Card>
        ))
      )}

      {channels.length > 0 ? (
        <Button
          title="Add another channel"
          icon="add-circle-outline"
          variant="ghost"
          onPress={() => router.push("/onboard")}
        />
      ) : null}

      <View style={{ height: S.md }} />
      <Text style={F.label}>Explore the public corpus</Text>
      <Text style={F.small}>
        {all.data ? `${all.data.channels.length} channels indexed.` : ""} Search
        to open one read-only — useful for seeing what a finished studio looks
        like.
      </Text>
      <TextInput
        value={q}
        onChangeText={setQ}
        placeholder="Search indexed channels…"
        placeholderTextColor={C.faint}
        autoCapitalize="none"
        style={st.filter}
      />
      {all.isLoading ? <Skeleton style={{ height: 40, borderRadius: R.md }} /> : null}
      {browsable.slice(0, 24).map((slug) => (
        <Card key={slug} style={st.row} onPress={() => router.push(`/channel/${slug}`)}>
          <Text style={[F.body, { color: C.paper, flex: 1 }]}>{titleize(slug)}</Text>
          <Pressable
            onPress={() => add({ slug, name: titleize(slug) })}
            hitSlop={8}
            accessibilityLabel={`Add ${titleize(slug)}`}
          >
            <Ionicons name="add-circle-outline" size={20} color={C.amber} />
          </Pressable>
        </Card>
      ))}
      {needle && browsable.length === 0 && !all.isLoading ? (
        <Text style={[F.small, { textAlign: "center" }]}>Nothing matches “{q}”.</Text>
      ) : null}
    </ScrollView>
  );
}

const st = StyleSheet.create({
  screen: { flex: 1, backgroundColor: C.ink },
  content: { padding: S.lg, gap: S.md, paddingBottom: S.xxl },
  row: { flexDirection: "row", alignItems: "center", gap: S.md, padding: S.md },
  rowMain: { flexDirection: "row", alignItems: "center", gap: S.md, flex: 1 },
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
});
