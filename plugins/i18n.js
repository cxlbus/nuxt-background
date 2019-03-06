import Vue from 'vue';
import VueI18n from 'vue-i18n';

import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'

Vue.use(VueI18n);
export default ({ app, store }) => {
  // Set i18n instance on app
  // This way we can use it in middleware and pages asyncData/fetch
  app.i18n = new VueI18n({
    locale: store.state.locale,
    fallbackLocale: 'en',
    messages: {
      'zh':Object.assign(require('@/publice/lang/zh'), zhLocale),
      'en':Object.assign(require('@/publice/lang/en'), enLocale)
    }
  });
}
