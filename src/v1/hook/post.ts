import runWarm from '../../utils/run-warm';

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

  console.log(parseResult);

  return {
    statusCode: 200,
    body: 'ok',
  };
};

export const handler = runWarm(handleHook);
