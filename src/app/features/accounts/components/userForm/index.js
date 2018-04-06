import React, { PureComponent } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import { withStyles } from 'material-ui/styles';
import { pink } from 'material-ui/colors';
import Card, { CardContent, CardActions } from 'material-ui/Card';
import { MenuItem } from 'material-ui/Menu';

import { CircularProgress } from 'material-ui/Progress';
import Button from 'material-ui/Button';

import { injectIntl, intlShape } from 'react-intl';

import InputComponent from '../../../shared/controls/input';
import CheckboxComponent from '../../../shared/controls/checkbox';
import SelectComponent from '../../../shared/controls/select';

import translations from './translations';
import { commonTranslations } from '../../../../i18n';
import actions from '../../actions';
import { selectors } from '../../reducer';
import { hideModal } from '../../../shared/actions';

const styles = theme => ({
  card: {
    minWidth: 300
  },
  action: {
    margin: theme.spacing.unit
  },
  actionWrapper: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  rowCenter: {
    display: 'flex',
    justifyContent: 'center'
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: pink[500]
  },
  typo: {
    fontSize: '11px'
  }
});

type Props = {
  intl: intlShape.int,
  classes: {},
  handleSubmit: () => void,
  onCancel: () => void,
  onSuccess: () => void,
  userSaved: boolean,
  userSaveError: 
  edit: boolean
};

class UserForm extends PureComponent<Props> {
  props: Props;

  state = {
    isSaving: false
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.userSaved) {
      this.state.isSaving = false;
      this.props.onSuccess();
    }
  }
  render() {
    const {
 intl, classes, handleSubmit, edit 
} = this.props;

    return (
      <Card className={classes.card}>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <div>
              <Field
                name="firstName"
                component={InputComponent}
                label={intl.formatMessage(translations.firstName)}
              />
            </div>
            <div>
              <Field
                name="lastName"
                component={InputComponent}
                label={intl.formatMessage(translations.lastName)}
              />
            </div>
            <div>
              <Field
                name="email"
                component={InputComponent}
                label={intl.formatMessage(translations.email)}
              />
            </div>
            <div>
              {edit ? null : (
                <Field
                  name="password"
                  component={InputComponent}
                  label={intl.formatMessage(translations.password)}
                  type="password"
                />
              )}
            </div>
            <div>
              <Field
                name="role"
                component={({ input, meta }) => (
                  <SelectComponent
                    input={input}
                    meta={meta}
                    label={intl.formatMessage(translations.enabled)}
                  >
                    <MenuItem value="admin"> {'Admin'} </MenuItem>
                    <MenuItem value="user"> {'User'} </MenuItem>
                  </SelectComponent>
                )}
              />
            </div>
            <div>
              <Field
                name="status"
                id="status"
                component={({ input, meta }) => (
                  <CheckboxComponent
                    input={input}
                    meta={meta}
                    label={intl.formatMessage(translations.enabled)}
                  />
                )}
              />
            </div>
          </CardContent>
          <CardActions className={classes.actionWrapper}>
            <Button onClick={data => this.props.onCancel(data)} color="primary">
              {'Cancel'}
            </Button>
            <Button
              className={classes.action}
              onClick={() => {
                this.state.isSaving = true;
              }}
              type="submit"
              variant="raised"
              color="primary"
              disabled={this.state.isSaving}
            >
              {intl.formatMessage(translations.save)}
              {this.state.isSaving && (
                <CircularProgress size={25} thickness={2} />
              )}
            </Button>
          </CardActions>
        </form>
      </Card>
    );
  }
}

const formContainer = reduxForm({
  form: 'userForm',
  validate: (values, props) => {
    const errors = {};
    const { formatMessage } = props.intl;
    const requireMessage = formatMessage(commonTranslations.requried);

    if (!values.email) {
      errors.email = requireMessage;
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = formatMessage(commonTranslations.validEmailError);
    }

    if (!values.firstName) {
      errors.firstname = requireMessage;
    }
    if (!values.password) {
      errors.password = requireMessage;
    }
    if (!values.role) {
      errors.password = requireMessage;
    }
    if (!values.status) {
      errors.password = requireMessage;
    }
    return errors;
  }
})(UserForm);

const enhance = connect(
  (state, ...rest) => ({
    userSaved: selectors.userSaved(state),
    userDeleted: selectors.userDeleted(state),
    userSaveError: selectors.userSaveError(state),
    userDeleteError: selectors.userDeleteError(state),
    ...rest
  }),
  {
    onSubmit: actions.saveUser,
    hideModal
  }
);

export default enhance(withStyles(styles, { withTheme: true })(injectIntl(formContainer)));
