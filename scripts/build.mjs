import {rm,mkdir,cp,readFile} from 'node:fs/promises';
const lessons=JSON.parse(await readFile('public/lessons.json','utf8'));
if(lessons.length!==12)throw Error('12 lessons required');
const ids=new Set();
for(const l of lessons){if(ids.has(l.id))throw Error('duplicate id');ids.add(l.id);if(!l.title||!l.goal||l.sections.length<3||l.flow.length<3||!l.example||!l.action||l.quiz.length!==3)throw Error(`Incomplete lesson ${l.id}`);for(const q of l.quiz){if(q.options.length!==3||!Number.isInteger(q.answer)||q.answer<0||q.answer>=q.options.length||!q.explanation)throw Error('Invalid quiz');}}
await rm('dist',{recursive:true,force:true});await mkdir('dist',{recursive:true});await cp('public','dist',{recursive:true});console.log('Built: 12 lessons, 36 validated questions.');
