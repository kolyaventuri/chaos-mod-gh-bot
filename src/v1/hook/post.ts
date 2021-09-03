import runWarm from '../../utils/run-warm';
import issueHandler from '../../handlers/v1/issue';

export const handleHook = async (event: AWSLambda.APIGatewayEvent): Promise<AWSLambda.APIGatewayProxyResult> => {
  const {body} = event;
  let parseResult: Record<string, unknown>;

  try {
    parseResult = JSON.parse(body ?? '') as Record<string, unknown>;
  } catch (error: unknown) {
    console.error(error);

    return {
      statusCode: 400,
      body: '400 bad request',
    };
  }

  if (parseResult.action && parseResult.issue) {
    try {
      await issueHandler(parseResult);
    } catch (error: unknown) {
      console.error(error);

      return {
        statusCode: 500,
        body: '500 server error',
      };
    }
  }

  return {
    statusCode: 200,
    body: 'ok',
  };
};

export const handler = runWarm(handleHook);
