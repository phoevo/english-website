// conversations.ts

import { vocab } from "./vocab";

export interface Word {
  text: string;
  type: string;
}

interface DialogueLine {
  speaker: string;
  words: Word[];
}

export interface Conversation {
  title: string;
  content: string | DialogueLine[];
}



const rawDialogue = `
Alex: Hey, how was your weekend? Break-a-leg
Jordan: It was awesome! I went hiking with some friends up the mountains. We took a less-traveled path, so it was more challenging than expected, but totally worth it. The views were breathtaking, and we even saw some wildlife, like deer and birds. The best part was when we stopped by a small stream to take a break. It was so peaceful, just listening to the water.
Alex: That sounds amazing! I’ve been thinking of hiking more lately but I’m not sure where to start. What trail did you take? Would it be good for someone like me who's just getting back into hiking?
Jordan: You should try it! We did the Eagle Ridge Trail. It’s quieter than popular trails, with incredible views. Some sections are steep, but it’s not too difficult. There’s a spot halfway with a panoramic view of the valley, it’s stunning. And if you’re into wildlife, you might see animals along the way. As long as you’re in decent shape and take your time, you’ll enjoy it.
Alex: That sounds perfect! How long did it take? I want to make sure I have enough time for a day trip.
Jordan: It took us about 4 hours, with breaks to enjoy the views. There’s a shortcut that saves about an hour, but the full trail is worth it. It’s a solid half-day trip.
Alex: Are there good spots for photos along the trail? I love nature photography.
Jordan: Absolutely! Near the summit, there’s a great spot with views of the valley. Early morning or late afternoon is best for soft lighting. There’s also a waterfall two-thirds of the way up that’s perfect for photos.
Alex: Sounds like exactly what I’m looking for! Thanks for the info, I’ll try it this weekend.
Jordan: You’ll have an amazing time! Let me know how it goes!`

export const rawDialogueLength = rawDialogue.length;

const parsedDialogue = rawDialogue
  .trim()
  .split("\n")
  .map(line => {
    const [speaker, ...rest] = line.split(":");
    const text = rest.join(":").trim();

    const words = text
      .replace(/\s+/g, " ") // Normalize spaces

      .trim()
      .split(" ") // Split into words
      .map(rawWord => {
        // Clean the word for vocab lookup by stripping punctuation and converting to lowercase
        const cleaned = rawWord
        .toLowerCase()
        .replace(/[’]/g, "'") // normalize fancy apostrophes
        .replace(/[.,!?—;:()"]/g, ""); // remove all other punctuation


        // Lookup cleaned word in vocab
        const vocabEntry = vocab[cleaned];

        return {
          text: rawWord, // Keep the original word with punctuation for display
          type: vocabEntry?.type ?? "unknown", // Use type from vocab or "unknown"
          definition: vocabEntry?.definition, // Include the definition from vocab
        };
      });

    return {
      speaker: speaker.trim(),
      words,
    };
  });

export const conversations: Record<string, Conversation> = {
  "1": {
    title: "Quick catchup",
    content: parsedDialogue,
  },
  "2": {
    title: "Conversation 2",
    content: "This is the second conversation.",
  },
  "3": {
    title: "Conversation 3",
    content: "This is the third conversation.",
  },
};
