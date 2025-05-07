import { useEffect, useState } from "react";
import { fetchConversations } from "@/data/getData"; // or wherever your function lives

export function useConversations() {
  const [conversations, setConversations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const docs = await fetchConversations();
        setConversations(docs);
      } catch (err) {
        console.error("Failed to load conversations:", err);
        setError("Failed to load conversations.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return { conversations, loading, error };
}
