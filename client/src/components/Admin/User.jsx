import React from 'react';

const User = (props) => {
	return (
		<div className="user_container">
			<div className="avatar">
				<img src="/images/avatar.png" alt="avatar" />
			</div>
            <div className="nfo">
                <div><span>Name:</span> {props.user.login.name}</div>
                <div><span>Lastname:</span> {props.user.login.lastname}</div>
                <div><span>Email:</span> {props.user.login.email}</div>
            </div>
		</div>
	);
};

export default User;
