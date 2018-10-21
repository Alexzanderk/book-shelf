import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Layout from './hoc/layout';
import Home from './components/Home/Home';
import BookView from './components/Boooks/books';
import Login from './containers/admin/Login';
import User from './components/Admin/User'
import AddBook from './containers/admin/add';
import EditBook from './containers/admin/edit'
import UserPosts from './components/Admin/UserPosts';
import Register from './containers/admin/register';
import Logout from './components/Admin/logout';

import Auth from './hoc/Auth';

class Routes extends Component {
	render() {
		return (
			<Layout>
				<Switch>
					<Route path="/" exact component={Auth(Home, null)} />
					<Route path="/books/:id" exact component={Auth(BookView)} />
					<Route path="/login" exact component={Auth(Login, false)} />
					<Route path="/user/logout" exact component={Auth(Logout, true)} />
					<Route path="/user" exact component={Auth(User, true)} />
					<Route path="/user/add" exact component={Auth(AddBook, true)} />
					<Route path="/user/edit-post/:id" exact component={Auth(EditBook, true)} />
					<Route path="/user/reviews" exact component={Auth(UserPosts, true)} />
					<Route path="/user/register" exact component={Auth(Register, true)} />
				</Switch>
			</Layout>
		);
	}
}

export default Routes;
