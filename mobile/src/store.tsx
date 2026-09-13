import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const KEY = "hindsight.channels.v1";

export type SavedChannel = { slug: string; name: string };

type Ctx = {
  channels: SavedChannel[];
  active: SavedChannel | null;
  ready: boolean;
  add: (c: SavedChannel) => void;
  remove: (slug: string) => void;
  setActive: (slug: string) => void;
};

const ChannelContext = createContext<Ctx | null>(null);

type Persisted = { channels: SavedChannel[]; activeSlug: string | null };

/**
 * The channels a creator works on, plus which one is currently in focus. Kept
 * on-device: there are no accounts in Hindsight, so this is the whole notion of
 * "my stuff". Writes are fire-and-forget — losing the list is recoverable.
 */
export function ChannelProvider({ children }: { children: React.ReactNode }) {
  const [channels, setChannels] = useState<SavedChannel[]>([]);
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(KEY)
      .then((raw) => {
        if (!raw) return;
        const p = JSON.parse(raw) as Persisted;
        setChannels(p.channels ?? []);
        setActiveSlug(p.activeSlug ?? null);
      })
      .catch(() => {
        /* corrupt or absent — start empty */
      })
      .finally(() => setReady(true));
  }, []);

  const persist = useCallback((next: Persisted) => {
    AsyncStorage.setItem(KEY, JSON.stringify(next)).catch(() => {});
  }, []);

  const add = useCallback(
    (c: SavedChannel) => {
      setChannels((prev) => {
        const next = prev.some((x) => x.slug === c.slug) ? prev : [c, ...prev];
        persist({ channels: next, activeSlug: c.slug });
        return next;
      });
      setActiveSlug(c.slug);
    },
    [persist],
  );

  const remove = useCallback(
    (slug: string) => {
      setChannels((prev) => {
        const next = prev.filter((x) => x.slug !== slug);
        const nextActive =
          activeSlug === slug ? (next[0]?.slug ?? null) : activeSlug;
        setActiveSlug(nextActive);
        persist({ channels: next, activeSlug: nextActive });
        return next;
      });
    },
    [activeSlug, persist],
  );

  const setActive = useCallback(
    (slug: string) => {
      setActiveSlug(slug);
      setChannels((prev) => {
        persist({ channels: prev, activeSlug: slug });
        return prev;
      });
    },
    [persist],
  );

  const value = useMemo<Ctx>(
    () => ({
      channels,
      active: channels.find((c) => c.slug === activeSlug) ?? channels[0] ?? null,
      ready,
      add,
      remove,
      setActive,
    }),
    [channels, activeSlug, ready, add, remove, setActive],
  );

  return <ChannelContext.Provider value={value}>{children}</ChannelContext.Provider>;
}

export function useChannels(): Ctx {
  const c = useContext(ChannelContext);
  if (!c) throw new Error("useChannels must be used inside ChannelProvider");
  return c;
}

/** Turn "Dwarkesh Patel" into the slug the API uses. Mirrors ChannelStore. */
export const slugify = (name: string) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

/** Human label from a slug, for channels we only know by slug. */
export const titleize = (slug: string) =>
  slug
    .split("-")
    .map((w) => (w.length <= 3 ? w.toUpperCase() : w[0].toUpperCase() + w.slice(1)))
    .join(" ");
