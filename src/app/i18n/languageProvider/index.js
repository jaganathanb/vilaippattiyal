import { connect } from 'react-redux';

import LanguageProvider from './component';

const enhance = connect(state => ({
  language: state.config.language
}));

export default enhance(LanguageProvider);
