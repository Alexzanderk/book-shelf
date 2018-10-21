import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addBook, clearNewBook } from '../../actions';

class AddBook extends Component {
	state = {
		formData: {
			name: '',
			author: '',
			review: '',
			pages: '',
			ratings: '',
			price: ''
		}
    };
    
    componentWillUnmount() {
        this.props.dispatch(clearNewBook());
    }

	handleInput = (event, name) => {
		const newFormData = { ...this.state.formData };
		newFormData[name] = event.target.value;
		this.setState({ formData: newFormData });
	};

	submitForm = e => {
		e.preventDefault();
		this.props.dispatch(
			addBook({
				...this.state.formData,
				ownerId: this.props.user.login.id
			})
		);
	};

    showNewBook = (book) => (
        book.post ? 
            <div className='conf_link'>
                <Link to={`/books/${book.bookId}`}>
                    Go to the book!
                </Link>
            </div>
        :null
    )

	render() {
		return (
			<div className="rl_container article">
				<form onSubmit={this.submitForm}>
					<h2>Add a review</h2>
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

					<button type="submit">Add Review</button>

                    {
                        this.props.books.newBook ? 
                            this.showNewBook(this.props.books.newBook)
                        :null
                    }
				</form>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return { books: state.books };
};

export default connect(mapStateToProps)(AddBook);
