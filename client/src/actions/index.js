import axios from 'axios';

export const getBooks = (limit = 10, start = 0, order = 'asc', list = '') => {
	const request = axios
		.get(`/api/books?limit=${limit}&skip=${start}&order=${order}`)
		.then(res => {
			if (list) {
				return [...list, ...res.data];
			} else {
				return res.data;
			}
		});

	return {
		type: 'GET_BOOKS',
		payload: request
	};
};

export const getBook = id => {
	const request = axios.get(`/api/book?id=${id}`);

	return dispatch => {
		request.then(({ data }) => {
			let book = data;

			axios
				.get(`/api/getReviewer?id=${book.ownerId}`)
				.then(({ data }) => {
					let response = {
						book,
						reviewer: data
					};

					dispatch({
						type: 'GET_BOOK',
						payload: response
					});
				});
		});
	};
};

export const clearBook = () => {
	return {
		type: 'CLEAR_BOOK',
		payload: null
	};
};

export const loginUser = ({ email, password }) => {
	const request = axios
		.post('/api/login', { email, password })
		.then(res => res.data);

	return {
		type: 'USER_LOGIN',
		payload: request
	};
};

export const auth = () => {
	const request = axios.get('/api/auth').then(res => res.data);

	return {
		type: 'USER_AUTH',
		payload: request
	};
};

export const addBook = book => {
	const request = axios.post('/api/book_create', book).then(res => res.data);

	return {
		type: 'ADD_BOOK',
		payload: request
	};
};

export const clearNewBook = () => {
	return {
		type: 'CLEAR_NEW_BOOK',
		payload: null
	};
};

export const getUserPosts = user => {
	const request = axios
		.get(`/api/user_posts?user=${user}`)
		.then(res => res.data);

	return {
		type: 'USER_POSTS',
		payload: request
	};
};

export const getEditBook = id => {
	const request = axios.get(`/api/book?id=${id}`).then(res => res.data);

	return {
		type: 'GET_EDIT_BOOK',
		payload: request
	};
};

export const updateBook = data => {
	const request = axios.patch('/api/book_update', data).then(res => res.data);

	return {
		type: 'UPDATE_BOOK',
		payload: request
	};
};

export const clearEditBook = () => {
	return {
		type: 'CLEAR_EDIT_BOOK',
		payload: {
			book: null,
			updateBook: false,
			deletedBook: false
		}
	};
};

export const deleteBook = id => {
	const request = axios
		.delete(`/api/book_delete?id=${id}`)
		.then(res => res.data);

	return {
		type: 'DELETE_BOOK',
		payload: request
	};
};

export const getUsers = () => {
	const request = axios.get('/api/users').then(res => res.data);
	return {
		type: 'GET_USERS',
		payload: request
	};
};

export const registerUser = (user, userList) => {
	const request = axios.post('/api/register', user);

	return dispatch => {
		request.then(({ data }) => {
			let users = data.success ? [...userList, data.user] : userList;
			let response = {
				success: data.success,
				users
			};

			dispatch({
				type: 'REGISTER_USER',
				payload: response
			});
		});
	};
};
