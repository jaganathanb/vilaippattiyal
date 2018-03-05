import React, { PureComponent } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { injectIntl, intlShape } from 'react-intl';

import { withStyles } from 'material-ui/styles';
import { pink } from 'material-ui/colors';
import Typography from 'material-ui/Typography';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import { CircularProgress } from 'material-ui/Progress';
import Button from 'material-ui/Button';

import { LockOutline as LockIcon } from 'material-ui-icons';

import InputComponent from '../../../shared/controls/input';

import translations from './translations';
import { commonTranslations } from '../../../../i18n';

const styles = theme => ({
  card: {
    minWidth: 300
  },
  action: {
    margin: theme.spacing.unit,
  },
  rowCenter: {
    display: 'flex',
    justifyContent: 'center'
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: pink[500]
  },
  input: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
    minWidth: 200,
    width: '100%'
  },
  typo: {
    fontSize: '11px'
  }
});

type Props = {
  handleSubmit: () => void,
  isLoggingIn: boolean,
  intl: intlShape.int,
  classes: {}
};

class LoginForm extends PureComponent<Props> {
  props: Props;

  render() {
    const {
      handleSubmit, isLoggingIn, intl, classes
    } = this.props;

    return (
      <Card className={classes.card}>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <div className={classes.rowCenter}>
              <Avatar className={classes.avatar}>
                <LockIcon />
              </Avatar>
            </div>
            <div>
              <Field
                name="email"
                className={classes.input}
                component={InputComponent}
                label={intl.formatMessage(translations.email)}
                disabled={isLoggingIn}
              />
            </div>
            <div>
              <Field
                name="password"
                className={classes.input}
                component={InputComponent}
                label={intl.formatMessage(translations.password)}
                type="password"
                disabled={isLoggingIn}
              />
            </div>
          </CardContent>
          <CardActions>
            <Button
              className={classes.action}
              type="submit"
              variant="raised"
              color="primary"
              disabled={isLoggingIn}
              fullWidth
            >
              {intl.formatMessage(translations.loginButtonText)}
              {isLoggingIn && <CircularProgress size={25} thickness={2} />}
            </Button>
          </CardActions>
          <div className={classes.rowCenter}>
            <Typography variant="body1" className={classes.typo} >
              {intl.formatMessage(translations.noAccountText)} <Link to="/public/auth/register">{intl.formatMessage(translations.registerText)}</Link>
            </Typography>
          </div>
        </form>
      </Card>
    );
  }
}

const formContainer = reduxForm({
  form: 'signIn',
  validate: (values, props) => {
    const errors = {};
    const { formatMessage } = props.intl;
    const requireMessage = formatMessage(commonTranslations.requried);

    if (!values.email) {
      errors.email = requireMessage;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = formatMessage(commonTranslations.validEmailError);
    }
    if (!values.password) {
      errors.password = requireMessage;
    }
    return errors;
  }
})(LoginForm);

export default withStyles(styles, { withTheme: true })(injectIntl(formContainer));
