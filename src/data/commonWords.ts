// Roughly the 1,000 most frequent English words (base forms plus common irregular
// forms). Used to leave everyday words out of the printed vocabulary list.
const WORDS = `
a about above across act action actually add address afraid after afternoon again against age ago agree air all allow almost alone along already also although always am amount an and angry animal another answer any anybody anyone anything anyway anywhere apart appear apple area arm around are arrive art as ask at attention aunt autumn available away awful
baby back bad bag ball bank bar base bath be beach bear beat beautiful became because become bed bedroom been beer before began begin behind believe below beside best better between big bike bill bird birthday bit black blood blue board boat body book born borrow boss both bottle bottom bought box boy brain bread break breakfast bring broke broken brother brought brown build building built bus business busy but buy by
cake call came camera can car card care careful carry case cat catch caught cause centre center certain chair chance change cheap check child children choose chose chosen church city class clean clear clever climb close clothes coat coffee cold colour color come common company complete computer cook cool corner cost could count country couple course cousin cover cross cry cup cut
dad dance dangerous dark date daughter day dead dear decide deep did die different difficult dinner direction dirty do doctor does dog done door double down draw dream dress drink drive driven driver drop drove dry during
each ear early earth easily east easy eat eaten egg eight either else email end enjoy enough enter even evening ever every everybody everyone everything everywhere exactly example except excited exciting excuse expensive explain eye
face fact fail fair fall fallen family famous far farm fast fat father favourite favorite fear feel feet fell felt few field fight fill film final finally find fine finger finish fire first fish five fix floor fly follow food foot for forget forgot forgotten fork form forward found four free fresh friend friendly from front fruit full fun funny future
game garden gave get girl give given glad glass go goes gone good got great green grey gray ground group grow guess guy
had hair half hall hand happen happy hard has hat hate have he head health hear heard heart heavy hello help her here hers herself hey hi high hill him himself his history hit hold hole holiday home hope horse hospital hot hotel hour house how however huge human hundred hungry hurry hurt husband
i ice idea if ill important in inside instead interest interested interesting into is island it its itself
job join joke journey juice jump just
keep kept key kid kill kind king kitchen knew know known
lady lake land language large last late later laugh lay lead learn least leave led left leg less lesson let letter level library lie life light like line list listen little live long look lose lost lot loud love lovely low luck lucky lunch
machine mad made main make man manage many map mark market married matter may maybe me meal mean meant meat meet member men met middle might mile milk mind mine minute miss mistake modern moment money month more morning most mother mountain mouth move movie much mum mom music must my myself
name near nearly neck need never new news newspaper next nice night nine no nobody noise none normal north nose not note nothing notice now number
of off offer office often oh ok okay old on once one only open or orange order other our ours out outside over own
page paid paint pair paper parent park part party pass past pay pen pencil people perfect perhaps person phone photo pick picture piece place plan plane plant play please pleased pocket point police poor possible post pound practice prefer prepare present pretty price probably problem pull push put
quarter question quick quickly quiet quite
radio rain ran rang rather reach read ready real really reason receive red remember rent repeat rest restaurant return rich ride right ring river road rock room round rule run
sad safe said salt same sand sat save saw say school sea season seat second see seem seen sell send sent sentence serious set seven several shall share she shirt shoe shop short should shout show shower shut sick side sign simple since sing sister sit six size skin sleep slow slowly small smell smile snow so some somebody someone something sometimes somewhere son song soon sorry sort sound south space speak special spend spent spoke spoken sport spring square stand star start station stay step still stood stop story street strong student study stupid such sudden suddenly sugar summer sun supper sure surprise sweet swim
table take taken talk tall taste taught taxi tea teach teacher team tell ten terrible test than thank thanks that the theatre theater their theirs them themselves then there these they thick thin thing think third thirsty this those though thought thousand three threw through throw thrown ticket tidy time tired to today together told tomorrow tonight too took tooth top touch towards town toy traffic train travel tree trip trouble true try turn twice two type
ugly uncle under understand understood until up upon upstairs us use used useful usual usually
very view village visit voice
wait wake walk wall want war warm was wash watch water way we wear weather week weekend weight welcome well went were west wet what whatever when where whether which while white who whole whom whose why wide wife will win wind window wine winter wish with without woke woman women won wonder wonderful word wore work world worry worse worst would write written wrong wrote
yard yeah year yellow yes yesterday yet you young your yours yourself
`;

// Everyday words beyond the top 1,000 that learners meet early, e.g. in work and
// daily-life conversations. Days, months and numbers are listed for completeness.
const EVERYDAY = `
coffee computer conversation customer email exercise grandfather grandmother interview internet laptop machine manager meeting online project shirt skill snack supermarket t-shirt trousers university video website
monday tuesday wednesday thursday friday saturday sunday
january february march april may june july august september october november december
zero eleven twelve thirteen fourteen fifteen sixteen seventeen eighteen nineteen twenty thirty forty fifty sixty seventy eighty ninety million
`;

const COMMON = new Set(`${WORDS} ${EVERYDAY}`.split(/\s+/).filter(Boolean));

/** True when the word, or its base form, is an everyday English word. */
export function isCommonWord(word: string): boolean {
  const w = word.toLowerCase().replace(/'s$/, "");
  if (COMMON.has(w)) return true;
  const candidates = [
    w.replace(/ies$/, "y"), w.replace(/es$/, ""), w.replace(/s$/, ""),
    w.replace(/ied$/, "y"), w.replace(/ed$/, ""), w.replace(/d$/, ""),
    w.replace(/ing$/, ""), w.replace(/ing$/, "e"),
    w.replace(/([b-df-hj-np-tv-z])\1(ed|ing)$/, "$1"), // stopped -> stop, running -> run
    w.replace(/ly$/, ""), w.replace(/ily$/, "y"),
    w.replace(/er$/, ""), w.replace(/est$/, ""),
  ];
  return candidates.some(candidate => candidate !== w && COMMON.has(candidate));
}
