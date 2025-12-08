/// <reference types="codeceptjs" />
import { config as testConfig } from '../config';

declare function inject(): unknown;

declare function Given(pattern: string, fn: (...args: string[]) => void): void;
declare function When(pattern: string, fn: (...args: string[]) => void): void;
declare function Then(pattern: string, fn: (...args: string[]) => void): void;

// Define the subset of `I` methods we need for our step definitions.
// This avoids using `any` while keeping typings focused and minimal.
type TestI = {
  amOnPage(url: string): Promise<void> | void;
  waitInUrl(url: string): Promise<void> | void;
  waitForText(text: string, sec?: number): Promise<void> | void;
  seeInCurrentUrl(part: string): Promise<void> | void;
  click(locator: string): Promise<void> | void;
};

const { I } = inject() as { I: TestI };

export const iAmOnPage = (text: string): void => {
  const url = new URL(text, testConfig.TEST_URL);
  if (!url.searchParams.has('lng')) {
    url.searchParams.set('lng', 'en');
  }
  I.amOnPage(url.toString());
};
Given('I go to {string}', iAmOnPage);

Then('the page URL should be {string}', (url: string) => {
  I.waitInUrl(url);
});

Then('the page should include {string}', (text: string) => {
  I.waitForText(text);
});

Then('the page URL should contain {string}', (urlPart: string) => {
  I.seeInCurrentUrl(urlPart);
});

When('I click on {string}', (buttonText: string) => {
  I.click(buttonText);
});

When('I click {string}', (buttonText: string) => {
  I.click(buttonText);
});
