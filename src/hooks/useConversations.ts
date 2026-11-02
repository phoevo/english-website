import { useEffect, useState } from "react";
import { fetchConversations } from "@/data/getData";
import { getPublicConversationCatalog } from "@/data/accountActions";
import { useUserStore } from "@/data/useUserStore";
import type { ConversationCatalogItem } from "@/lib/profileTypes";
export function useConversations() {
  const user = useUserStore(state => state.user);
  const userLoading = useUserStore(state => state.loading);
  const [conversations, setConversations] = useState<ConversationCatalogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    if (userLoading) return;
    let cancelled = false;
    setLoading(true);
    setError(null);
    const load = async () => {
      try {
        const docs = user ? await fetchConversations() : await getPublicConversationCatalog();
        if (cancelled) return;
        setConversations(docs);
      } catch (err) {
        console.error("Failed to load conversations:", err);
        if (!cancelled) setError("Failed to load conversations.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    void load();
    return () => { cancelled = true; };
  }, [user, userLoading]);

  return { conversations, loading, error };
}
