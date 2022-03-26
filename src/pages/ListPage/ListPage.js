import React, { Component } from 'react';
import './ListPage.css';

class ListPage extends Component {
    state = {
        movies: [],
        title: '',
        movieIds: []
    }
    componentDidMount() {
        const apiKey = '5771d268';
        const id = this.props.match.params.id;
        fetch(`https://acb-api.algoritmika.org/api/movies/list/${id}`,{
                method: 'GET',
                headers: {
                    'Content-type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                this.setState({title: data.title})
                this.setState({moviesId: data.movies})
                data.movies.forEach(elem => {
                    fetch(`http://www.omdbapi.com/?i=${elem}&apikey=${apiKey}`)
                        .then(res => res.json())
                        .then(data => {
                            this.setState({movies: [...this.state.movies, data]})
                        })
                        .catch(error => {
                            console.log(`Произошла ошибка: ${error.message}`);
                        })
                })
            })
            .catch(error => {
                console.log(`Произошла ошибка: ${error.message}`);
            })
    }
    render() {
        const exist =  this.state.moviesId && this.state.moviesId.length > 0;
        return (
            <>
                <div className="list-page">
                    <h1 className="list-page__title">{exist ? this.state.title : 'Loading...'}</h1>
                    {exist ?
                    <ul>
                        {this.state.moviesId.map((item) => {
                            let movie =  this.state.movies.find((s)=>{return s.imdbID == item});
                            return (
                                <>
                                    {movie ?
                                    <li key={movie.imdbID}>
                                        <a href={"https://www.imdb.com/title/" + movie.imdbID} target="_blank" rel="noopener noreferrer">{movie.Title} ({movie.Year})</a>
                                    </li>  :
                                    <p>Loading...</p>
                                    }
                                </>
                            );
                        })}
                    </ul> :
                    <></>
                    }
                </div>
            </>
        );
    }
}
 
export default ListPage;