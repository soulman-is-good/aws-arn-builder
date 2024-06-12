import { describe, it } from "node:test";
import { deepEqual, equal, throws } from "node:assert";
import { AmazonResourceName, buildARN, parseARN } from "../src";

describe("parseARN tests", () => {
    it("should parse regional ARN", () => {
        const arn = parseARN("arn:aws:sns:us-east-1:123456789012:topic-name");
        equal(arn.partition, "aws");
        equal(arn.service, "sns");
        equal(arn.region, "us-east-1");
        equal(arn.accountId, "123456789012");
        equal(arn.resource, "topic-name");
    });

    it("should parse global ARN", () => {
        const arn = parseARN("arn:aws:iam::123456789012:root");
        equal(arn.partition, "aws");
        equal(arn.service, "iam");
        equal(arn.accountId, "123456789012");
        equal(arn.resource, "root");
        equal(arn.region, "");
    });

    it("should parse custom ARNs", () => {
        const expectedARN: AmazonResourceName = {
            service: "myprettyservice",
            partition: "somepartition",
            region: "us-east-1",
            accountId: "123456789012",
            resource: "my-resource-type/mrt-123123123",
        };
        const arnStr = buildARN(expectedARN);
        const arn = parseARN(arnStr);
        deepEqual(arn, expectedARN);
    });

    it("should throw if ARN is not correct", () => {
        throws(() => parseARN("asd:123"));
    });

    it("should throw if ARN has no partition", () => {
        throws(() => parseARN("arn::iam::123456789012:root"));
    });

    it("should throw if ARN has no service", () => {
        throws(() => parseARN("arn:aws:::123456789012:root"));
    });

    it("should throw if ARN has no account", () => {
        throws(() => parseARN("arn:aws:iam:::root"));
    });
});