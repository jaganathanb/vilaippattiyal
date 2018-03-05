import React, { Component } from 'react';
import { IntlProvider } from 'react-intl';

type Props = {
  language: string,
  messages: {},
  children: React.ReactChildren
};

export default class LanguageProvider extends Component<Props> {
  props: Props;
  render() {
    return (
      <IntlProvider
        locale={this.props.language}
        key={this.props.language}
        messages={this.props.messages[this.props.language]}
      >
        {React.Children.only(this.props.children)}
      </IntlProvider>
    );
  }
}
