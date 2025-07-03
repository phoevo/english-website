import { useEffect, useState } from "react";
import { fetchPendingRequests, updateRequestStatus } from "@/data/friendRequests";
import { getUserById } from "@/data/appwrite";
import { useUserStore } from "@/data/useUserStore";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";

interface Request {
  id: string;
  fromUserId: string;
  senderName: string;
}

export default function RequestsTab({ userId }: { userId: string }) {
  const [pendingRequests, setPendingRequests] = useState<Request[]>([]);

  useEffect(() => {
    async function loadRequests() {
      try {
        const requests = await fetchPendingRequests(userId);

        const withNames = await Promise.all(
          requests.map(async (req) => {
            const sender = await getUserById(req.fromUserId);
            return {
              id: req.$id,
              fromUserId: req.fromUserId,
              senderName: sender.name || sender.email || "Unknown",
            };
          })
        );

        setPendingRequests(withNames);
      } catch (error) {
        console.error("Error loading pending requests:", error);
      }
    }

    loadRequests();
  }, [userId]);

  const handleAccept = async (requestId: string) => {
    await updateRequestStatus(requestId, "accepted");
    setPendingRequests((prev) => prev.filter((r) => r.id !== requestId));
  };

  const handleDecline = async (requestId: string) => {
    await updateRequestStatus(requestId, "declined");
    setPendingRequests((prev) => prev.filter((r) => r.id !== requestId));
  };

  return (
    <TabsContent value="requests">
      <Card className="bg-background p-4">
        {pendingRequests.length === 0 ? (
          <p>No pending friend requests.</p>
        ) : (
          <ul className="space-y-3 max-h-64 overflow-y-auto">
            {pendingRequests.map((request) => (
              <li
                key={request.id}
                className="flex justify-between items-center border p-2 rounded"
              >
                <div>
                  <span className="font-medium">{request.senderName}</span> wants to be your friend.
                </div>
                <div className="flex gap-2">
                  <Button onClick={() => handleAccept(request.id)}>Accept</Button>
                  <Button variant="outline" onClick={() => handleDecline(request.id)}>Decline</Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </TabsContent>
  );
}
