import { useEffect, useState } from "react";
import { Query } from "appwrite";
import { useUserStore } from "@/data/useUserStore";
import { databases, databaseId, decksCollectionId, account } from "@/data/appwrite";
import { Create } from "./create";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import { X } from "lucide-react";

interface DeckCreateInput {
  name: string;
  type: string;
  words: string[];
}

export async function createDeck({ name, type, words }: DeckCreateInput) {
  const user = await account.get();

  const newDeck = {
  title: name.trim(),
  type,
  words,
  userID: user.$id,
};

  return await databases.createDocument(
    databaseId,
    decksCollectionId,
    'unique()',
    newDeck
  );
}


interface Deck {
  $id: string;
  title: string;
  type: string;
  words: string[];
  userID: string;
}

interface MyDecksProps {
  onSelectDeck: (deck: Deck) => void;
}

export function MyDecks({ onSelectDeck }: MyDecksProps) {
  const user = useUserStore(state => state.user);
  const [decks, setDecks] = useState<Deck[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) return;

    const fetchDecks = async () => {
      setLoading(true);
      try {
        const res = await databases.listDocuments(databaseId, decksCollectionId, [
          Query.equal("userID", user.$id),
        ]);
        setDecks(res.documents as unknown as Deck[]);
      } catch (error) {
        console.error("Failed to fetch decks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDecks();
  }, [user]);


  if (!user) return <p>Please log in to see your decks.</p>;
  if (loading) return <p>Loading decks...</p>;
  if (!decks.length) return <p className="text-zinc-500">No decks found.</p>;



  const handleDeleteDeck = async (deckId: string) => {
  if (!user?.$id) return;

  try {

    await databases.deleteDocument(
      databaseId,
      decksCollectionId,
      deckId
    );

    // Optionally update local state to remove the deleted deck
    setDecks(prev => prev.filter(deck => deck.$id !== deckId));
  } catch (error) {
    console.error("Failed to delete deck:", error);
  }
};

  return (
    <div className="flex flex-row gap-5">
  {decks.map((deck, index) => (
    <motion.div
      key={deck.$id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1, ease: "easeOut" }}
      className="relative"
    >
      <Card
        className="w-40 h-40 bg-background"
        onClick={() => onSelectDeck(deck)}
      >
        <CardHeader>
          <CardTitle>{deck.title}</CardTitle>
          <CardDescription>{deck.type}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm">Words: {deck.words.length}</p>
        </CardContent>
      </Card>

      <Button
        variant="destructive"
        size="icon"
        onClick={() => handleDeleteDeck(deck.$id)}
        className="absolute top-2 right-2 z-10 h-5 w-5 cursor-pointer"
      >
        <motion.div whileHover={{ rotate: 90 }} transition={{ duration: 0.1 }}>
          <X className="h-4 w-4" />
        </motion.div>
      </Button>
    </motion.div>
  ))}
</div>

  );
}

export function DeckManager() {
  const [showMyDecks, setShowMyDecks] = useState(false);
   const [, setSelectedDeck] = useState<Deck | null>(null);

     const handleSelectDeck = (deck: Deck) => {
    setSelectedDeck(deck);
    setShowMyDecks(false);
  };




  return (
    <div>
      <button
        className="btn"
        onClick={() => setShowMyDecks(prev => !prev)}
      >
        {showMyDecks ? "Hide My Decks" : "My Decks"}
      </button>

      {showMyDecks ? <MyDecks onSelectDeck={handleSelectDeck}  /> : <Create>Create Deck</Create>}
    </div>
  );
}
