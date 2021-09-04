import {IssueType, Label} from './types';

// TODO: Add method that can take the list of issue tags, and return the proper enum type
// the return likely needs to be IssueType | null, in the event that we have a missing tag?
// That probably needs to be later handled in the problems.ts file
const labelMap: Record<string, IssueType> = {
  'effect suggestion': IssueType.EFFECT,
  'feature request': IssueType.FEATURE,
  bug: IssueType.BUG,
};

export const getIssueType = (labels: Label[]): IssueType => {
  for (const label of labels) {
    const name = label.name.toLowerCase();
    const type = labelMap[name];

    if (type) {
      return type;
    }
  }

  return IssueType.UNKNOWN;
};
