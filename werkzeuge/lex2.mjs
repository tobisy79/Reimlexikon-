// Ergänzt das Lexikon um Wiktionary-Aussprachen aus WikiPron (fehlende Wörter), Betonung aus Lexikon-Teilen bzw. G2P.
import fs from "node:fs"; import zlib from "node:zlib";
import { IPA, G2P } from "./core.mjs";
const SP = "/tmp/claude-0/-home-user/7ca5be93-23ec-59fa-9399-b1e168aa0294/scratchpad";
const WP = "/tmp/claude-0/-home-user-reimlexikon-/7ca5be93-23ec-59fa-9399-b1e168aa0294/scratchpad/dl2/wikipron/data/scrape/tsv/deu_latn_broad.tsv";
const L = JSON.parse(zlib.gunzipSync(fs.readFileSync(SP + "/out/lexikon-de.json.gz")).toString("utf8"));
const lex = new Map();
for (const e of L.eintraege) { if (!lex.has(e[0])) lex.set(e[0], e); if (!lex.has(e[0].toLowerCase())) lex.set(e[0].toLowerCase(), e); }
const look = (w) => lex.get(w) || lex.get(w.toLowerCase()) || lex.get(w[0].toUpperCase() + w.slice(1));
function stressFor(w, S) {
  // rechter Kopf: längstes bekanntes Endstück (mind. 3 Buchstaben), links mind. 2 Buchstaben
  for (let i = 2; i <= w.length - 3; i++) {
    const right = w.slice(i), h = look(right);
    if (!h) continue;
    const ph = IPA.parse(h[1].split("|")[0], true);
    const nl = S - ph.S; if (nl < 1) continue;
    const left = w.slice(0, i), lh = look(left) || look(left.replace(/(s|es|n|en|er|e)$/, ""));
    let ls = null;
    if (lh) { const pl = IPA.parse(lh[1].split("|")[0], true); if (pl.S === nl) ls = pl.stress; }
    if (!ls) { const g = G2P.word(left); if (g) { const pl = IPA.parse(g); if (pl.S === nl) ls = pl.stress; } }
    if (!ls) { ls = new Array(nl).fill(0); ls[0] = 1; }
    return [...ls, ...ph.stress.map((x) => (x ? 2 : 0))];
  }
  const g = G2P.word(w); if (!g) return null;
  const pg = IPA.parse(g); return pg.S === S ? pg.stress : null;
}
const have = new Set(L.eintraege.map((e) => e[0]));
const add = new Map(); let skip = 0;
for (const line of fs.readFileSync(WP, "utf8").split("\n")) {
  const t = line.indexOf("\t"); if (t < 0) continue;
  const w = line.slice(0, t), ip = line.slice(t + 1).replace(/ /g, "");
  if (have.has(w) || have.has(w.toLowerCase()) || /[\d'.]/.test(w) || w.length < 2) continue;
  const p = IPA.parse(ip); if (!p.S) { skip++; continue; }
  const st = stressFor(w, p.S); if (!st) { skip++; continue; }
  const norm = IPA.render(p.toks, p.starts, st);
  const prev = add.get(w);
  if (prev) { if (!prev[1].split("|").includes(norm) && prev[1].split("|").length < 3) prev[1] += "|" + norm; continue; }
  const pos = w[0] !== w[0].toLowerCase() ? "N" : /(ig|lich|isch|bar|sam|haft|los)(e|er|en|em|es)?$/.test(w) ? "A" : /[^e](en|ern|eln)$/.test(w) ? "V" : "S";
  add.set(w, [w, norm, pos, 2, 0]);
}
console.log("neu", add.size, "übersprungen", skip);
const ex = [...add.values()]; console.log(ex.slice(0, 5).map((e) => e.join(" ")).join("\n"), "\n", ex.filter((e) => /pastete|prospekt|Fahrrad/.test(e[0])).map((e) => e.join(" ")).join("\n"));
L.eintraege.push(...ex);
L.eintraege.sort((a, b) => (a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0));
L.anzahl = L.eintraege.length; L.erstellt = "2026-11-09";
L.quellen.push({ name: "WikiPron (Wiktionary-Aussprachen, Stand der Abfrage im WikiPron-Repo)", url: "https://github.com/CUNY-CL/wikipron", lizenz: "CC BY-SA (Wiktionary)" });
fs.writeFileSync(SP + "/out/lexikon-de.json.gz", zlib.gzipSync(JSON.stringify(L), { level: 9 }));
console.log("gesamt", L.anzahl, fs.statSync(SP + "/out/lexikon-de.json.gz").size);
