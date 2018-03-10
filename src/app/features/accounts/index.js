import { connect } from "react-redux";
import { selectors } from "./reducer";

import Configuration from "./component";

import { actions as sharedActions } from "../shared/actions";

const { changeLocale, changeTheme } = sharedActions;

const enhance = connect(
  state => ({
    theme: selectors.theme(state),
    language: selectors.language(state)
  }),
  {
    onChangeLanguage: changeLocale,
    onChangeTheme: changeTheme
  }
);

export default enhance(Configuration);
