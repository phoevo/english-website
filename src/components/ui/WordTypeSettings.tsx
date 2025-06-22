import { Dot, Check } from "lucide-react";

type WordTypeKey = "noun" | "verb" | "adjective" | "pronoun" | "adverb" | "idiom" | "preposition" | "article" | "conjunction" | "interjection" | "determiner" | "contraction";
type WordTypeData = { color: string; enabled: boolean; };

const textColorMap: Record<WordTypeKey, string> = {
  noun: "text-red-500",
  verb: "text-green-500",
  adjective: "text-blue-500",
  pronoun: "text-yellow-500",
  adverb: "text-pink-500",
  idiom: "text-purple-500",
  preposition: "text-indigo-500",
  article: "text-cyan-500",
  conjunction: "text-orange-500",
  interjection: "text-lime-500",
  determiner: "text-teal-500",
  contraction: "text-rose-500",
};


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
                  <Dot size={30} className={textColorMap[key]} />
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
