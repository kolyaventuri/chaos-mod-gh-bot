import {getIssueProblems, IssueProblem} from './problems';

export const enum IssueStatus {
  GOOD = 'GOOD',
  BAD = 'BAD',
}

export interface IssueDetails {
  problems: IssueProblem[];
  status: IssueStatus;
}

export const getIssueDetails = (title: string, body: string): IssueDetails => {
  const problems = getIssueProblems(title, body);

  let status: IssueStatus = IssueStatus.GOOD;
  if (problems.length > 0) {
    status = IssueStatus.BAD;
  }

  return {
    problems,
    status,
  };
};
