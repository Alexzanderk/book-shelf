import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { getUsers, registerUser } from '../../actions';

class Register extends PureComponent {
	state = {
		name: '',
		lastname: '',
		email: '',
		password: '',
		error: ''
	};

	componentWillMount() {
		this.props.dispatch(getUsers());
    }
    
    componentWillReceiveProps(nextProps) {
        if (nextProps.users.success === false) {
            this.setState({error: 'Error, try again'})
        } else {
            this.setState({
                name: '',
                lastname: '',
                email: '',
                password: ''
            })
        }
    }

	handleInput = (event, name) => {
		const newState = { ...this.state };
		newState[name] = event.target.value;
		this.setState(newState);
	};

	submitForm = e => {
		e.preventDefault();
		this.props.dispatch(registerUser(this.state, this.props.users.users))
	};

	showUsers = users =>
		users.users
			? users.users.map(item => (
					<tr key={item._id}>
						<th>{item.name}</th>
						<th>{item.lastname}</th>
						<th>{item.email}</th>
					</tr>
			  ))
			: null;

	render() {
		return (
			<div className="rl_container">
				<form onSubmit={this.submitForm}>
					<h2>Add User</h2>
					<div className="form_element">
						<input
							type="text"
							placeholder="Enter name"
							value={this.state.name}
							onChange={e => this.handleInput(e, 'name')}
						/>
					</div>
					<div className="form_element">
						<input
							type="text"
							placeholder="Enter lastname"
							value={this.state.lastname}
							onChange={e => this.handleInput(e, 'lastname')}
						/>
					</div>
					<div className="form_element">
						<input
							type="email"
							placeholder="Enter email"
							value={this.state.email}
							onChange={e => this.handleInput(e, 'email')}
						/>
					</div>
					<div className="form_element">
						<input
							type="password"
							placeholder="Enter the password"
							value={this.state.password}
							onChange={e => this.handleInput(e, 'password')}
						/>
					</div>
					<button type="submit">Add user</button>
                    <div className="error">
                        {this.state.error}
                    </div>
				</form>
				<div className="current_users">
					<table>
						<thead>
							<tr>
								<th>Name</th>
								<th>Lastname</th>
								<th>Email</th>
							</tr>
						</thead>
						<tbody>{this.showUsers(this.props.users)}</tbody>
					</table>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	console.log(state);
	return { users: state.users };
};

export default connect(mapStateToProps)(Register);
