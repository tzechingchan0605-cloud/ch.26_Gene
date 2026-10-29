import {readFileSync,writeFileSync} from 'node:fs';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const code=['model.js','i18n.js','app.js'].map(p=>read(p).replace(/^import .*;\n/gm,'').replace(/\bexport (?=(const|function) )/g,'')).join('\n');
writeFileSync(new URL('../offline.html',import.meta.url),'<!doctype html><html lang="zh-HK"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Gene Lab</title><style>'+read('style.css')+'</style></head><body><div id="app"></div><script>'+code.replaceAll('</script','<\\/script')+'</script></body></html>');
console.log('Built offline.html: self-contained, no server or network required.');
