import { TranslateOptions } from 'i18n-js';
import I18n from './i18n';

/**
 * Translates text.
 *
 * @param key The i18n key.
 */
export function translate(key: string, options?: TranslateOptions) {
  return key ? I18n.t(key, options) : null;
}