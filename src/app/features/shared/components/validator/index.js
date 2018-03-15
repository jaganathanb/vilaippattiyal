import React, { PureComponent } from 'react';

type Props = {
  Component: any,
  shouldRender: boolean
};

export default class Validator extends PureComponent<Props> {
  props: Props;
  render() {
    const { Component, shouldRender } = this.props;
    if (!shouldRender) {
      return null;
    }

    return <Component {...this.props} />;
  }
}
