// Udemy Practice Test Question Extractor
// Usage: paste into browser console or run via javascript_tool on the quiz page

function cleanText(text) {
  return (text || '').replace(/\s+/g, ' ').trim();
}

window.extractCurrentQuestion = function() {
  const region = [...document.querySelectorAll('[role="region"]')].find(el =>
    el.getAttribute('aria-label')?.includes('Question content')
  );
  if (!region) return null;

  // Question number
  const titleEl = region.querySelector('[class*="question-title"]');
  const questionNumMatch = (titleEl?.innerText || region.innerText || '').match(/Question (\d+)/);
  const questionNum = questionNumMatch ? `Question ${questionNumMatch[1]}` : '';

  // Question text
  const questionBody = region.querySelector('[class*="rt-scaffolding"]');
  const questionText = cleanText(questionBody?.innerText);

  // Answered format: result panes
  const outerPanes = [...region.querySelectorAll('[class*="result-pane--answer-result-pane"]')];
  if (outerPanes.length > 0) {
    const options = outerPanes.map((el, i) => {
      const body = el.querySelector('[class*="answer-body"]');
      return { label: String.fromCharCode(65 + i), text: cleanText(body?.innerText) };
    });
    return { questionNum, questionText, options };
  }

  // Unanswered format: labels (radio buttons)
  const choiceLabels = [...region.querySelectorAll('label')];
  if (choiceLabels.length > 0) {
    const options = choiceLabels.map((el, i) => ({
      label: String.fromCharCode(65 + i),
      text: cleanText(el.innerText)
    }));
    return { questionNum, questionText, options };
  }

  return { questionNum, questionText, options: [] };
};

// Clicks next/skip via the React fiber onClick handler directly.
// .click() and dispatchEvent(MouseEvent) both fail because Udemy checks event.isTrusted.
// Calling the React prop directly bypasses the DOM event system and always works.
window.clickNext = async function(currentQuestionNum) {
  const btn = [...document.querySelectorAll('button')].find(b =>
    b.innerText.trim() === 'Next question' || b.innerText.trim().includes('Skip question')
  );
  if (!btn) return null;

  const fiberKey = Object.keys(btn).find(k => k.startsWith('__reactFiber') || k.startsWith('__reactInternalInstance'));
  const fiber = btn[fiberKey];
  // onClick can live on the native button fiber, its parent Button component, or onTouchStart
  const onClick = fiber?.pendingProps?.onClick
    || fiber?.return?.pendingProps?.onClick
    || fiber?.pendingProps?.onTouchStart;
  if (!onClick) return null;

  onClick({ preventDefault: () => {}, stopPropagation: () => {}, target: btn, currentTarget: btn });

  // Poll every 200ms until the question number changes, timeout after 5s
  for (let i = 0; i < 25; i++) {
    await new Promise(r => setTimeout(r, 200));
    const q = window.extractCurrentQuestion();
    if (q?.questionNum && q.questionNum !== currentQuestionNum) return q.questionNum;
  }

  console.log(`Warning: page did not advance from ${currentQuestionNum} within 5s`);
  return null;
};

window.collectAllQuestions = async function(total = 65) {
  window.allQuestions = [];

  for (let i = 0; i < total; i++) {
    await new Promise(r => setTimeout(r, 800));

    const q = window.extractCurrentQuestion();
    if (q && q.questionText) {
      window.allQuestions.push(q);
      console.log(`Collected: ${q.questionNum} (${window.allQuestions.length}/${total})`);
    } else {
      console.log(`Warning: empty extract at step ${i + 1}`);
    }

    if (i < total - 1) {
      const next = await window.clickNext(q?.questionNum);
      if (!next) { console.log('Stuck or no button at step', i + 1, '— stopping'); break; }
    }
  }

  // Deduplicate (safety net)
  const seen = new Set();
  window.allQuestions = window.allQuestions.filter(q => {
    if (!q.questionNum || q.options.length === 0 || seen.has(q.questionNum)) return false;
    seen.add(q.questionNum);
    return true;
  });

  console.log(`Done! Collected ${window.allQuestions.length} unique questions.`);
  return window.allQuestions.length;
};

window.downloadQuestions = function(filename = 'questions.json') {
  const json = JSON.stringify(window.allQuestions.map(q => ({
    questionNum: q.questionNum,
    questionText: q.questionText,
    options: q.options.map(o => ({ label: o.label, text: o.text }))
  })), null, 2);

  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  console.log(`Downloaded ${filename}`);
};

// To run: collectAllQuestions(65).then(() => downloadQuestions('practice-test-2.json'))
