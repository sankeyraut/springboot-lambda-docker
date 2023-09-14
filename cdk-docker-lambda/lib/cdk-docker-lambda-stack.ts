import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import path = require("path");
import { LambdaRestApi, RestApi } from "aws-cdk-lib/aws-apigateway";
import { Tracing } from "aws-cdk-lib/aws-lambda";
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class CdkDockerLambdaStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'CdkDockerLambdaQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });

    const unicornStore = new lambda.DockerImageFunction(
      this,
      "unicornStoreFunction",
      {
        timeout: cdk.Duration.minutes(10),
        memorySize: 2048,
        tracing: Tracing.ACTIVE,
        code: lambda.DockerImageCode.fromImageAsset(
          path.join(__dirname, "../../unicorn-store-spring"),
          {
            cmd: ["com.unicorn.store.StreamLambdaHandler::handleRequest"],
          }
        ),
      }
    );

    const restAPI = new LambdaRestApi(this, "store-api", {
      handler: unicornStore,
      deployOptions: {
        tracingEnabled: true,
      },
    });
  }
}
