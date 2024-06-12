/**
 * ARN would look like following:
 * arn:partition:service:region:account-id:resource-id
 * arn:partition:service:region:account-id:resource-type/resource-id
 * arn:partition:service:region:account-id:resource-type:resource-id
 * @see https://docs.aws.amazon.com/IAM/latest/UserGuide/reference-arns.html#arns-syntax
 * @param service AWS Service name
 * @param region AWS region where service is running
 * @param prefix optional prefix, usually always equal to 'arn' (default)
 * @returns ARN interface
 */

import { ARNParseError, AmazonResourceName } from "./types";

export const parseARN = (arn: string) => {
    if (!arn.startsWith("arn:")) {
        throw new ARNParseError("ARN should start with 'arn:'");
    }
    const [,partition, service, region = "", accountId, ...resource] = arn.split(/:/);

    if (!accountId) {
        throw new Error("AccountID is not provided");
    }
    if (!partition) {
        throw new Error("Partition is not provided");
    }
    if (!service) {
        throw new Error("Service is not provided");
    }

    return {
        accountId,
        partition,
        region,
        resource: resource.join(":"),
        service,
    } satisfies AmazonResourceName;
};
