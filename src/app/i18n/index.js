/**
 * i18n.js
 *
 * This will setup the i18n language files and locale data for your app.
 *
 */
import { addLocaleData } from 'react-intl';
import enLocaleData from 'react-intl/locale-data/en';
import inLocaleData from 'react-intl/locale-data/in';

import { DEFAULT_LOCALE } from '../utils/constants';

import enTranslationMessages from './translations/en.json';
import inTranslationMessages from './translations/ta-IN.json';

addLocaleData(enLocaleData);
addLocaleData(inLocaleData);

export const appLocales = ['en', 'ta-IN'];

export const formatTranslationMessages = (locale, messages) => {
  const defaultFormattedMessages =
    locale !== DEFAULT_LOCALE
      ? formatTranslationMessages(DEFAULT_LOCALE, enTranslationMessages)
      : {};
  return Object.keys(messages).reduce((formattedMessages, key) => {
    const formattedMessage =
      !messages[key] && locale !== DEFAULT_LOCALE
        ? defaultFormattedMessages[key]
        : messages[key];
    return Object.assign(formattedMessages, { [key]: formattedMessage });
  }, {});
};

export const translationMessages = {
  en: formatTranslationMessages('en', enTranslationMessages),
  'ta-IN': formatTranslationMessages('ta-IN', inTranslationMessages)
};

export commonTranslations from './commonMessages';
