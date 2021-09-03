import test from 'ava';
import { overUsedEffects } from '../../src/constants/issues';

import {getIssueStatus, IssueStatus} from '../../src/utils/issue-status';

test('with a good title, returns GOOD', t => {
  const result = getIssueStatus('[Effect Suggestion] Test Effect', 'some body without overused');
  t.deepEqual(result, [IssueStatus.GOOD]);
});

test('if the effect title was not changed, adds BAD_TITLE', t => {
  const result = getIssueStatus('[Effect Suggestion] My Super Cool Effect Idea', 'body');
  t.deepEqual(result, [IssueStatus.BAD_TITLE]);
});

test('if the feature title was not changed, adds BAD_TITLE', t => {
  const result = getIssueStatus('[Feature Suggestion] My Neat Feature', 'body');
  t.deepEqual(result, [IssueStatus.BAD_TITLE]);
});

test('if the bug title was not changed, adds BAD_TITLE', t => {
  const result = getIssueStatus('[Bug] My Nasty Bug', 'body');
  t.deepEqual(result, [IssueStatus.BAD_TITLE]);
});

test('if the effect references something in the overused effects list, add OVERUSED_EFFECT to the status', t => {
  for (const item of overUsedEffects) {
    const result = getIssueStatus('[Effect Suggestion] Some name', `an effect with ${item}`);
    t.deepEqual(result, [IssueStatus.OVERUSED_EFFECT], `Failed for "${item}". Did not return OVERUSED_EFFECT.`);
  }
});
