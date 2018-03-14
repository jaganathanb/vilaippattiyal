import React, { PureComponent } from 'react';
import { withStyles } from 'material-ui/styles';
import ExpansionPanel, {
  ExpansionPanelDetails,
  ExpansionPanelSummary
} from 'material-ui/ExpansionPanel';
import Typography from 'material-ui/Typography';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';

import VPTable from '../shared/components/table';

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
            <VPTable
              title="Users"
              data={users}
              columns={[
                { id: 'id', title: 'User Id' },
                { id: 'firstname', title: 'First name' },
                { id: 'lastname', title: 'Last name' },
                { id: 'email', title: 'Email' },
                { id: 'role', title: 'Role' },
                { id: 'status', title: 'Status' }
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
            <VPTable
              title="Roles"
              data={roles}
              columns={[
                { id: 'id', title: 'ID' },
                { id: 'name', title: 'Name' }
              ]}
            />
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    );
  }
}

export default withStyles(styles)(Accounts);
