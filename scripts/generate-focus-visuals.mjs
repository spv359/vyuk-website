import { createRequire } from "node:module";
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const React = require("react");
const { renderToStaticMarkup } = require("react-dom/server");
const { MessageSquare, Store, Megaphone, Mail, MousePointerClick, WalletCards, FileText, Check, ArrowRight, BookOpen, Tags } = require("lucide-react");

const ink = "#173e42";
const orange = "#bc4617";
const pale = "#dae5dd";
const icon = (Icon, x, y, size = 32, color = ink) => renderToStaticMarkup(React.createElement(Icon, { x, y, width: size, height: size, color, strokeWidth: 1.7, "aria-hidden": true }));
const rect = (x, y, width, height, fill = "#ffffff", radius = 16, extra = "") => `<rect x="${x}" y="${y}" width="${width}" height="${height}" rx="${radius}" fill="${fill}" ${extra}/>`;
const line = (x, y, width, color = pale, height = 8) => rect(x, y, width, height, color, height / 2);
const card = (x, y, width, height) => rect(x, y, width, height, "#fff", 20, 'stroke="#ccd9d1" filter="url(#shadow)"');
const svg = (title, body) => `<svg xmlns="http://www.w3.org/2000/svg" width="640" height="440" viewBox="0 0 640 440">
<title>${title}</title>
<defs>
  <linearGradient id="backdrop" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#edf3ee"/><stop offset="1" stop-color="#e2ebe3"/></linearGradient>
  <filter id="shadow" x="-25%" y="-25%" width="150%" height="170%"><feDropShadow dx="0" dy="10" stdDeviation="12" flood-color="#173e42" flood-opacity=".09"/></filter>
</defs>
${rect(1, 1, 638, 438, "url(#backdrop)", 26, 'stroke="#dce5dd"')}
<circle cx="526" cy="113" r="96" fill="#f8faf6" opacity=".65"/>
${body}
</svg>\n`;

const visuals = {
  "conversational-analytics": svg("Conversational analytics", `
${card(164, 116, 388, 254)}
${rect(164, 116, 388, 46, ink, 20)}${rect(164, 140, 388, 22, ink, 0)}
<circle cx="190" cy="140" r="4" fill="#aec9bd"/><circle cx="205" cy="140" r="4" fill="#aec9bd"/><circle cx="220" cy="140" r="4" fill="#aec9bd"/>
${line(194, 186, 123)}${line(194, 205, 74, "#e9eeea", 6)}
<path d="M206 325H507" stroke="#c4d3ca" stroke-width="2"/>
${rect(238, 270, 48, 55, "#adc5b7", 7)}${rect(316, 244, 48, 81, "#70958c", 7)}${rect(394, 218, 48, 107, orange, 7)}
${rect(70, 57, 282, 102, ink, 20, 'filter="url(#shadow)"')}
<path d="M111 153L111 177L143 154" fill="${ink}"/>
${icon(MessageSquare, 94, 85, 36, "#fff")}${line(149, 87, 159, "#eef4ef", 10)}${line(149, 112, 112, "#9bb6ad", 8)}
<circle cx="503" cy="313" r="27" fill="#ffe4d9"/>${icon(Check, 488, 298, 30, orange)}
`),
  "sales-throughput": svg("Outlet-specific sales recommendations", `
${card(67, 131, 345, 231)}
${rect(87, 208, 305, 133, "#f5f7f2", 3)}
${rect(97, 224, 120, 117, "#d3e1d8", 6)}${rect(239, 225, 128, 82, "#d3e1d8", 6)}
<path d="M257 235V296M291 235V296M325 235V296" stroke="#fff" stroke-width="3"/>
${rect(103, 97, 276, 58, ink, 13)}${icon(Store, 220, 108, 36, "#fff")}
<path d="M80 156H400L411 201H69Z" fill="#70958c"/>
<path d="M124 156H158L153 201H116Z M202 156H236L236 201H199Z M280 156H314L319 201H282Z M358 156H390L402 201H368Z" fill="#ebf1eb"/>
<circle cx="194" cy="286" r="4" fill="${ink}"/>
${rect(398, 68, 165, 302, ink, 28, 'filter="url(#shadow)"')}
${rect(409, 79, 143, 278, "#f9fbf8", 19)}${rect(456, 86, 48, 7, ink, 4)}
${line(429, 117, 86, "#c0d2c8", 7)}${line(429, 136, 58, "#e0e9e1", 6)}
${rect(423, 166, 115, 141, "#ffe4d9", 13)}
<circle cx="480" cy="203" r="22" fill="#fff"/>${icon(Check, 467, 190, 26, orange)}
${line(436, 241, 90, orange, 7)}${line(436, 260, 65, "#d99e82", 6)}${line(436, 277, 78, "#d99e82", 6)}
${rect(447, 323, 65, 6, "#d0dbd3", 3)}
`),
  "trade-scheme": svg("Trade scheme options for review", `
${rect(143, 67, 360, 306, "#cfdfd3", 20, 'transform="rotate(5 323 220)"')}
${card(132, 60, 360, 306)}
${icon(Tags, 157, 85, 34)}${line(209, 96, 172, "#96b2a4", 9)}
${rect(157, 151, 310, 49, "#f0f5ef", 11)}
<circle cx="182" cy="175" r="8" fill="none" stroke="#adc4b6" stroke-width="2"/>
${line(207, 171, 169, "#bacfc0", 8)}${line(402, 171, 40, "#bacfc0", 8)}
${rect(157, 215, 310, 58, "#ffe4d9", 11, 'stroke="#db9e81"')}
<circle cx="182" cy="244" r="11" fill="${orange}"/>${icon(Check, 173, 235, 18, "#fff")}
${line(207, 240, 190, orange, 8)}${line(418, 240, 24, "#d99e82", 8)}
${rect(157, 288, 310, 49, "#f0f5ef", 11)}
<circle cx="182" cy="312" r="8" fill="none" stroke="#adc4b6" stroke-width="2"/>
${line(207, 308, 140, "#bacfc0", 8)}${line(389, 308, 53, "#bacfc0", 8)}
`),
  "marketing-orchestration": svg("Coordinated digital marketing", `
<path d="M294 222H212Q178 222 178 180V123H141M351 222H465Q485 222 485 174V129M319 260V329" fill="none" stroke="#9bb6a9" stroke-width="3" stroke-linecap="round"/>
${card(73, 74, 142, 100)}${icon(FileText, 124, 102, 40)}
${card(429, 74, 142, 100)}${icon(Mail, 480, 102, 40)}
${card(250, 314, 142, 92)}${icon(MousePointerClick, 301, 340, 40)}
<circle cx="320" cy="225" r="78" fill="#fff" stroke="#ccd9d1" filter="url(#shadow)"/>
<circle cx="320" cy="225" r="62" fill="${ink}"/>${icon(Megaphone, 288, 193, 64, "#fff")}
<circle cx="379" cy="176" r="21" fill="${orange}"/>${icon(Check, 367, 164, 24, "#fff")}
`),
  "digital-spend": svg("Marketing spend connected to outcomes", `
${card(222, 83, 342, 278)}
${line(250, 112, 138)}${line(250, 134, 87, "#e5ece6", 6)}
<path d="M275 178V309H526" stroke="#c4d3ca" stroke-width="2" fill="none"/>
<path d="M296 284L344 261L391 274L438 223L501 186" fill="none" stroke="${ink}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
<circle cx="501" cy="186" r="8" fill="${orange}"/>
${rect(79, 223, 198, 137, ink, 22, 'filter="url(#shadow)"')}
${rect(211, 262, 76, 54, "#365c5c", 12)}<circle cx="237" cy="289" r="5" fill="#edf3ee"/>
${icon(WalletCards, 111, 254, 47, "#fff")}
<circle cx="140" cy="207" r="30" fill="#ffe4d9" stroke="#e3b9a4" stroke-width="2"/>
<circle cx="140" cy="207" r="19" fill="none" stroke="${orange}" stroke-width="2"/>
<path d="M136 196L136 218M144 196L144 218" stroke="${orange}" stroke-width="2" stroke-linecap="round"/>
`),
  "accounting-workflows": svg("Accounting workflow with review", `
${card(69, 92, 195, 256)}
${icon(FileText, 94, 118, 37)}${line(147, 127, 86, "#bed1c6", 8)}
${line(94, 182, 142)}${line(94, 207, 115)}${line(94, 232, 142)}
<path d="M94 269H237" stroke="#d4ded6" stroke-width="2"/>${line(166, 292, 70, "#72968c", 9)}
${card(377, 92, 196, 256)}
${icon(BookOpen, 405, 118, 36)}${line(457, 127, 86, "#bed1c6", 8)}
${rect(400, 176, 150, 136, "#f3f7f2", 10)}
<path d="M452 176V312M400 211H550M400 245H550M400 279H550" stroke="#cfddd2" stroke-width="2"/>
${line(466, 190, 64, "#adc8b8", 7)}${line(466, 225, 52, "#adc8b8", 7)}${line(466, 259, 64, "#adc8b8", 7)}${line(466, 293, 46, "#adc8b8", 7)}
<path d="M268 222H373" stroke="#9bb6a9" stroke-width="3"/>
<circle cx="320" cy="222" r="31" fill="${orange}"/>${icon(ArrowRight, 302, 204, 36, "#fff")}
<circle cx="548" cy="326" r="28" fill="#ffe4d9"/>${icon(Check, 533, 311, 30, orange)}
`),
  "financial-reporting": svg("Clear financial reporting", `
${rect(174, 55, 321, 315, "#cadbcf", 20, 'transform="rotate(7 334 214)"')}
${rect(156, 71, 321, 315, "#e2ebe2", 20, 'transform="rotate(-5 317 229)"')}
${card(151, 65, 337, 319)}
${icon(FileText, 176, 91, 34)}${line(228, 99, 158, "#96b2a4", 9)}${line(228, 120, 100, "#d9e4db", 6)}
<circle cx="241" cy="219" r="49" fill="none" stroke="#d5e2d8" stroke-width="22"/>
<circle cx="241" cy="219" r="49" fill="none" stroke="${ink}" stroke-width="22" stroke-dasharray="154 308" transform="rotate(-90 241 219)"/>
<circle cx="241" cy="219" r="49" fill="none" stroke="${orange}" stroke-width="22" stroke-dasharray="64 308" transform="rotate(90 241 219)"/>
${rect(338, 219, 27, 56, "#adc5b7", 5)}${rect(381, 195, 27, 80, "#70958c", 5)}${rect(424, 172, 27, 103, ink, 5)}
${line(179, 315, 109)}${line(311, 315, 139)}${line(179, 339, 82, "#e1e9e2", 6)}${line(311, 339, 111, "#e1e9e2", 6)}
`),
};

for (const [name, content] of Object.entries(visuals)) {
  writeFileSync(fileURLToPath(new URL(`../public/focus-${name}.svg`, import.meta.url)), content);
}
console.log(`Generated ${Object.keys(visuals).length} Areas of Focus illustrations.`);
