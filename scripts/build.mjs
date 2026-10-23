import {rm,mkdir,cp,readFile} from 'node:fs/promises';
const lessons=JSON.parse(await readFile('public/lessons.json','utf8'));
if(lessons.length!==12)throw Error('12 lessons required');
const ids=new Set();let questions=0;
for(const l of lessons){
 if(ids.has(l.id)||!Number.isInteger(l.id)||l.id<1||l.id>12)throw Error('Invalid lesson id');ids.add(l.id);
 if(!l.title||!l.goal||l.sections.length<3||l.flow.length<3||!l.example||!l.action||!l.minutes||!Number.isInteger(l.revision)||!l.securityConnection||l.summary?.length<3||!l.updatedAt||l.quiz.length!==(l.id===12?10:5))throw Error(`Incomplete lesson ${l.id}`);
 for(const q of l.quiz){
  const expected=Array.isArray(q.answer)?q.answer:[q.answer];
  if(!q.question||!['single','multiple','boolean'].includes(q.type)||q.options.length<2||q.options.length>4||!q.explanation||q.optionReasons?.length!==q.options.length||q.optionReasons.some(r=>!r))throw Error(`Invalid quiz in lesson ${l.id}`);
  if(expected.length<1||new Set(expected).size!==expected.length||expected.some(v=>!Number.isInteger(v)||v<0||v>=q.options.length)||(q.type!=='multiple'&&expected.length!==1)||(q.type==='multiple'&&!Array.isArray(q.answer))||(q.type==='boolean'&&q.options.length!==2))throw Error('Invalid answer');
 }
 for(const q of l.cases||[]){if(q.options.length<3||!Number.isInteger(q.answer)||q.answer<0||q.answer>=q.options.length||!q.explanation)throw Error('Invalid case');}
 for(const d of l.diagrams||[]){if(!d.title||!d.caption||d.steps.length<3)throw Error('Incomplete diagram');}
 if(l.syncDemo&&(l.syncDemo.length!==4||l.syncDemo.some(s=>!s.label||!s.device||!s.cloud||!s.backup||!s.description)))throw Error('Invalid sync exercise');
 for(const t of l.tables||[]){if(t.rows.some(r=>r.length!==t.headers.length))throw Error('Table shape mismatch');}
 questions+=l.quiz.length;
}
await rm('dist',{recursive:true,force:true});await mkdir('dist',{recursive:true});await cp('public','dist',{recursive:true});console.log(`Built: ${lessons.length} lessons, ${questions} validated questions and ${lessons.reduce((n,l)=>n+(l.cases?.length||0),0)} practice cases.`);
