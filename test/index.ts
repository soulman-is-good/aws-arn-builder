// node --test -r ts-node/register test/**/*.test.ts does not always work, at least for v18
// so we have this file to fix it

import "./builder.test";
import "./parser.test";
