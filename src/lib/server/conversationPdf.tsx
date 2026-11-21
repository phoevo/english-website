import "server-only";
import { Document, Font, Image, Link, Page, StyleSheet, Text, View, renderToBuffer } from "@react-pdf/renderer";
import QRCode from "qrcode";
import { vocabIndex } from "@/data/vocab/vocabIndex";
import { isCommonWord } from "@/data/commonWords";

type PdfConversation = { $id: string; title: string; level: string; category?: string; content: string };
type VocabEntry = { type: string; definition: string };
type Line = { speaker: string; text: string };

const SITE_URL = "https://synomilo.com";

// Wrap whole words only; split words ("some-thing") are hard to read for learners.
Font.registerHyphenationCallback(word => [word]);

// Same lookup rules as parseDialogue in src/data/conversation.ts (keep in sync).
const lookupKey = (rawWord: string) => rawWord.toLowerCase().replace(/[’]/g, "'").replace(/[.,!?—;:()"]/g, "");
// Same display rules as the conversation view: "_" joins phrases, /…/ marks are hidden.
const displayText = (text: string) => text.replace(/_/g, " ").replace(/\/.*?\//g, "");

function parseLines(content: string): Line[] {
  return content.trim().split("\n").filter(line => line.trim()).map(line => {
    const [speaker, ...rest] = line.split(":");
    return { speaker: speaker.trim(), text: displayText(rest.join(":").trim().replace(/\s+/g, " ")) };
  });
}

// The printed list keeps every idiom and phrase, plus harder nouns, verbs,
// adjectives and adverbs. Function words (articles, pronouns...), everyday words
// like "friend", short words, numbers, names, places and days are highlighted
// online but left out here.
const EXPRESSION_TYPES = ["idiom", "phrase"];
const MIN_WORD_LETTERS = 6;
// Names, places, languages, days and times, recognised by how the vocab files define them.
const NOT_VOCABULARY = /^(a|an)\b.*\bname\.?$|\bpart of a name\b|^the number\b|\btime of day\b|^the day (of the week )?(before|after)\b|^every (monday|tuesday|wednesday|thursday|friday|saturday|sunday)\b|\b(a|the) (large |small |capital )?(country|city|town)\b|\blanguage spoken\b/i;

function isHarderWord(key: string, definition: string) {
  const letters = key.replace(/[^a-z]/g, "");
  return !/\d/.test(key)
    && !key.includes("'") // contractions such as "couldn't"
    && letters.length >= MIN_WORD_LETTERS
    && !NOT_VOCABULARY.test(definition.trim())
    && !key.split(/[_-]/).every(part => isCommonWord(part)) // "six-thirty", "full-time"
    && !isCommonWord(displayText(key));
}
const WORD_GROUPS: { type: string; label: string }[] = [
  { type: "noun", label: "Nouns" },
  { type: "verb", label: "Verbs" },
  { type: "adjective", label: "Adjectives" },
  { type: "adverb", label: "Adverbs" },
];
type VocabItem = { word: string; definition: string; type: string };

function vocabularyList(content: string, level: string) {
  const vocab: Record<string, VocabEntry & { text?: string }> = vocabIndex[level] ?? {};
  const lines = content.trim().split("\n");
  // Character names (the speakers, or entries defined as "a name") aren't vocabulary.
  const speakers = new Set(lines.map(line => line.split(":")[0].trim().toLowerCase()));
  const seen = new Map<string, VocabItem>();
  for (const line of lines) {
    const text = line.split(":").slice(1).join(":");
    for (const rawWord of text.replace(/\s+/g, " ").trim().split(" ")) {
      const key = lookupKey(rawWord);
      const entry = vocab[key];
      if (!key || !entry || seen.has(key) || speakers.has(key)) continue;
      const isExpression = EXPRESSION_TYPES.includes(entry.type);
      if (!isExpression && !isHarderWord(key, entry.definition)) continue;
      // Prefer the entry's own spelling ("IT support"), falling back to the key.
      const word = displayText(entry.text?.replace(/:$/, "").trim() || key);
      // Many entries give two senses ("a; b"); the first is enough on paper.
      const definition = entry.definition.split(";")[0].trim();
      seen.set(key, { word, definition, type: entry.type });
    }
  }
  // List a word once: drop a plural when its singular is already listed.
  for (const key of [...seen.keys()]) {
    if (key.endsWith("s") && seen.has(key.slice(0, -1))) seen.delete(key);
  }
  const byWord = (a: VocabItem, b: VocabItem) => a.word.localeCompare(b.word, "en", { sensitivity: "base" });
  const items = [...seen.values()];
  return {
    expressions: items.filter(item => EXPRESSION_TYPES.includes(item.type)).sort(byWord),
    groups: WORD_GROUPS
      .map(group => ({ label: group.label, words: items.filter(item => item.type === group.type).sort(byWord) }))
      .filter(group => group.words.length > 0),
  };
}

const styles = StyleSheet.create({
  page: { paddingTop: 80, paddingBottom: 92, paddingHorizontal: 52, fontFamily: "Helvetica", fontSize: 10.5, color: "#111111", lineHeight: 1.45 },
  meta: { fontSize: 9, color: "#78716c", marginBottom: 6 },
  title: { fontSize: 21, fontFamily: "Helvetica-Bold", marginBottom: 20 },
  line: { flexDirection: "row", marginBottom: 7 },
  speaker: { width: 74, fontFamily: "Helvetica-Bold", paddingRight: 10 },
  lineText: { flex: 1 },
  sectionTitle: { fontSize: 16, fontFamily: "Helvetica-Bold", marginBottom: 4 },
  sectionIntro: { fontSize: 9.5, color: "#57534e", marginBottom: 12 },
  groupTitle: { fontSize: 10.5, fontFamily: "Helvetica-Bold", marginTop: 12, marginBottom: 6, paddingBottom: 3, borderBottomWidth: 0.5, borderBottomColor: "#d6d3d1" },
  expressionRow: { flexDirection: "row", marginBottom: 4, fontSize: 9.5 },
  expression: { width: 170, fontFamily: "Helvetica-Bold", paddingRight: 10 },
  definition: { flex: 1, color: "#44403c" },
  wordGrid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
  wordCell: { width: "48.5%", flexDirection: "row", marginBottom: 4, fontSize: 9 },
  word: { width: 82, fontFamily: "Helvetica-Bold", paddingRight: 6 },
  footer: { position: "absolute", left: 52, right: 52, bottom: 32, flexDirection: "row", alignItems: "center", borderTopWidth: 0.5, borderTopColor: "#d6d3d1", paddingTop: 10 },
  footerText: { flex: 1, fontSize: 8.5, color: "#57534e", paddingRight: 12 },
  footerLink: { color: "#111111", textDecoration: "none" },
  qr: { width: 44, height: 44 },
  headerBrand: { position: "absolute", left: 52, top: 34, fontSize: 12, color: "#111111" },
  pageNumber: { position: "absolute", right: 52, top: 37, fontSize: 8.5, color: "#a8a29e" },
});

// Repeated on every page, so continuation pages keep the wordmark and page number
// clear of the content.
function Header() {
  return <>
    <Text style={styles.headerBrand} fixed>synomilo</Text>
    <Text style={styles.pageNumber} fixed render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} />
  </>;
}

function Footer({ url, qr }: { url: string; qr: string }) {
  return <View style={styles.footer} fixed>
    <Text style={styles.footerText}>
      Read online with definitions on hover, saved words and audio:{"\n"}
      <Link src={url} style={styles.footerLink}>{url.replace(/^https:\/\//, "").replace(/\?.*$/, "")}</Link>
    </Text>
    {/* eslint-disable-next-line jsx-a11y/alt-text -- PDF image, not HTML */}
    <Image src={qr} style={styles.qr} />
  </View>;
}

export async function renderConversationPdf(conversation: PdfConversation): Promise<Buffer> {
  const url = `${SITE_URL}/home/conversations/${conversation.$id}?utm_source=pdf&utm_medium=document`;
  const qr = await QRCode.toDataURL(url, { margin: 0, width: 220, color: { dark: "#111111", light: "#ffffff" } });
  const lines = parseLines(conversation.content);
  const vocabulary = vocabularyList(conversation.content, conversation.level);
  const meta = [conversation.level, conversation.category].filter(Boolean).join(" · ");

  const doc = <Document title={conversation.title} author="Synomilo" creator="Synomilo">
    <Page size="A4" style={styles.page}>
      <Header />
      {meta && <Text style={styles.meta}>{meta}</Text>}
      <Text style={styles.title}>{conversation.title}</Text>
      {lines.map((line, index) => <View key={index} style={styles.line} wrap={false}>
        <Text style={styles.speaker}>{line.speaker}</Text>
        <Text style={styles.lineText}>{line.text}</Text>
      </View>)}
      <Footer url={url} qr={qr} />
    </Page>
    {(vocabulary.expressions.length > 0 || vocabulary.groups.length > 0) && <Page size="A4" style={styles.page}>
      <Header />
      <Text style={styles.sectionTitle}>Vocabulary</Text>
      <Text style={styles.sectionIntro}>Expressions and less common words from {conversation.title}.</Text>
      {vocabulary.expressions.length > 0 && <View>
        <Text style={styles.groupTitle} minPresenceAhead={70}>Expressions</Text>
        {vocabulary.expressions.map(item => <View key={item.word} style={styles.expressionRow} wrap={false}>
          <Text style={styles.expression}>{item.word}</Text>
          <Text style={styles.definition}>{item.definition}</Text>
        </View>)}
      </View>}
      {vocabulary.groups.map(group => <View key={group.label}>
        <Text style={styles.groupTitle} minPresenceAhead={70}>{group.label}</Text>
        <View style={styles.wordGrid}>{group.words.map(item => <View key={item.word} style={styles.wordCell} wrap={false}>
          <Text style={styles.word}>{item.word}</Text>
          <Text style={styles.definition}>{item.definition}</Text>
        </View>)}</View>
      </View>)}
      <Footer url={url} qr={qr} />
    </Page>}
  </Document>;

  return renderToBuffer(doc);
}

/** A readable file name, e.g. "synomilo-networking-event.pdf". */
export function pdfFileName(title: string) {
  const slug = title.toLowerCase().normalize("NFKD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  return `synomilo-${slug || "conversation"}.pdf`;
}
