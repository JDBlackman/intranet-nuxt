export const state = () => ({
  locales: [
    {
      code: 'cy',
      name: 'CY'
    },
    {
      code: 'en',
      name: 'EN'
    }
  ],
  locale: 'en'
});

export const mutations = {
  SET_LANG(state, locale) {
    if (state.locales.find(el => el.code === locale)) {
      state.locale = locale
    }
  }
};
