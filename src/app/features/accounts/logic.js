import { createLogic } from 'redux-logic';

import actions, { actionTypes } from './actions';
import { showAlertInModal } from '../shared/actions';

const dispatchFailure = (dispatch, reason) => {
  dispatch({
    type: actionTypes.SAVE_USER_FAILURE,
    reason: {
      text: reason
    }
  });
};

const dispatchSuccess = (dispatch, reason) => {
  dispatch({
    type: actionTypes.SAVE_USER_SUCCESS,
    reason: {
      text: reason
    }
  });
};

const saveUserLogic = createLogic({
  type: actionTypes.SAVE_USER,
  async process({ action, Db }, dispatch, done) {
    const user = await Db.User.findOne({
      where: { id: action.user.id }
    });

    if (user) {
      const {
 firstName, lastName, email, role, status, id 
} = action.user;
      const newUser = await Db.User.update(
        {
          firstName,
          lastName,
          email,
          role,
          status
        },
        { where: { id } }
      );

      if (!newUser) {
        dispatchFailure(dispatch, 'Error while updating user');
      }

      if (newUser) {
        dispatchSuccess(dispatch, 'User updated successfully');
      }
    } else if (action.user.id) {
      dispatchFailure(dispatch, 'User not found');
    } else {
      const newUser = await Db.User.create(action.user);
      if (!newUser) {
        dispatchFailure(dispatch, 'Error while adding the user');
      }

      if (newUser) {
        dispatchSuccess(dispatch, 'User added successfully');
      }
    }

    done();
  }
});

const deleteUserLogic = createLogic({
  type: actionTypes.DELETE_USER,
  async process({ action, Db }, dispatch, done) {
    const user = await Db.User.findOne({ where: { id: action.user.id } });
    if (!user) {
      dispatchFailure(dispatch, 'User could be found');
    } else {
      const deletedUser = await Db.User.destroy({
        where: {
          id: action.user.id
        }
      });
      if (!deletedUser) {
        dispatchFailure(dispatch, 'Error while deleting the user!');
      }

      if (deletedUser) {
        dispatch(dispatch, 'Deletedt the user successfully');
      }
    }

    done();
  }
});

const usersLogic = createLogic({
  type: actionTypes.FETCH_USERS,
  async process({ action, Db }, dispatch, done) {
    dispatch(actions.fetchUsersInProgress());
    let users = null;
    try {
      users = await Db.User.findAll({
        where: {
          status: true
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

export default [rolesLogic, usersLogic, saveUserLogic, deleteUserLogic];
