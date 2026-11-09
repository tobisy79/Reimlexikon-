#!/usr/bin/env node
/*
  build_lexikon.mjs – erzeugt lexikon-de.json(.gz) für reimfinder.html

  Quellen (eine oder mehrere):
    --kaikki  kaikki.org-dictionary-German.jsonl(.gz)   Wiktionary-Auszug (CC BY-SA)
    --ipadict de.txt                                    ipa-dict / german-ipa-dict (CC BY-SA, Wiktionary-basiert)
    --freq    de_50k.txt                                optional: Häufigkeitsliste "wort anzahl" (z. B. FrequencyWords, CC BY-SA 4.0)

  Weitere Optionen:
    --out     lexikon-de.json.gz   (Endung .gz -> gzip-komprimiert; Standard: lexikon-de.json.gz)
    --html    reimfinder.html      (der Reim-Kern wird aus dieser Datei gelesen, damit Seite und Lexikon
                                    garantiert dieselbe Normalisierung verwenden; Standard: neben dem Skript)
    --max     200000               (nur die N häufigsten/kürzesten Wörter behalten)
    --ohne-bindestrich             (Wörter mit Bindestrich weglassen)

  Beispiel:
    node build_lexikon.mjs --kaikki kaikki.org-dictionary-German.jsonl --ipadict de.txt --freq de_50k.txt --out lexikon-de.json.gz

  Benötigt nur Node.js ≥ 18, keine Pakete.
*/
import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";
import readline from "node:readline";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));

// ---------- Argumente
const args = {};
for (let i = 2; i < process.argv.length; i++) {
  const a = process.argv[i];
  if (!a.startsWith("--")) continue;
  const k = a.slice(2);
  const v = process.argv[i + 1] && !process.argv[i + 1].startsWith("--") ? process.argv[++i] : true;
  (args[k] ??= []).push(v);
}
const one = (k, d) => (args[k] ? args[k][args[k].length - 1] : d);
if (!args.kaikki && !args.ipadict) {
  console.error("Bitte mindestens eine Quelle angeben: --kaikki <datei.jsonl[.gz]> und/oder --ipadict <de.txt>\n" +
    "Hilfe: siehe Kommentar am Anfang dieser Datei.");
  process.exit(1);
}
const OUT = one("out", "lexikon-de.json.gz");
const MAX = Number(one("max", 0)) || 0;
const NO_HYPHEN = !!one("ohne-bindestrich", false);

// ---------- Reim-Kern aus der HTML-Datei laden
function loadCore() {
  const kernFile = one("kern", null);
  let code;
  if (kernFile) code = fs.readFileSync(kernFile, "utf8");
  else {
    const htmlPath = one("html", path.join(here, "reimfinder.html"));
    if (!fs.existsSync(htmlPath)) {
      console.error(`reimfinder.html nicht gefunden (${htmlPath}). Lege das Skript neben die HTML-Datei oder nutze --html <pfad>.`);
      process.exit(1);
    }
    const html = fs.readFileSync(htmlPath, "utf8");
    const m = html.match(/<script id="reim-kern">([\s\S]*?)<\/script>/);
    if (!m) { console.error("Reim-Kern (<script id=\"reim-kern\">) in der HTML-Datei nicht gefunden."); process.exit(1); }
    code = m[1];
  }
  const ctx = { module: { exports: {} }, console };
  vm.createContext(ctx);
  vm.runInContext(code + "\n;module.exports = { IPA, G2P, RHYME, REIM_KERN_VERSION };", ctx);
  return ctx.module.exports;
}
const { IPA, REIM_KERN_VERSION } = loadCore();

// ---------- Hilfen
function openLines(file) {
  let stream = fs.createReadStream(file);
  if (file.endsWith(".gz")) stream = stream.pipe(zlib.createGunzip());
  return readline.createInterface({ input: stream, crlfDelay: Infinity });
}
const POS_MAP = {
  noun: "N", name: "N", verb: "V", adj: "A", adv: "S", pron: "S", prep: "S", conj: "S", intj: "S", num: "S", det: "S",
  article: "S", particle: "S", phrase: "S", prep_phrase: "S", proverb: "S", contraction: "S", abbrev: "S", postp: "S", adj_noun: "A"
};
const SKIP_POS = new Set(["suffix", "prefix", "infix", "affix", "interfix", "circumfix", "character", "symbol", "punct", "letter", "root"]);
const WORD_OK = /^[\p{L}][\p{L}'’.\-]*$/u;

/** word -> { ipa:Set(norm), pos:string|null, posGuess, flex, freq } */
const lex = new Map();
function entry(word) {
  let e = lex.get(word);
  if (!e) { e = { ipa: new Set(), pos: null, flex: false, freq: 0 }; lex.set(word, e); }
  return e;
}
function addIpa(e, raw) {
  for (const v of IPA.splitVariants(raw)) {
    const p = IPA.parse(v);
    if (p.S > 0) e.ipa.add(p.norm);
    if (e.ipa.size >= 3) break;
  }
}

// ---------- kaikki.org (Wiktionary)
async function readKaikki(file) {
  let n = 0, used = 0;
  for await (const line of openLines(file)) {
    if (!line.trim()) continue;
    n++;
    let o;
    try { o = JSON.parse(line); } catch { continue; }
    if (o.lang_code && o.lang_code !== "de") continue;
    const w = o.word;
    if (!w || !WORD_OK.test(w) || SKIP_POS.has(o.pos)) continue;
    if (NO_HYPHEN && w.includes("-")) continue;
    const ipas = (o.sounds || []).map((s) => s.ipa).filter(Boolean);
    const senses = o.senses || [];
    const isForm = senses.length > 0 && senses.every((s) => s.form_of || (s.tags || []).includes("form-of"));
    if (!ipas.length) continue;
    const e = entry(w);
    for (const ipa of ipas) addIpa(e, ipa);
    if (!e.pos && POS_MAP[o.pos]) e.pos = POS_MAP[o.pos];
    if (isForm) e.flex = true;
    e.k = true;
    used++;
    if (n % 100000 === 0) process.stdout.write(`\r  kaikki: ${n.toLocaleString("de-DE")} Zeilen gelesen …`);
  }
  console.log(`\r  kaikki: ${n.toLocaleString("de-DE")} Zeilen, ${used.toLocaleString("de-DE")} mit IPA übernommen.`);
}

// ---------- ipa-dict (TSV: wort<TAB>/ipa/, /ipa/)
async function readIpaDict(file) {
  let n = 0;
  for await (const line of openLines(file)) {
    const tab = line.indexOf("\t");
    if (tab < 0) continue;
    const w = line.slice(0, tab).trim();
    if (!WORD_OK.test(w) || (NO_HYPHEN && w.includes("-"))) continue;
    const e = entry(w);
    if (e.ipa.size === 0) addIpa(e, line.slice(tab + 1));
    n++;
  }
  console.log(`  ipa-dict: ${n.toLocaleString("de-DE")} Einträge gelesen.`);
}

// ---------- Häufigkeiten
async function readFreq(file) {
  const f = new Map();
  for await (const line of openLines(file)) {
    const parts = line.trim().split(/\s+/);
    if (parts.length < 2) continue;
    const cnt = Number(parts[parts.length - 1]);
    const w = parts.length === 3 && /^\d+$/.test(parts[0]) ? parts[1] : parts[0]; // auch Leipzig-Format "id wort anzahl"
    if (!Number.isFinite(cnt)) continue;
    const k = w.toLowerCase();
    f.set(k, (f.get(k) || 0) + cnt);
  }
  console.log(`  Häufigkeiten: ${f.size.toLocaleString("de-DE")} Wortformen.`);
  return f;
}

function guessPos(w) {
  if (w[0] !== w[0].toLowerCase()) return "N";
  if (/(ig|lich|isch|bar|sam|haft|los|voll)(e|er|en|em|es|ere|eren|erer|eres|erem|ste|sten|ster|stes|stem)?$/.test(w)) return "A";
  if (/[^e](en|ern|eln)$/.test(w)) return "V";
  return "S";
}
function guessFlex(w) {
  const lower = w[0] === w[0].toLowerCase();
  const has = (x) => lex.has(x);
  for (const end of ["en", "ern", "er", "es", "em", "e", "n", "s"]) {
    if (w.length > end.length + 2 && w.endsWith(end)) {
      const b = w.slice(0, -end.length);
      if (has(b) && !(lower && end === "en")) return true;
    }
  }
  if (lower) for (const end of ["st", "t", "te", "test", "tet", "ten", "est", "et"]) {
    if (w.length > end.length + 2 && w.endsWith(end) && has(w.slice(0, -end.length) + "en")) return true;
  }
  return false;
}

// ---------- Ablauf
const t0 = Date.now();
console.log("Reimfinder-Lexikon wird erstellt …");
for (const f of args.kaikki || []) await readKaikki(f);
for (const f of args.ipadict || []) await readIpaDict(f);
const freq = args.freq ? await readFreq(args.freq[0]) : null;

const quellen = [];
if (args.kaikki) quellen.push({ name: "Wiktionary über kaikki.org (wiktextract)", url: "https://kaikki.org/dictionary/German/", lizenz: "CC BY-SA 4.0 / GFDL" });
if (args.ipadict) quellen.push({ name: "ipa-dict (open-dict-data) / german-ipa-dict, Wiktionary-basiert", url: "https://github.com/open-dict-data/ipa-dict", lizenz: "CC BY-SA" });
if (freq) quellen.push({ name: "Häufigkeitsliste (z. B. FrequencyWords, OpenSubtitles)", url: "https://github.com/hermitdave/FrequencyWords", lizenz: "CC BY-SA 4.0" });

let rows = [];
for (const [w, e] of lex) {
  if (!e.ipa.size) continue;
  let pos = e.pos, flags = 0;
  if (!pos) { pos = guessPos(w); flags |= 2; }
  if (e.flex || (!e.k && guessFlex(w))) flags |= 1;
  const fq = freq ? freq.get(w.toLowerCase()) || 0 : 0;
  const ipas = [...e.ipa];
  const keys = ipas.map((n) => { const p = IPA.parse(n, true); return IPA.stableCode(p.code) ? p.code + "," + p.lst : ""; });
  rows.push([w, ipas.join("|"), pos, flags, fq, keys.join("|")]);
}
if (MAX && rows.length > MAX) {
  rows.sort((a, b) => b[4] - a[4] || a[0].length - b[0].length);
  rows = rows.slice(0, MAX);
}
rows.sort((a, b) => (a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0));

const out = {
  format: "reimfinder-lexikon",
  version: 1,
  kern: REIM_KERN_VERSION,
  erstellt: new Date().toISOString().slice(0, 10),
  quellen,
  hinweis: "Felder: [Wort, normalisierte IPA (Varianten mit |), Wortart N/V/A/S, Flags (1 = Flexionsform, 2 = Wortart geschätzt), Häufigkeit, Reimschlüssel je Variante als 'Lautcode,letzteBetonteSilbe']. Lizenz der Daten: CC BY-SA, Quellen siehe 'quellen'.",
  felder: ["wort", "ipa", "wortart", "flags", "haeufigkeit", "schluessel"],
  anzahl: rows.length,
  eintraege: rows
};
let data = Buffer.from(JSON.stringify(out));
if (OUT.endsWith(".gz")) data = zlib.gzipSync(data, { level: 9 });
fs.writeFileSync(OUT, data);
const mb = (data.length / 1048576).toFixed(1);
console.log(`Fertig: ${rows.length.toLocaleString("de-DE")} Wörter -> ${OUT} (${mb} MB) in ${((Date.now() - t0) / 1000).toFixed(0)} s.`);
