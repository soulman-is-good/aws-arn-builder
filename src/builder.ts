import { partitions } from "./botocore.json";
import {
    AWSPartition,
    AWSRegion,
    AWSService,
    AmazonResourceName,
    isAWSServiceName
} from "./types";

const defaultParition = partitions.find(
  (p) => p.partition === "aws"
) as AWSPartition;
const partitionRegExpMap: Map<RegExp, AWSPartition> = partitions.reduce(
  (map, part) => {
    map.set(new RegExp(part.regionRegex), part);
    return map;
  },
  new Map()
);

/**
 * Find AWS partition for region
 * @param region AWS Region to get partition for
 * @returns AWS region parition, or default aws partition if not found
 */
export function getParitionByRegion(region: AWSRegion): AWSPartition {
  for (const [regionRegExp, partition] of partitionRegExpMap) {
    if (regionRegExp.test(region)) {
      return partition;
    }
  }
  return defaultParition;
}

/**
 * Helps build AmazonResourceName (ARN) string from provided properties
 * For format @see https://docs.aws.amazon.com/IAM/latest/UserGuide/reference-arns.html#arns-syntax
 */
export function buildARN({
  service,
  region,
  accountId,
  resource,
  partition,
}: Partial<AmazonResourceName>): string {
  let awsParition: AWSPartition | undefined;

  if (partition || region) {
    awsParition = partition
      ? partitions.find((part) => part.partition === partition)
      : getParitionByRegion(region!);
  }
  const isGlobal =
    service && isAWSServiceName(service)
      ? (awsParition?.services[service] as AWSService)?.isRegionalized === false
      : false;

  return `arn:${partition ?? awsParition?.partition ?? ""}:${service ?? ""}:${
    isGlobal ? "" : region ?? ""
  }:${accountId ?? ""}:${resource ?? ""}`;
}
