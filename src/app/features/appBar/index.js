import { connect } from "react-redux";

import { actions as sharedActions } from "../shared/actions";
import AppBar from "./component";

const enhance = connect(
  (state, ...rest) => ({
    state,
    ...rest
  }),
  {
    toggleSidebar: sharedActions.setSideBarVisibility
  }
);

export default enhance(AppBar);
