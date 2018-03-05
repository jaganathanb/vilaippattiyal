import { connect } from 'react-redux';
import { selectors as configSelectors } from './reducer';

import Configuration from './component';

import { actions as sharedActions } from '../shared/actions';

const { changeLocale, changeTheme } = sharedActions;

const enhance = connect(
  state => ({
    theme: configSelectors.theme(state),
    language: configSelectors.language(state)
  }),
  {
    onChangeLanguage: changeLocale,
    onChangeTheme: changeTheme
  }
);

export default enhance(Configuration);
