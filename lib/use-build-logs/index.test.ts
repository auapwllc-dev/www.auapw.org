import { describe, expect, it } from "vitest";
import { getLogWithType } from "./index";
import { BuildLogType, type BuildLog, type RawLog } from "./types";

function makeRawLog(text: string, overrides: Partial<RawLog> = {}): RawLog {
  return {
    deploymentId: "dep_1",
    id: "log_1",
    info: {
      name: "build",
      type: "build",
      entrypoint: "index.js",
    },
    serial: "1",
    text,
    type: BuildLogType.Stdout,
    created: 1,
    date: 1,
    ...overrides,
  };
}

describe("getLogWithType", () => {
  it("returns undefined when log has no id", () => {
    const log = makeRawLog("error happened", { id: "" });
    expect(getLogWithType(log, undefined)).toBeUndefined();
  });

  it("marks logs with error patterns as error", () => {
    const log = makeRawLog("Module not found: Can't resolve './foo'");
    expect(getLogWithType(log, undefined)?.level).toBe("error");
  });

  it("marks warning patterns as warning", () => {
    const log = makeRawLog("Warning: optional peer dependency missing");
    expect(getLogWithType(log, undefined)?.level).toBe("warning");
  });

  it("does not treat deprecationwarning as warning", () => {
    const log = makeRawLog("DeprecationWarning: this API is deprecated");
    expect(getLogWithType(log, undefined)?.level).toBeUndefined();
  });

  it("inherits previous level for indented continuation lines", () => {
    const previousLog = makeRawLog("Error: build failed");
    const previous = getLogWithType(previousLog, undefined) as BuildLog;
    const current = makeRawLog("    at compile (/app/file.js:1:1)", {
      id: "log_2",
      serial: "2",
      created: 2,
      date: 2,
    });

    expect(getLogWithType(current, previous)?.level).toBe("error");
  });

  it("uses level flag when requested", () => {
    const log = makeRawLog("ordinary line", {
      level: "warning",
    });
    expect(getLogWithType(log, undefined, { useLevelFlag: true })).toEqual(log);
  });

  it("strips ANSI codes before error detection", () => {
    const ansiError = makeRawLog("\u001b[31merror:\u001b[0m failed to compile");
    expect(getLogWithType(ansiError, undefined)?.level).toBe("error");
  });
});
