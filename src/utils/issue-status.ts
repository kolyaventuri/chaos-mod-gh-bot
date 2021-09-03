import {defaultTitles, overUsedEffects} from '../constants/issues';

export const enum IssueStatus {
  GOOD = 'GOOD',
  BAD_TITLE = 'BAD_TITLE',
  OVERUSED_EFFECT = 'OVERUSED_EFFECT',
  CONTENT_CREATOR = 'CONTENT_CREATOR'
};

export const getIssueStatus = (title: string, body: string): Array<IssueStatus> => {
  const statuses: Array<IssueStatus> = [];

  // Check for default titles
  if (defaultTitles.includes(title.trim())) {
    statuses.push(IssueStatus.BAD_TITLE);
  }

  // Check for overused effects
  const lowercased = body.toLowerCase();
  for (const effect of overUsedEffects) {
    if (lowercased.indexOf(effect) > -1) {
      statuses.push(IssueStatus.OVERUSED_EFFECT);
    }
  }

  if (statuses.length > 0) {
    return Array.from(new Set<IssueStatus>(statuses));
  }

  return [IssueStatus.GOOD];
};
