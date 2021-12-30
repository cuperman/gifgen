import {
  Resource,
  ResourceProps,
  aws_apigateway as apigw,
  aws_route53 as route53,
  aws_certificatemanager as acm,
  aws_route53_targets as targets
} from 'aws-cdk-lib';
import { Construct } from 'constructs';

export interface RestApiCustomDomainProps extends ResourceProps {
  readonly restApi: apigw.RestApi;
  readonly zoneName: string;
  readonly domainName: string;
}

export class RestApiCustomDomain extends Resource {
  constructor(scope: Construct, id: string, props: RestApiCustomDomainProps) {
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
