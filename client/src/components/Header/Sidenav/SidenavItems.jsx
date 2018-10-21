import React from 'react';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import { connect } from 'react-redux';

const SidenavItems = ({ users }) => {
	const items = [
		{
			type: 'navItem',
			icon: 'home',
			text: 'Home',
			link: '/',
			stricted: false
		},
		{
			type: 'navItem',
			icon: 'file-text-o',
			text: 'My Profile',
			link: '/user',
			stricted: true
		},
		{
			type: 'navItem',
			icon: 'file-text-o',
			text: 'Add Admins',
			link: '/user/register',
			stricted: true
		},
		{
			type: 'navItem',
			icon: 'sign-in',
			text: 'Login',
			link: '/login',
			stricted: false,
			exclude: true
		},
		{
			type: 'navItem',
			icon: 'file-text-o',
			text: 'My Reviews',
			link: '/user/reviews',
			stricted: true
		},
		{
			type: 'navItem',
			icon: 'file-text-o',
			text: 'Add Reviews',
			link: '/user/add',
			stricted: true
		},
		{
			type: 'navItem',
			icon: 'sign-out',
			text: 'Logout',
			link: '/user/logout',
			stricted: true
		}
	];

	const element = (item, i) => (
		<div key={i} className={item.type}>
			<Link to={item.link}>
				<FontAwesome name={item.icon} />
				{item.text}
			</Link>
		</div>
	);

	const showItems = () =>
		users.login
			? items.map((item, i) => {
					if (users.login.isAuth) {
						return !item.exclude ? element(item, i) : null;
					} else {
						return !item.stricted ? element(item, i) : null;
					}
			  })
			: null;

	return <div>{showItems()}</div>;
};

const mapStateToProps = state => ({
	users: state.users
});

export default connect(mapStateToProps)(SidenavItems);
