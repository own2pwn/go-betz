import React from 'react';
import { TextField, FlatButton } from 'material-ui';

import { auth, ls } from './../../services/';

class Signup extends React.Component {
  state = {
    email: '',
    username: '',
    password: '',
  };

  handleEmailChange = (event, newValue) => this.setState({ email: newValue });
  handleUsernameChange = (event, newValue) => this.setState({ username: newValue });
  handlePasswordChange = (event, newValue) => this.setState({ password: newValue });

  handleCancel = () => this.props.history.push('/sign-in');

  async handleRegistration(event) {
    event.preventDefault();

    const requestBody = {
      email: this.state.email,
      username: this.state.username,
      password: this.state.password
    };

    try {
      const user = await auth.signUp(requestBody);

      ls.save('current_user', user);

      this.props.history.push('matches');
    } catch (e) {
      alert(`Error: ${JSON.stringify(e)}`);
    }
  }

  render() {
    return (
      <div className='sign-up page'>
        <div className='sign-up--content'>
          <h2>NEW USER</h2>
          <form>
            <TextField name='email' value={this.state.email} onChange={this.handleEmailChange} floatingLabelText='Email' />
            <TextField name='username' value={this.state.username} onChange={this.handleUsernameChange} floatingLabelText='Usuário' />
            <TextField name='password' value={this.state.password} onChange={this.handlePasswordChange} floatingLabelText='Senha' type='password' />
          </form>
          <div className='sign-up--actions'>
            <FlatButton label='save' primary onTouchTap={this.handleRegistration.bind(this)} />
            <FlatButton label='cancel' primary onTouchTap={this.handleCancel} />
          </div>
        </div>
      </div>
    )
  }
}

export default Signup;