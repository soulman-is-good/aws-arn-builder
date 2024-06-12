import { describe, it } from "node:test";
import { equal } from "node:assert";
import { buildARN } from "../src";

describe("buildARN tests", () => {
  it("should build proper regional ARN", () => {
    const arn = buildARN({
      service: "sns",
      region: "us-east-1",
      accountId: "123456789012",
      resource: "topic-name",
    });
    equal(arn, "arn:aws:sns:us-east-1:123456789012:topic-name");
  });

  it("should allow build custom ARN", () => {
    const arn = buildARN({
      service: "myprettyservice",
      region: "us-east-1",
      accountId: "123456789012",
      resource: "my-resource-type/mrt-123123123",
    });
    equal(arn, "arn:aws:myprettyservice:us-east-1:123456789012:my-resource-type/mrt-123123123");
  });

  it("should build proper global ARN for region", () => {
    const arn = buildARN({
      service: "iam",
      region: "us-east-1",
      accountId: "123456789012",
      resource: "root",
    });
    equal(arn, "arn:aws:iam::123456789012:root");
  });

  it("should build proper global ARN for partition", () => {
    const arn = buildARN({
      service: "iam",
      partition: "aws-cn",
      accountId: "123456789012",
      resource: "root",
    });
    equal(arn, "arn:aws-cn:iam::123456789012:root");
  });

  it("should build proper global ARN for partition and region", () => {
    const arn = buildARN({
      service: "iam",
      partition: "aws",
      region: "us-east-1",
      accountId: "123456789012",
      resource: "root",
    });
    equal(arn, "arn:aws:iam::123456789012:root");
  });

  it("should resolve proper parition from region", () => {
    const arn = buildARN({
      service: "iam",
      region: "us-gov-east-1",
      accountId: "123456789012",
      resource: "root",
    });
    equal(arn, "arn:aws-us-gov:iam::123456789012:root");
  });
});
