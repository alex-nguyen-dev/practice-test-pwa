/**
 * Udemy Results Page Extractor
 *
 * Run on a completed test results page. Outputs a file ready to drop into src/data/sets/.
 *
 * Usage:
 *   extractResults('aws-ai-scraped-practitioner-test-1', 'AWS AI Practitioner', 'Scraped Practitioner Test 1', 'scraped-aws-ai-practitioner-test-1.json')
 */

function cleanText(text) {
  return (text || '').replace(/\s+/g, ' ').trim();
}

function parseExplanations(expEl, choices) {
  if (!expEl) return;

  const paragraphs = [...expEl.querySelectorAll('p')].map(p => cleanText(p.innerText)).filter(Boolean);
  const strongTexts = new Set([...expEl.querySelectorAll('strong')].map(s => s.innerText.trim()));

  let mode = null;
  const correctNamedMap = {};
  let currentCorrectName = null;
  const correctGeneral = [];
  const incorrectMap = {};

  for (const para of paragraphs) {
    if (/^Correct option/.test(para)) { mode = 'correct'; continue; }
    if (/^Incorrect option/.test(para)) { mode = 'incorrect'; currentCorrectName = null; continue; }
    if (para === 'References:') break;

    if (mode === 'correct') {
      if (strongTexts.has(para)) {
        currentCorrectName = para;
        correctNamedMap[para] = [];
      } else if (currentCorrectName) {
        correctNamedMap[currentCorrectName].push(para);
      } else {
        correctGeneral.push(para);
      }
    } else if (mode === 'incorrect') {
      const dashIdx = para.indexOf(' - ');
      if (dashIdx > -1) {
        incorrectMap[para.substring(0, dashIdx).trim()] = cleanText(para.substring(dashIdx + 3));
      }
    }
  }

  choices.forEach(c => {
    if (c.correct) {
      const matchKey = Object.keys(correctNamedMap).find(k =>
        c.text.includes(k) || k.includes(c.text.substring(0, 20))
      );
      c.explanation = cleanText(
        matchKey
          ? [matchKey, ...correctNamedMap[matchKey]].join(' ')
          : correctGeneral.join(' ')
      );
    } else {
      const matchKey = Object.keys(incorrectMap).find(k =>
        c.text.includes(k) || k.includes(c.text.substring(0, 20))
      );
      if (matchKey) c.explanation = incorrectMap[matchKey];
    }
  });
}

window.extractResults = function (id, collection, title, filename) {
  const CHOICE_LABELS = ['a', 'b', 'c', 'd', 'e', 'f'];

  const questions = [...document.querySelectorAll('[class*="question-result-pane-wrapper"]')]
    .map((pane, qIdx) => {
      const questionEl = pane.querySelector('[class*="question-format"]');
      const questionText = cleanText(questionEl ? questionEl.innerText : '');

      const choices = [...pane.querySelectorAll('[class*="result-pane--answer-result-pane"]')]
        .map((el, cIdx) => ({
          id: CHOICE_LABELS[cIdx] || String(cIdx),
          text: cleanText((el.querySelector('[class*="answer-body"]') || {}).innerText),
          correct: !!el.querySelector('[class*="answer-correct"]'),
          explanation: '',
        }));

      parseExplanations(pane.querySelector('[class*="overall-explanation"]'), choices);

      return { id: `q${qIdx + 1}`, question: questionText, choices };
    });

  const result = { id, collection, title, questions };

  const blob = new Blob([JSON.stringify(result, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();

  console.log(`Done! Extracted ${questions.length} questions → ${filename}`);
  return `${questions.length} questions extracted`;
};
