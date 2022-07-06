import {
  DisplayProcessor,
  SpecReporter,
  StacktraceOption,
} from "jasmine-spec-reporter";
import { CustomReporterResult } from "jasmine-spec-reporter/built/spec-reporter";
import SuiteInfo = jasmine.SuiteInfo;

class CustomProcessor extends DisplayProcessor {
  public displayJasmineStarted(info: SuiteInfo, log: string): string {
    return `${log}`;
  }/* 
  public displaySpecErrorMessages(spec:CustomReporterResult, log:string):string{
    return "";
  } */
}

jasmine.getEnv().clearReporters();
jasmine.getEnv().addReporter(
  new SpecReporter({
    spec: {
      displayStacktrace: StacktraceOption.NONE,
      displayErrorMessages: false,
    },
    customProcessors: [CustomProcessor],
  })
);
