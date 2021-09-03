import test from 'ava';
import proxyquire from 'proxyquire';
import {stub} from 'sinon';

import {handleHook as realHandler} from '../../../src/v1/hook/post';
import pingEvent from '../../mock/events/ping.json';
import issueEvent from '../../mock/events/issue-opened.json';

const issueHandler = stub().resolves();
const {handleHook} = proxyquire<{handleHook: typeof realHandler}>('../../../src/v1/hook/post', {
  '../../handlers/v1/issue': {handler: issueHandler},
});

test('returns a 200 ok response for a ping event, and does NOT trigger the handler', async t => {
  const body = JSON.stringify(pingEvent);
  const result = await handleHook({body} as AWSLambda.APIGatewayEvent);

  t.false(issueHandler.calledWith(body));
  t.deepEqual(result, {
    statusCode: 200,
    body: 'ok',
  });
});

test('returns a 200 ok response for an issue event, and DOES trigger the handler', async t => {
  const body = JSON.stringify(issueEvent);
  const result = await handleHook({body} as AWSLambda.APIGatewayEvent);

  t.false(issueHandler.calledWith(body));
  t.deepEqual(result, {
    statusCode: 200,
    body: 'ok',
  });
});

test('returns a 400 bad request resposne for bad input', async t => {
  const body = 'not json';
  const result = await handleHook({body} as AWSLambda.APIGatewayEvent);

  t.deepEqual(result, {
    statusCode: 400,
    body: '400 bad request',
  });
});

