import { databases, usersCollectionId, databaseId } from "@/data/appwrite";
import { useUserStore } from "@/data/useUserStore";

export async function updateDailyStreak() {
  const {
    user,
    streak,
    lastActive,
    setLastActive,
    setStreak,
  } = useUserStore.getState();

  if (!user) return;

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  if (!lastActive) {
    // First login ever
    await databases.updateDocument(databaseId, usersCollectionId, user.$id, {
      lastActive: now.toISOString(),
      streak: 1,
    });
    setStreak(1);
    setLastActive(now.toISOString());
    return;
  }

  const last = new Date(lastActive);
  const lastDate = new Date(last.getFullYear(), last.getMonth(), last.getDate());

  const diffDays = Math.floor(
    (today.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (diffDays === 1) {
    // Continued streak
    const newStreak = streak + 1;
    await databases.updateDocument(databaseId, usersCollectionId, user.$id, {
      streak: newStreak,
      lastActive: now.toISOString(),
    });
    setStreak(newStreak);
    setLastActive(now.toISOString());
  } else if (diffDays > 1) {
    // Missed a day, reset streak
    await databases.updateDocument(databaseId, usersCollectionId, user.$id, {
      streak: 1,
      lastActive: now.toISOString(),
    });
    setStreak(1);
    setLastActive(now.toISOString());
  } else {
    // Already interacted today, no changes
    return;
  }
}
