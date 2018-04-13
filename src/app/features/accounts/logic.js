import { createLogic } from 'redux-logic';

import { omit } from 'lodash';
import { isUndefined } from 'util';

import { actionTypes } from './actions';

const dispatchSaveFailure = (dispatch, reason) => {
  dispatch({
    type: actionTypes.SAVE_USER_FAILURE,
    reason: {
      text: reason
    }
  });
};

const dispatchSaveSuccess = (dispatch, reason) => {
  dispatch({
    type: actionTypes.SAVE_USER_SUCCESS,
    reason: {
      text: reason
    }
  });
};

const setStatus = async (Db, dispatch, payload, user) => {
  const status = await Db.Status.findOne({
    where: { name: { [Db.sequelize.Op.eq]: payload.user.status } }
  });

  if (status) {
    await user.setStatus(status);
  } else {
    dispatchSaveFailure(dispatch, 'Status not found');
  }
};

const setRoles = async (Db, dispatch, payload, user) => {
  const roles = await Db.Role.findAll({
    where: { name: { [Db.sequelize.Op.or]: [payload.user.role] } }
  });

  if (roles.length > 0 && !await user.hasRoles(roles)) {
    await user.setRoles(roles);
  } else {
    dispatchSaveFailure(dispatch, 'Role not found');
  }
};

const saveRoleLogic = createLogic({
  type: actionTypes.SAVE_ROLE,
  async process({ action, Db }, dispatch, done) {
    const role = await Db.Role.findOne({
      where: { roleId: { [Db.sequelize.Op.eq]: action.payload.role.id } }
    });

    if (role) {
      await Db.Role.update(action.payload.role, {
        where: { roleId: { [Db.sequelize.Op.eq]: action.payload.role.id } }
      });

      dispatch({
        type: actionTypes.SAVE_ROLE_SUCCESS,
        payload: { role, reason: { type: 'info', text: 'Role has been updated successfully.' } }
      });
    } else {
      const newRole = await Db.Role.create(action.payload.role);
      if (newRole) {
        dispatch({
          type: actionTypes.SAVE_ROLE_SUCCESS,
          payload: { role, reason: { type: 'info', text: 'Role has been created successfully.' } }
        });
      } else {
        dispatch({
          type: actionTypes.SAVE_ROLE_FAILURE,
          payload: { role, reason: { type: 'error', text: 'Error while creating the Role.' } }
        });
      }
    }

    done();
  }
});

const saveUserLogic = createLogic({
  type: actionTypes.SAVE_USER,
  async process({ action, Db }, dispatch, done) {
    const user = await Db.User.findOne({
      where: { userId: { [Db.sequelize.Op.eq]: action.payload.user.id } },
      include: [{ model: Db.Role }, { model: Db.Status }]
    });

    if (user) {
      if (action.payload.user.role) {
        setRoles(Db, dispatch, action.payload, user);
      }

      if (!isUndefined(action.payload.user.role)) {
        setStatus(Db, dispatch, action.payload, user);
      }

      const userToBeSaved = omit(action.payload.user, ['role', 'status', 'id']);

      try {
        if (Object.keys(userToBeSaved).length > 0) {
          await Db.User.update(userToBeSaved, {
            where: { userId: { [Db.sequelize.Op.eq]: action.payload.user.id } }
          });
        }
        dispatchSaveSuccess(dispatch, 'User saved successfully.');
      } catch (error) {
        dispatchSaveFailure(dispatch, `Error while updating user ${error}`);
      }
    } else if (action.payload.user.id) {
      dispatchSaveFailure(dispatch, 'User not found');
    } else {
      const newUser = await Db.User.create({ ...action.payload.user, password: 'Admin@123' });
      if (!newUser) {
        dispatchSaveFailure(dispatch, 'Error while adding the user');
      }

      if (newUser) {
        setRoles(Db, dispatch, action.payload, newUser);
        setStatus(Db, dispatch, action.payload, newUser);
        dispatchSaveSuccess(dispatch, 'User added successfully');
      }
    }

    done();
  }
});

const deleteUserLogic = createLogic({
  type: actionTypes.DELETE_USER,
  async process({ action, Db }, dispatch, done) {
    const user = await Db.User.findOne({
      where: { userId: { [Db.sequelize.Op.eq]: action.user.id } }
    });

    if (!user) {
      dispatch({
        type: actionTypes.DELETE_USER_FAILURE,
        payload: { reason: { type: 'delete', text: 'User could be found' } }
      });
    } else {
      let deletedUser = null;
      try {
        deletedUser = await Db.User.destroy({
          where: {
            id: action.user.id
          }
        });
      } catch (error) {
        deletedUser = null;
        dispatch({
          type: actionTypes.DELETE_USER_FAILURE,
          payload: { reason: { type: 'delete', text: `Something went wrong! ${error}` } }
        });
      }

      if (deletedUser) {
        dispatch({
          type: actionTypes.DELETE_USER_SUCCESS,
          payload: {
            reason: {
              type: 'delete',
              text: `Deleted the user ${deletedUser.firstName} successfully!`
            }
          }
        });
      }
    }

    done();
  }
});

const usersLogic = createLogic({
  type: actionTypes.FETCH_USERS,
  async process({ action, Db }, dispatch, done) {
    dispatch({ type: actionTypes.FETCH_USERS_PROGRESS });
    let users = null;
    try {
      users = await Db.User.findAll({
        include: [
          {
            model: Db.Status,
            where: {
              name: { [Db.sequelize.Op.eq]: true }
            }
          },
          {
            model: Db.Role
          }
        ]
      });

      dispatch({
        type: actionTypes.FETCH_USERS_SUCCESS,
        payload: {
          users: users.map(user => ({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            id: user.userId,
            role: user.Roles.map(role => role.name),
            status: user.Status.name
          }))
        }
      });
    } catch (error) {
      dispatch({
        type: actionTypes.FETCH_USERS_FAILED,
        payload: { reason: { type: 'users', text: `Something went wrong! ${error}` } }
      });
    }
    done();
  }
});

const rolesLogic = createLogic({
  type: actionTypes.FETCH_ROLES,
  async process({ Db }, dispatch, done) {
    dispatch({ type: actionTypes.FETCH_ROLES_PROGRESS });
    let roles = null;
    try {
      roles = await Db.Role.findAll();
      dispatch({
        type: actionTypes.FETCH_ROLES_SUCCESS,
        payload: { roles: roles.map(role => role.dataValues) }
      });
    } catch (error) {
      dispatch({
        type: actionTypes.FETCH_ROLES_FAILED,
        payload: { reason: { type: 'roles', text: `Something went wrong! ${error}` } }
      });
    }
    done();
  }
});

const statusLogic = createLogic({
  type: actionTypes.FETCH_STATUS,
  async process({ Db }, dispatch, done) {
    let statuses = null;
    try {
      statuses = await Db.Status.findAll();
      dispatch({
        type: actionTypes.FETCH_STATUS_SUCCESS,
        payload: {
          statuses: statuses.map(status => status.dataValues)
        }
      });
    } catch (error) {
      dispatch({
        type: actionTypes.FETCH_STATUS_FAILED,
        payload: { reason: { type: 'status', text: `Something went wrong! ${error}` } }
      });
    }
    done();
  }
});

export default [rolesLogic, usersLogic, saveUserLogic, deleteUserLogic, statusLogic, saveRoleLogic];
