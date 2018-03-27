import React, { PureComponent } from 'react';
import { withStyles } from 'material-ui/styles';
import ExpansionPanel, {
  ExpansionPanelDetails,
  ExpansionPanelSummary
} from 'material-ui/ExpansionPanel';
import Typography from 'material-ui/Typography';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';

import VPGrid from '../shared/components/grid';
import UserForm from './components/userForm';
import DeleteGrid from '../shared/components/deleteGrid';

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
  onExpand: (panel: string) => void,
  fetchUsers: () => any[],
  fetchRoles: () => any[]
};

class Accounts extends PureComponent<Props> {
  props: Props;
  componentWillMount() {
    this.props.fetchUsers();
    this.props.fetchRoles();
  }

  render() {
    const {
 classes, expanded, onExpand, users, roles 
} = this.props;

    return (
      <div className={classes.root}>
        <ExpansionPanel
          expanded={expanded === 'users'}
          onChange={() => onExpand('users')}
        >
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Users</Typography>
            <Typography className={classes.secondaryHeading}>
              I am Users list
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <VPGrid
              rows={users}
              AddComponent={UserForm}
              EditComponent={UserForm}
              DeleteComponent={DeleteGrid}
              columns={[
                { name: 'id', title: 'User Id' },
                { name: 'firstname', title: 'First name' },
                { name: 'lastname', title: 'Last name' },
                { name: 'email', title: 'Email' },
                { name: 'role', title: 'Role' },
                { name: 'status', title: 'Status' }
              ]}
              columnOrder={[
                'id',
                'firstname',
                'lastname',
                'email',
                'role',
                'status'
              ]}
            />
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel
          expanded={expanded === 'roles'}
          onChange={() => onExpand('roles')}
        >
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Roles</Typography>
            <Typography className={classes.secondaryHeading}>
              I am roles panel
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <VPGrid
              rows={roles}
              AddComponent={UserForm}
              EditComponent={UserForm}
              DeleteComponent={DeleteGrid}
              columns={[
                { name: 'id', title: 'ID' },
                { name: 'name', title: 'Name' }
              ]}
              columnOrder={['id', 'name']}
            />
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    );
  }
}

export default withStyles(styles)(Accounts);
