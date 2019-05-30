export default function ({ isHMR, app, store, route, params, req, error, redirect }) {
  if (isHMR) { // ignore if called from hot module replacement
    return;
  }

  if (req) {
    if (route.name) {
      let locale = null;

      // check if the locale cookie is set
      if (req.headers.cookie) {
        const cookie = app.$cookies.get('locale')


        if (cookie) {
          locale = cookie
        } else {
          app.$cookies.set('locale', 'en')
          locale = "en"
        }
      }

      store.commit('SET_LANG', locale);
      app.i18n.locale = store.state.locale;
    }
  }
};
