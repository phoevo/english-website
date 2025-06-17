import { Dot, Check } from "lucide-react";

type WordTypeKey = "noun" | "verb" | "adjective" | "pronoun" | "adverb" | "idiom" | "preposition" | "article" | "conjunction" | "interjection" | "determiner" | "contraction";
type WordTypeData = { color: string; enabled: boolean; };

interface Props {
  wordTypes: Record<WordTypeKey, WordTypeData>;
  toggleWordType: (key: WordTypeKey) => void;
}

export const WordTypeSettings: React.FC<Props> = ({ wordTypes, toggleWordType }) => {
  return (
         <>
            {(Object.keys(wordTypes) as WordTypeKey[]).map((key) => (
              <div
                key={key}
                className={`${
                  wordTypes[key].enabled ? "bg-muted" : "bg-background"
                } flex items-center rounded-md cursor-pointer w-35 border-1 hover:bg-muted`}
                onClick={() => toggleWordType(key)}
              >
                <div className="flex flex-row items-center justify-self-start pl-1">
                  <Dot size={30} className={`text-${wordTypes[key].color}`} />
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </div>
                <div className="ml-auto pr-2">
                  {wordTypes[key].enabled ? <Check size={17} /> : ""}
                </div>
              </div>
            ))}
          </>

  );
};
