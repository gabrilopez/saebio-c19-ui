import {
  createI18n,
} from 'vue-i18n';
import es from '@/resources/locales/es';
import en from '@/resources/locales/en';

const messages = {
  es,
  en,
};

const i18n = createI18n({
  locale: 'es',
  messages,
});

export default i18n;
