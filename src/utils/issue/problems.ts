import {defaultTitles, overUsedEffects} from '../../constants/issues';
import {IssueType} from './type';

export const enum IssueProblem {
  DEFAULT_TITLE = 'DEFAULT_TITLE',
  MISSING_TAG = 'MISSING_TAG',
  BAD_TAG = 'BAD_TAG',
  OVERUSED_EFFECT = 'OVERUSED_EFFECT',
  CONTENT_CREATOR = 'CONTENT_CREATOR',
}

interface GetIssueProblemsArgs {
  title: string;
  body: string;
  type: IssueType;
}

const tagRegex = /^\[(.+)]/i;

export const getIssueProblems = ({title, body, type}: GetIssueProblemsArgs): IssueProblem[] => {
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

  // Check the type against the tag
  const match = tagRegex.exec(title) ?? [];
  const tag = match[1];
  let isBadTag = false;
  if (tag) {
    switch (tag) {
      case 'effect suggestion':
        isBadTag = type !== IssueType.EFFECT;
        break;
      case 'feature suggestion':
        isBadTag = type !== IssueType.FEATURE;
        break;
      case 'bug':
        isBadTag = type !== IssueType.BUG;
        break;
      default:
        isBadTag = true;
    }
  } else {
    statuses.push(IssueProblem.MISSING_TAG);
  }

  if (isBadTag) {
    statuses.push(IssueProblem.BAD_TAG);
  }

  return Array.from(new Set<IssueProblem>(statuses));
};
