import { createLogic } from 'redux-logic';

import actions, { actionTypes } from './actions';

const usersLogic = createLogic({
  type: actionTypes.FETCH_USERS,
  async process({ action, Db }, dispatch, done) {
    dispatch(actions.fetchUsersInProgress());
    let users = null;
    try {
      users = await Db.User.findAll({
        where: {
          status: 'enabled'
        }
      });
      dispatch(actions.fetchUsersSuccess(users.map(user => user.dataValues)));
    } catch (error) {
      dispatch(actions.fetchUsersFailure('Something went wrong!'));
    }
    done();
  }
});

const rolesLogic = createLogic({
  type: actionTypes.FETCH_ROLES,
  async process({ action, Db }, dispatch, done) {
    dispatch(actions.fetchRolesInProgress());
    let roles = null;
    try {
      roles = await Db.Role.findAll();
      dispatch(actions.fetchRolesSuccess(roles.map(role => role.dataValues)));
    } catch (error) {
      dispatch(actions.fetchRolesFailure('Something went wrong!'));
    }
    done();
  }
});

export default [rolesLogic, usersLogic];
