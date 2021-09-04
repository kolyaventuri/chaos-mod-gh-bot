import test from 'ava';
import {overUsedEffects} from '../../src/constants/issues';

import {getIssueProblems, IssueProblem} from '../../src/utils/issue/problems';

test('with a good title and body, returns empty array', t => {
  const result = getIssueProblems('[Effect Suggestion] Test Effect', 'some body without overused');
  t.deepEqual(result, []);
});

test('if the effect title was not changed, adds DEFAULT_TITLE', t => {
  const result = getIssueProblems('[Effect Suggestion] My Super Cool Effect Idea', 'body');
  t.deepEqual(result, [IssueProblem.DEFAULT_TITLE]);
});

test('if the feature title was not changed, adds DEFAULT_TITLE', t => {
  const result = getIssueProblems('[Feature Suggestion] My Neat Feature', 'body');
  t.deepEqual(result, [IssueProblem.DEFAULT_TITLE]);
});

test('if the bug title was not changed, adds DEFAULT_TITLE', t => {
  const result = getIssueProblems('[Bug] My Nasty Bug', 'body');
  t.deepEqual(result, [IssueProblem.DEFAULT_TITLE]);
});

test('if the effect references something in the overused effects list, add OVERUSED_EFFECT to the status', t => {
  for (const item of overUsedEffects) {
    const result = getIssueProblems('[Effect Suggestion] Some name', `an effect with ${item}`);
    t.deepEqual(result, [IssueProblem.OVERUSED_EFFECT], `Failed for "${item}". Did not return OVERUSED_EFFECT.`);
  }
});
