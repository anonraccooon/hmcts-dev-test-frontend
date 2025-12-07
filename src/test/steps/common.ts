/// <reference types="codeceptjs" />
import { config as testConfig } from '../config';

const { I } = inject();

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
