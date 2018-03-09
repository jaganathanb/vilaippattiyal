// @flow
import { createStore, applyMiddleware } from 'redux';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'react-router-redux';
import { createLogicMiddleware } from 'redux-logic';
import rootReducer from '../reducers';
import logic from '../logics';

import api from '../../db';

const history = createBrowserHistory();
const router = routerMiddleware(history);

const deps = {
  // injected dependencies for logic
  Db: api.Db
};

const logicMiddleware = createLogicMiddleware(logic, deps);

const enhancer = applyMiddleware(logicMiddleware, router);

function configureStore(initialState: any) {
  return createStore(rootReducer, initialState, enhancer);
}

export default { configureStore, history };
