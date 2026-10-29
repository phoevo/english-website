type SearchableConversation = {
  title?: string;
  description?: string;
  category?: string;
  level?: string;
};

function normalize(value: string): string {
  return value.normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/\s+/g, " ").trim();
}

/** Every search term may match any of the conversation's displayed fields. */
export function matchesConversationSearch(conversation: SearchableConversation, query: string): boolean {
  const search = normalize(query);
  if (!search) return true;
  const text = normalize([conversation.title, conversation.description, conversation.category, conversation.level].filter(Boolean).join(" "));
  return search.split(" ").every(term => text.includes(term));
}
