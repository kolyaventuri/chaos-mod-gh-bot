import test from 'ava';

import {handleHook} from '../../../src/v1/hook/post';
import pingEvent from '../../mock/events/ping.json';

test('returns a 200 ok response for a ping event', async t => {
  const result = await handleHook({body: JSON.stringify(pingEvent)} as AWSLambda.APIGatewayEvent);

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

