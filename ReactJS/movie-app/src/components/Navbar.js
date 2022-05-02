import React from "react";
import "../index.css"
import { addMovieToList, handleMovieSearch } from "../actions"

class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // showSearchResults: true,
            searchText: ''
        }
    }

    handleAddToMovies = (movie) => {
        this.props.dispatch(addMovieToList(movie));
    }

    handleSearch = () => {
        const { searchText } = this.state;
        console.log("THIS>PROPS", this.props);
        this.props.dispatch(handleMovieSearch(searchText));
    }

    handleChange = (e) => {
        this.setState({
            searchText: e.target.value
        })
    }

    render() {
        const { results: movie, showSearchResults } = this.props.search;
        return (
            <div className="nav">
                <div className="search-container">
                    <input onChange={this.handleChange} />
                    <button id="search-btn" onClick={this.handleSearch}>Search</button>
                </div>
                {showSearchResults &&
                    <div className="search-results">
                        <div className="search-result">
                            <img src= {movie.Poster} alt="search-movie"/>
                            <div className="movie-info">
                                <span>{ movie.Title }</span>
                                <button onClick={() => this.handleAddToMovies(movie)}> Add to Movies</button>
                            </div>
                        </div>
                    </div>
                }
            </div>
        )
    }
}

export default Navbar;