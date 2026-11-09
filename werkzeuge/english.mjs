// Englisches Aussprache-Lexikon (ipa-dict en_US, MIT) eingedeutscht, für englische Suchwörter
import fs from "node:fs";
import { IPA } from "./core.mjs";
const EN = "/tmp/claude-0/-home-user-reimlexikon-/7ca5be93-23ec-59fa-9399-b1e168aa0294/scratchpad/ext/en_US.txt";
const V = "aeiouæɑɔəɛɪʊʌɝɚ";
export function germanize(ipa) {
  let s = ipa.replace(/[\/\s]/g, "").replace(/ɫ/g, "l").replace(/ɡ/g, "g");
  s = s.replace(/eɪ/g, "eː").replace(/oʊ/g, "oː").replace(/ɔɪ/g, "ɔʏ");
  s = s.replace(new RegExp(`([ˈˌ][^${V}]*)ə`, "g"), "$1a"); // betontes ə = ʌ
  s = s.replace(new RegExp(`([ˈˌ][^${V}]*)ɝ`, "g"), "$1œʁ").replace(/ɝ/g, "ɐ").replace(/ɚ/g, "ɐ").replace(/æ/g, "ɛ").replace(/ʌ/g, "a").replace(/ɑ(?!ː)/g, "aː");
  s = s.replace(/i(?!ː)(?=.)/g, "iː").replace(/u(?!ː)/g, "uː");
  s = s.replace(/θ/g, "s").replace(/ð/g, "d").replace(/w/g, "v");
  // Auslautverhärtung wie im Deutschen
  s = s.replace(/([bdgzvʒ]+)$/, (m) => m.replace(/b/g, "p").replace(/d/g, "t").replace(/g/g, "k").replace(/z/g, "s").replace(/v/g, "f").replace(/ʒ/g, "ʃ"));
  return IPA.parse(s).norm;
}
const lines = [];
for (const line of fs.readFileSync(EN, "utf8").split("\n")) {
  const t = line.indexOf("\t"); if (t < 0) continue;
  const w = line.slice(0, t).trim().toLowerCase();
  if (!/^[a-z][a-z']+$/.test(w) && !/^[a-z]$/.test(w)) continue;
  const vs = IPA.splitVariants(line.slice(t + 1)).slice(0, 2).map(germanize).filter((x) => x && IPA.parse(x, true).S);
  const u = [...new Set(vs)];
  if (u.length) lines.push(w + "\t" + u.join("|"));
}
export const EN_TEXT = lines.join("\n");
if (process.argv[2] === "test") {
  const m = new Map(lines.map((l) => l.split("\t")));
  for (const w of "sandwich bacon beans money flow bird car weather baby player nice swag weekend high life game hustle streetwear crush cash fame squad hood the".split(" ")) console.log(w, m.get(w));
  console.log(lines.length, EN_TEXT.length);
}
