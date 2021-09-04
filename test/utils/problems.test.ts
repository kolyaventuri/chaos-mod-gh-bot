import test from 'ava';
import {overUsedEffects} from '../../src/constants/issues';

import {getIssueProblems, IssueProblem} from '../../src/utils/issue/problems';
import {IssueType} from '../../src/utils/issue/type';

test('with a good title, body, and type, returns empty array', t => {
  const result = getIssueProblems({
    title: '[Effect Suggestion] Test Effect',
    body: 'some body without overused',
    type: IssueType.EFFECT
  });
  t.deepEqual(result, []);
});

test('if the effect title was not changed, adds DEFAULT_TITLE', t => {
  const result = getIssueProblems({
    title: '[Effect Suggestion] My Super Cool Effect Idea',
    body: 'body',
    type: IssueType.EFFECT
  });
  t.deepEqual(result, [IssueProblem.DEFAULT_TITLE]);
});

test('if the feature title was not changed, adds DEFAULT_TITLE', t => {
  const result = getIssueProblems({
    title: '[Feature Suggestion] My Neat Feature',
    body: 'body',
    type: IssueType.FEATURE
  });
  t.deepEqual(result, [IssueProblem.DEFAULT_TITLE]);
});

test('if the bug title was not changed, adds DEFAULT_TITLE', t => {
  const result = getIssueProblems({
    title: '[Bug] My Nasty Bug',
    body: 'body',
    type: IssueType.BUG
  });
  t.deepEqual(result, [IssueProblem.DEFAULT_TITLE]);
});

test('if the effect references something in the overused effects list, add OVERUSED_EFFECT to the status', t => {
  for (const item of overUsedEffects) {
    const result = getIssueProblems({
      title: '[Effect Suggestion] Some name',
      body: `an effect with ${item}`,
      type: IssueType.EFFECT
    });
    t.deepEqual(result, [IssueProblem.OVERUSED_EFFECT], `Failed for "${item}". Did not return OVERUSED_EFFECT.`);
  }
});

test('if the effect is missing the [Type] tag, adds MISSING_TAG', t => {
  const result = getIssueProblems({
    title: 'Some idea',
    body: 'Some body',
    type: IssueType.EFFECT
  });

  t.deepEqual(result, [IssueProblem.MISSING_TAG]);
});

test('if the effect has the wrong tag, adds BAD_TAG', t => {
  const result = getIssueProblems({
    title: '[Effect Suggestion] Some effect',
    body: 'Some body',
    type: IssueType.FEATURE
  });

  t.deepEqual(result, [IssueProblem.BAD_TAG]);
});

test('if the effect has a random or malformed tag, adds BAD_TAG', t => {
  const result = getIssueProblems({
    title: '[Effect] Some effect',
    body: 'Some body',
    type: IssueType.EFFECT
  });

  t.deepEqual(result, [IssueProblem.BAD_TAG]);
});
