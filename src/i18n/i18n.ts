/**
 * i18n stands for internationalization
 */
import * as RNLocalize from 'react-native-localize';
import I18n from 'i18n-js';

import en from '@/assets/translate/en.json'
import vi from '@/assets/translate/en.json'

const locales = RNLocalize.getLocales();

if (Array.isArray(locales)) {
    I18n.locale = locales[0].languageTag;
}
// Define the supported translation
I18n.fallbacks = true;

I18n.translations = {
  vi,
  en
};

const fallback = { languageTag: 'vi', isRTL: false };


export default I18n;