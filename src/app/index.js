import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import injectTapEventPlugin from 'react-tap-event-plugin';

import { translationMessages } from './i18n';

import Root from './Root';
import { configureStore, history } from './store/configureStore';
import './app.global.css';

import api from '../db';

const store = configureStore();

injectTapEventPlugin();

api
  .setupDb()
  .then(() => {
    console.log("The vp_db has been successfully created with all the tables required, if one doesn't exist");
    render(
      <AppContainer>
        <Root store={store} history={history} messages={translationMessages} />
      </AppContainer>,
      document.getElementById('root')
    );
    return true;
  })
  .catch(error => {
    console.log('This error occured', error);
    render(`This error occured, ${error}`, document.getElementById('root'));
  });

if (module.hot) {
  module.hot.accept('./Root', () => {
    const NextRoot = require('./Root'); // eslint-disable-line global-require
    render(
      <AppContainer>
        <NextRoot store={store} history={history} messages={translationMessages} />
      </AppContainer>,
      document.getElementById('root')
    );
  });
}

// Hot reloadable translation json files
if (module.hot) {
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
  module.hot.accept('./i18n', () => {
    import('./i18n')
      .then(messages => {
        const NextRoot = require('./Root'); // eslint-disable-line global-require
        return render(
          <AppContainer>
            <NextRoot store={store} history={history} messages={messages.translationMessages} />
          </AppContainer>,
          document.getElementById('root')
        );
      })
      .catch(e => {
        console.error(e);
      });
  });
}
