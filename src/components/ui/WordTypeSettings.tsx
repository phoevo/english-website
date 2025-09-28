import { Check } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

type WordTypeKey = "noun" | "verb" | "adjective" | "pronoun" | "adverb" | "idiom" | "preposition" | "article" | "conjunction" | "interjection" | "determiner" | "contraction";
type WordTypeData = { color: string; enabled: boolean; };

// const textColorMap: Record<WordTypeKey, string> = {
//   noun: "text-red-500",
//   verb: "text-green-500",
//   adjective: "text-blue-500",
//   pronoun: "text-yellow-500",
//   adverb: "text-pink-500",
//   idiom: "text-purple-500",
//   preposition: "text-indigo-500",
//   article: "text-cyan-500",
//   conjunction: "text-orange-500",
//   interjection: "text-lime-500",
//   determiner: "text-teal-500",
//   contraction: "text-rose-500",
// };


interface Props {
  wordTypes: Record<WordTypeKey, WordTypeData>;
  toggleWordType: (key: WordTypeKey) => void;
}

export const WordTypeSettings: React.FC<Props> = ({ wordTypes, toggleWordType }) => {
  const keys = Object.keys(wordTypes) as WordTypeKey[];
  return (
    <motion.div
      className="grid grid-cols-3 lg:flex lg:flex-col gap-2"
      initial="hidden"
      animate="show"
      exit="hidden"
      variants={{
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: { staggerChildren: 0.03, when: "beforeChildren" },
        },
      }}
    >
      <AnimatePresence initial={false}>
        {keys.map((key) => (
          <motion.div
            key={key}
            layout
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className={`${
              wordTypes[key].enabled ? "bg-muted" : "bg-background"
            } flex items-center justify-between rounded-md cursor-pointer p-1 border-1 hover:bg-muted`}
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              toggleWordType(key);
            }}
          >
            <div className="flex items-center truncate">
              {/* <Dot size={15} className={textColorMap[key]} /> */}
              <span className="text-xs lg:text-sm truncate">{key.charAt(0).toUpperCase() + key.slice(1)}</span>
            </div>
            <div className="flex-shrink-0 ml-1">
              <AnimatePresence initial={false}>
                {wordTypes[key].enabled ? (
                  <motion.span
                    key="check"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    className="flex items-center"
                  >
                    <Check size={14} />
                  </motion.span>
                ) : null}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
};
