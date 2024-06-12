import { partitions } from "./botocore.json";

/**
 * AWS ARN interface
 */
export interface AmazonResourceName {
    /**
     * AWS Partition, aws, aws-cn, aws-gov
     */
    partition: string;
    /**
     * AWS Service Name, iam, ec2, s3
     */
    service: AWSServiceName;
    /**
     * AWS Region, could be empty string if service is global
     */
    region: AWSRegion;
    /**
     * AWS Account ID
     */
    accountId: string;
    /**
     * Resource string, including type and id
     */
    resource: string;
}

export type AWSPartition = (typeof partitions)[number];
export type AWSServiceName = keyof AWSPartition["services"] | (string & {});
export type AWSService =
  AWSPartition["services"][keyof AWSPartition["services"]] & {
    isRegionalized?: boolean;
  };
export type AWSRegion = keyof AWSPartition["regions"] | (string & {});

export const isAWSServiceName = (
  service: AWSServiceName
): service is keyof AWSPartition["services"] =>
  partitions.some((part) => service in part.services);

export class ARNParseError extends Error {}
