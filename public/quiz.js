export const getCorrectAnswers = q => Array.isArray(q.answer) ? [...q.answer].sort((a,b)=>a-b) : [q.answer];
export function gradeQuiz(questions, answers) {
  const results = questions.map((q,i)=>{
    const raw = answers[i];
    const selected = raw === null || raw === undefined ? [] : Array.isArray(raw) ? [...raw] : [raw];
    selected.sort((a,b)=>a-b);
    const expected = getCorrectAnswers(q);
    const valid = selected.every(x=>Number.isInteger(x)&&x>=0&&x<q.options.length) && new Set(selected).size===selected.length;
    return {selected,expected,unanswered:selected.length===0,correct:valid&&selected.length===expected.length&&selected.every((x,j)=>x===expected[j])};
  });
  return {results,score:results.filter(r=>r.correct).length,unanswered:results.flatMap((r,i)=>r.unanswered?[i]:[])};
}
