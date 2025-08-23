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
    <div className="grid grid-cols-3 lg:flex lg:flex-col gap-2">
      {(Object.keys(wordTypes) as WordTypeKey[]).map((key) => (
        <div
          key={key}
          className={`${
            wordTypes[key].enabled ? "bg-muted" : "bg-background"
          } flex items-center justify-between rounded-md cursor-pointer p-1 border-1 hover:bg-muted`}
          onClick={(e) => {
            e.stopPropagation();
            toggleWordType(key);
          }}
        >
          <div className="flex items-center truncate">
            {/* <Dot size={30} className={textColorMap[key]} /> */}
            <span className="text-xs lg:text-sm truncate">{key.charAt(0).toUpperCase() + key.slice(1)}</span>
          </div>
          <div className="flex-shrink-0 ml-1">
            {wordTypes[key].enabled ? <Check size={14} className="lg:w-[17px] lg:h-[17px]" /> : ""}
          </div>
        </div>
      ))}
    </div>
  );
};
