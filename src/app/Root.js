// @flow
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { HotKeys } from 'react-hotkeys';

// Import Language Provider
import LanguageProvider from './i18n/languageProvider';
import { DEFAULT_LOCALE } from './utils/constants';
import Routes from './routes';

type Props = {
  store: {},
  history: {},
  messages: {}
};

export default class Root extends Component<Props> {
  keyMap = {
    showTasks: 'shift+t',
    showIdeas: 'shift+i',
    showSettings: 'shift+s',
    showHelp: 'shift+h'
  };

  render() {
    const handlers = {
      showTasks: () => {},
      showIdeas: () => {},
      showSettings: () => {},
      showHelp: () => {}
    };

    return (
      <Provider store={this.props.store}>
        <LanguageProvider
          messages={this.props.messages}
          language={DEFAULT_LOCALE}
        >
          <HotKeys
            focused
            attach={window}
            keyMap={this.keyMap}
            handlers={handlers}
          >
            <ConnectedRouter history={this.props.history}>
              <Routes />
            </ConnectedRouter>
          </HotKeys>
        </LanguageProvider>
      </Provider>
    );
  }
}
