import React, { PureComponent } from 'react';
import { withStyles } from 'material-ui/styles';
import ExpansionPanel, {
  ExpansionPanelDetails,
  ExpansionPanelSummary
} from 'material-ui/ExpansionPanel';
import Typography from 'material-ui/Typography';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import { CircularProgress } from 'material-ui/Progress';

import VPGrid from '../shared/components/grid';

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  }
});

type Props = {
  expanded: string,
  classes: any,
  users: any[],
  roles: any[],
  statuses: any,
  userDeleted: boolean,
  userSaved: boolean,
  usersInProgress: boolean,
  rolesInProgress: boolean,
  onExpand: (panel: string) => void,
  saveRole: (data: any) => void,
  removeRole: (data: any) => void,
  saveUser: (data: any[]) => void,
  deleteUser: (data: any) => void,
  fetchUsers: () => any[],
  fetchRoles: () => any[],
  fetchStatuses: () => any[]
};

class Accounts extends PureComponent<Props> {
  props: Props;
  componentWillMount() {
    this.props.fetchUsers();
    this.props.fetchRoles();
    this.props.fetchStatuses();
  }

  render() {
    const {
      classes,
      expanded,
      onExpand,
      users,
      roles,
      statuses,
      saveRole,
      removeRole,
      saveUser,
      deleteUser,
      userSaved,
      userDeleted,
      usersInProgress,
      rolesInProgress
    } = this.props;

    return (
      <div className={classes.root}>
        <ExpansionPanel expanded={expanded === 'users'} onChange={() => onExpand('users')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Users</Typography>
            <Typography className={classes.secondaryHeading}>I am Users list</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            {usersInProgress ? (
              <CircularProgress size={25} thickness={2} />
            ) : (
              <VPGrid
                actions={{ save: saveUser, remove: deleteUser }}
                progress={{ saved: userSaved, removed: userDeleted }}
                rows={users}
                columns={[
                  {
                    name: 'firstName',
                    title: 'First name',
                    type: 'string',
                    index: 1
                  },
                  {
                    name: 'lastName',
                    title: 'Last name',
                    type: 'string',
                    index: 2
                  },
                  {
                    name: 'email',
                    title: 'Email',
                    type: 'string',
                    index: 3
                  },
                  {
                    name: 'role',
                    title: 'Role',
                    type: 'multiselect',
                    index: 4,
                    lookups: roles.map(role => ({ key: role.roleId, value: role.name }))
                  },
                  {
                    name: 'status',
                    title: 'Status',
                    type: 'choice',
                    index: 5,
                    lookups: statuses.map(status => ({ key: status.statusId, value: status.name }))
                  }
                ]}
              />
            )}
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel expanded={expanded === 'roles'} onChange={() => onExpand('roles')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Roles</Typography>
            <Typography className={classes.secondaryHeading}>I am roles panel</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            {rolesInProgress ? (
              <CircularProgress size={25} thickness={2} />
            ) : (
              <VPGrid
                actions={{ save: saveRole, remove: removeRole }}
                progress={{ saved: userSaved, removed: userDeleted }}
                rows={roles}
                columns={[{ name: 'name', title: 'Name' }]}
              />
            )}
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    );
  }
}

export default withStyles(styles)(Accounts);
