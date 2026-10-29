import { updateMyProfile } from "./accountActions";

export async function updateRecentConversations({ conversationId }: { userId: string; conversationId: string | number }) {
  await updateMyProfile({ kind: "conversation.open", conversationId: String(conversationId) });
}
