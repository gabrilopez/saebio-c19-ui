import VueI18n from 'vue-i18n';
import localeEn from './es';

const locale = 'es';
const i18n = new VueI18n({
  locale,
  messages: {
    es: localeEn,
  },
});

// eslint-disable-next-line import/prefer-default-export
export { i18n };
