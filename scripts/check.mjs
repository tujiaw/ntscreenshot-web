import {readFile,access} from 'node:fs/promises';
import assert from 'node:assert/strict';
const html=await readFile('public/index.html','utf8');
for(const match of html.matchAll(/(?:src|href)="(\/[^"#]+)"/g))await access('public'+match[1]);
const script=await readFile('public/app.js','utf8');for(const name of ['capture.png','settings.png','search.png','search-live.png','assistant.png'])await access('public/assets/'+name);
for(const id of ['features','workflow','faq','download','image-dialog'])assert(html.includes(`id="${id}"`));
assert(script.includes('https://api.github.com/repos/tujiaw/ntscreenshot/releases/latest'));
console.log('Static assets, section anchors and official release integration verified.');
