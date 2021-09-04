import {defaultTitles, overUsedEffects} from '../../constants/issues';

export const enum IssueProblem {
  DEFAULT_TITLE = 'DEFAULT_TITLE',
  MISSING_TAG = 'MISSING_TAG',
  OVERUSED_EFFECT = 'OVERUSED_EFFECT',
  CONTENT_CREATOR = 'CONTENT_CREATOR',
}

export const getIssueProblems = (title: string, body: string): IssueProblem[] => {
  title = title.toLowerCase();
  body = body.toLowerCase();

  const statuses: IssueProblem[] = [];

  // Check for default titles
  if (defaultTitles.includes(title.trim())) {
    statuses.push(IssueProblem.DEFAULT_TITLE);
  }

  // Check for overused effects
  for (const effect of overUsedEffects) {
    if (body.includes(effect)) {
      statuses.push(IssueProblem.OVERUSED_EFFECT);
    }
  }

  return Array.from(new Set<IssueProblem>(statuses));
};
