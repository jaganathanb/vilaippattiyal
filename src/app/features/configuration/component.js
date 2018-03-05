import React from 'react';
import { injectIntl, intlShape } from 'react-intl';
import Card, { CardHeader, CardActions } from 'material-ui/Card';
import RaisedButton from 'material-ui/Button';

import translations from './translations';

const styles = {
  label: { width: '10em', display: 'inline-block' },
  button: { margin: '1em' }
};

type Props = {
  language: string,
  theme: string,
  intl: intlShape.intl,
  onChangeLanguage: (language: string) => void,
  onChangeTheme: (theme: string) => void
};

class Configuration extends React.Component<Props> {
  props: Props;
  render() {
    const {
      language,
      theme,
      intl,
      onChangeTheme,
      onChangeLanguage
    } = this.props;

    return (
      <Card>
        <CardHeader
          title={intl.formatMessage(translations.configuration)}
          className="title"
        />
        <CardActions>
          <div style={styles.label}>
            {intl.formatMessage(translations.theme)}
          </div>
          <RaisedButton variant="raised" onClick={() => onChangeTheme('light')}>
            {intl.formatMessage(translations.lightTheme)}{' '}
          </RaisedButton>
          <RaisedButton variant="raised" onClick={() => onChangeTheme('dark')}>
            {intl.formatMessage(translations.darkTheme)}
          </RaisedButton>
        </CardActions>
        <CardActions>
          <div style={styles.label}>
            {intl.formatMessage(translations.language)}
          </div>
          <RaisedButton variant="raised" onClick={() => onChangeLanguage('en')}>
            {intl.formatMessage(translations.languageEnglish)}
          </RaisedButton>
          <RaisedButton
            variant="raised"
            onClick={() => onChangeLanguage('ta-IN')}
          >
            {intl.formatMessage(translations.languageTamil)}
          </RaisedButton>
        </CardActions>
      </Card>
    );
  }
}

export default injectIntl(Configuration);
