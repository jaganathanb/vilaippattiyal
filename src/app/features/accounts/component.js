import React from 'react';
import { injectIntl, intlShape } from 'react-intl';
import Card, { CardContent, CardActions, CardHeader } from 'material-ui/Card';
import RaisedButton from 'material-ui/Button';

import {
  Grid,
  Table,
  TableHeaderRow
} from '@devexpress/dx-react-grid-material-ui';

import translations from './translations';

const styles = {
  label: { width: '10em', display: 'inline-block' },
  button: { margin: '1em' }
};

type Props = {
  intl: intlShape.intl,
  fetchRoles: () => void,
  fetchUsers: () => void
};

class Configuration extends React.Component<Props> {
  props: Props;

  componentWillMount() {
    this.props.fetchUsers();
    this.props.fetchRoles();
  }
  render() {
    return (
      <Card>
        <CardHeader title="Accounts" className="title" />
        <CardContent>
          <Grid
            rows={[
              { id: 0, product: 'DevExtreme', owner: 'DevExpress' },
              { id: 1, product: 'DevExtreme Reactive', owner: 'DevExpress' }
            ]}
            columns={[
              { name: 'id', title: 'ID' },
              { name: 'product', title: 'Product' },
              { name: 'owner', title: 'Owner' }
            ]}
          >
            <Table />
            <TableHeaderRow />
          </Grid>
        </CardContent>
        <CardActions>
          <RaisedButton variant="raised">OK</RaisedButton>
        </CardActions>
      </Card>
    );
  }
}

export default injectIntl(Configuration);
