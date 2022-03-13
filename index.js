import App from './src/App.js';
import { menuApi } from './src/common/api/api.js';
import { CATEGORIES } from './src/common/constants/constants.js';
import { $ } from './src/common/DOM.js';

new App($('#app'), {
  menu: await menuApi.getMenuListByCategory(CATEGORIES.ESPRESSO.EN),
  currentCategory: CATEGORIES.ESPRESSO.EN,
});
