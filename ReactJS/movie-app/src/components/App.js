import React from 'react';
import MovieCard from './MovieCard';
import Navbar from './Navbar';
import { data } from '../data';
import { addMovies, setShowFavourites } from '../actions'

class App extends React.Component {
  componentDidMount(){
    const { store } = this.props;
    console.log("Store from app.js", store);

    store.subscribe(() => {
      console.log("UPDATED");
      this.forceUpdate();
    })

    store.dispatch(addMovies(data));
    console.log("DISPATCHED", store.getState());
  }
  isMovieFavourite = (movie) => {
    const { favourites } = this.props.store.getState();
    const index = favourites.indexOf(movie);

    if(index !== -1){
      // movie found
      return true;
    }
    return false;
  }
  changeTab = (val) => {
    const { store } = this.props;
    store.dispatch(setShowFavourites(val));
  }
  render(){
    console.log("RenDER", this.props.store.getState());
    const { list, favourites, showFavourites } = this.props.store.getState();
    const displayMovie = showFavourites ? favourites : list
    return (
      <div className="App">
        <Navbar />
        <div className='main'>
          <div className='tabs'>
            <div className={`tab ${showFavourites ? '' : 'active-tabs'}`} onClick={() => this.changeTab(false)}>Movies</div>
            <div className={`tab ${showFavourites ? 'active-tabs' : ''}`} onClick={() => this.changeTab(true)}>Favourites</div>
          </div>
          <div className='list'>
            {displayMovie.map((movie, index) => (
              <MovieCard
                movie={movie}
                key={`Movie-${index}`}
                dispatch={this.props.store.dispatch}
                isMovieFavourite={this.isMovieFavourite(movie)}
              />
            ))}
          </div>
          { displayMovie.length === 0 ? <div className='no-movies'>No movies to display!</div> : null}
        </div>
      </div>
    );
  }
}

export default App;
