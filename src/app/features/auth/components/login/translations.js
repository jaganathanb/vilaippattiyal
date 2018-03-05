import { defineMessages } from 'react-intl';

export default defineMessages({
  email: {
    id: 'vp.login.email',
    defaultMessage: 'Email'
  },
  password: {
    id: 'vp.login.password',
    defaultMessage: 'Password'
  },
  loginButtonText: {
    id: 'vp.login.loginButton.text',
    defaultMessage: 'Login'
  },
  unknownUserErrorText: {
    id: 'vp.login.error.unknowUser',
    defaultMessage: 'It seems that you are not registered with us'
  },
  credentialMatchErrorText: {
    id: 'vp.login.error.credentialDidnotMatch',
    defaultMessage: 'Credential did not match'
  },
  noAccountText: {
    id: 'vp.login.noAccount.text',
    defaultMessage: 'No account?'
  },
  registerText: {
    id: 'vp.login.register.text',
    defaultMessage: 'Create one'
  }
});
