import { updateMyProfile } from "@/data/accountActions";
import { useUserStore } from "@/data/useUserStore";

export async function updateDailyStreak() {
  const { user, setLastActive, setStreak } = useUserStore.getState();
  if (!user) return;
  try {
    const profile = await updateMyProfile({ kind: "streak.touch", timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone });
    setStreak(profile.streak);
    if (profile.lastActive) setLastActive(profile.lastActive);
  } catch (error) { console.error("Failed to update daily streak:", error); }
}
