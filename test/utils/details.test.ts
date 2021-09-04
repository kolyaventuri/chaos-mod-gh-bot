import test from 'ava';
import proxyquire from 'proxyquire';
import {stub} from 'sinon';
import {getIssueDetails as realIssueDetails, IssueStatus} from '../../src/utils/issue/details';

const getIssueProblems = stub().returns([]);
const {getIssueDetails} = proxyquire<{getIssueDetails: typeof realIssueDetails}>('../../src/utils/issue/details', {
  './problems': {getIssueProblems},
});

test('calls #getIssueProblems', t => {
  getIssueDetails('abc', '123');

  t.true(getIssueProblems.calledWith('abc', '123'));
});

test('returns the problems, and the status', t => {
  const result = getIssueDetails('abc', '123');

  t.deepEqual(result, {
    problems: [],
    status: IssueStatus.GOOD,
  });
});
