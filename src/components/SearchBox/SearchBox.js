import React, { Component} from 'react';
import './SearchBox.css';
import { addMovies } from '../../redux/Actions';
import { connect } from 'react-redux';

class SearchBox extends Component {
    state = {
        searchLine: ''
    }
    searchLineChangeHandler = (e) => {
        this.setState({ searchLine: e.target.value });
    };
    searchBoxSubmitHandler = async (e) => {
        e.preventDefault();
        let searchText = this.state.searchLine;
        const key = '5771d268';
        fetch(`http://www.omdbapi.com/?s=${searchText}&apikey=${key}`)
        .then((res) => res.json())
        .then((data) => {
            this.props.dispatch(addMovies(data.Search));
        })
        .catch(error => {
            console.log(`Произошла ошибка: ${error.message}`);
        });
    };
    render() {
        const { searchLine } = this.state;
        return (
            <div className="search-box">
                <form className="search-box__form" onSubmit={this.searchBoxSubmitHandler}>
                    <label className="search-box__form-label">
                        Искать фильм по названию:
                        <input
                            value={searchLine}
                            type="text"
                            className="search-box__form-input"
                            placeholder="Например, Shawshank Redemption"
                            onChange={this.searchLineChangeHandler}
                        />
                    </label>
                    <button
                        type="submit"
                        className="search-box__form-submit"
                        disabled={!searchLine}
                    >
                        Искать
                    </button>
                </form>
            </div>
        );
    }
}
 
const mapStateToProps = (state) => {
  return {
    movies: state.movies,
  };
};

export default connect(mapStateToProps)(SearchBox);