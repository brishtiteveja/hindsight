import { router } from "expo-router";
import React from "react";
import { ScrollView, View } from "react-native";

import { Button, EmptyState } from "@/components/ui";
import { useChannels, type SavedChannel } from "@/store";
import { C, S } from "@/theme";

/**
 * Every creator tool is meaningless without a channel to run it against, so
 * they all funnel through here: either hand the screen its channel, or show the
 * one action that unblocks it.
 */
export function RequireChannel({
  children,
}: {
  children: (channel: SavedChannel) => React.ReactNode;
}) {
  const { active, ready } = useChannels();

  if (!ready) return <View style={{ flex: 1, backgroundColor: C.ink }} />;

  if (!active) {
    return (
      <ScrollView
        style={{ flex: 1, backgroundColor: C.ink }}
        contentContainerStyle={{ flexGrow: 1, padding: S.lg }}
      >
        <EmptyState
          icon="link-outline"
          title="Pick a channel first"
          body="These tools read your own back catalogue. Drop a few YouTube links and Hindsight will index them — it takes about a minute."
          action={
            <Button
              title="Add your channel"
              icon="add-circle-outline"
              onPress={() => router.push("/onboard")}
            />
          }
        />
      </ScrollView>
    );
  }

  return <>{children(active)}</>;
}
