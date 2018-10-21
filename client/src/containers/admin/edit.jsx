import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getEditBook, updateBook, clearEditBook, deleteBook } from '../../actions';

class EditBook extends PureComponent {
	state = {
		formData: {
			_id: this.props.match.params.id,
			name: '',
			author: '',
			review: '',
			pages: '',
			ratings: '',
			price: ''
		}
	};

	handleInput = (event, name) => {
		const newFormData = { ...this.state.formData };
		newFormData[name] = event.target.value;
		this.setState({ formData: newFormData });
	};

	submitForm = e => {
		e.preventDefault();
		this.props.dispatch(updateBook(this.state.formData));
	};

	deletePost = () => {
		this.props.dispatch(deleteBook(this.props.match.params.id));
	};

	redirectUser = () => {
		setTimeout(() => {
			this.props.history.push('/user/reviews');
		}, 2000);
	};

	componentWillMount() {
		this.props.dispatch(getEditBook(this.props.match.params.id));
	}

	componentWillReceiveProps(nextProps) {
		let book = nextProps.books.book;
		this.setState({
			formData: {
				_id: book._id,
				name: book.name,
				author: book.author,
				review: book.review,
				pages: book.pages,
				ratings: book.ratings,
				price: book.price,
				ownerId: book.ownerId
			}
		});
    }
    
    componentWillUnmount() {
        this.props.dispatch(clearEditBook());
    }

	render() {
		let books = this.props.books;
		return (
			<div className="rl_container article">
				{books.updateBook ? (
					<div className="edit_confirm">
						Post uodated,{' '}
						<Link to={`/books/${books.book._id}`}>
							click to see post
						</Link>
					</div>
				) : null}

				{books.deletedBook ? (
					<div className="red_tag">
						POST DELETED
						{this.redirectUser()}
					</div>
				) : null}

				<form onSubmit={this.submitForm}>
					<h2>Edit review</h2>
					<div className="form_element">
						<input
							type="text"
							placeholder="Enter your name"
							value={this.state.formData.name}
							onChange={event => this.handleInput(event, 'name')}
						/>
					</div>
					<div className="form_element">
						<input
							type="text"
							placeholder="Enter author"
							value={this.state.formData.author}
							onChange={event =>
								this.handleInput(event, 'author')
							}
						/>
					</div>
					<textarea
						value={this.state.formData.review}
						onChange={event => this.handleInput(event, 'review')}
					/>
					<div className="form_element">
						<input
							type="number"
							placeholder="Enter pages"
							value={this.state.formData.pages}
							onChange={event => this.handleInput(event, 'pages')}
						/>
					</div>
					<div className="form_element">
						<select
							value={this.state.formData.ratings}
							onChange={event =>
								this.handleInput(event, 'ratings')
							}
						>
							<option value="1">1</option>
							<option value="2">2</option>
							<option value="3">3</option>
							<option value="4">4</option>
							<option value="5">5</option>
						</select>
					</div>
					<div className="form_element">
						<input
							type="number"
							placeholder="Enter price"
							value={this.state.formData.price}
							onChange={event => this.handleInput(event, 'price')}
						/>
					</div>
					<button type="submit">Edit Review</button>
					<div className="delete_post">
						<div className="button" onClick={this.deletePost}>
							Delete Review
						</div>
					</div>
				</form>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return { books: state.books };
};

export default connect(mapStateToProps)(EditBook);
