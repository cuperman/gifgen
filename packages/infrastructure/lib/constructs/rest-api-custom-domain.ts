import * as cdk from '@aws-cdk/core';
import * as route53 from '@aws-cdk/aws-route53';
import * as acm from '@aws-cdk/aws-certificatemanager';
import * as apigw from '@aws-cdk/aws-apigateway';
import * as targets from '@aws-cdk/aws-route53-targets';

export interface RestApiCustomDomainProps extends cdk.ResourceProps {
  readonly restApi: apigw.RestApi;
  readonly zoneName: string;
  readonly domainName: string;
}

export class RestApiCustomDomain extends cdk.Resource {
  constructor(scope: cdk.Construct, id: string, props: RestApiCustomDomainProps) {
    super(scope, id, props);

    const hostedZone = route53.HostedZone.fromLookup(this, 'HostedZone', {
      domainName: props.zoneName
    });

    const certificate = new acm.Certificate(this, 'Certificate', {
      domainName: props.domainName,
      validation: acm.CertificateValidation.fromDns(hostedZone)
    });

    const restApiDomainName = props.restApi.addDomainName('DomainName', {
      domainName: props.domainName,
      certificate
    });

    new route53.ARecord(this, 'ARecord', {
      zone: hostedZone,
      recordName: props.domainName,
      target: route53.RecordTarget.fromAlias(new targets.ApiGatewayDomain(restApiDomainName))
    });
  }
}
