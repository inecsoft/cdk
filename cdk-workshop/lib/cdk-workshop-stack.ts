import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as apigw from '@aws-cdk/aws-apigateway';
import * as s3 from '@aws-cdk/aws-s3';
import { Networking } from './networking';
import { Tags } from '@aws-cdk/core';

export class CdkWorkshopStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // defines an AWS Lambda resource
    const hello = new lambda.Function(this, 'HelloHandler', {
      runtime: lambda.Runtime.NODEJS_14_X,    // execution environment
      code: lambda.Code.fromAsset('lambda'),  // code loaded from "lambda" directory
      handler: 'hello.handler'                // file is "hello", function is "handler"
    });

    // defines an API Gateway REST API resource backed by our "hello" function.
    new apigw.LambdaRestApi(this, 'Endpoint', {
      handler: hello
    });

    // The code that defines your stack goes here
    const bucket = new s3.Bucket(this, 'DocumentsBucket', {
      encryption: s3.BucketEncryption.S3_MANAGED,
      enforceSSL: true,
    });

    new cdk.CfnOutput(this, 'DocumentBucketNameExport', {
      value: bucket.bucketName,
      exportName: 'DocumentsBucketName'
    });

    
    const net = new Networking(this, 'NetworkingConstruct', {
      maxAzs: 2
    });

    Tags.of(net).add('Module', 'Networking');
  

  }
}
