import React from 'react';
import MovieCard from './MovieCard';
import Navbar from './Navbar';
import { data } from '../data';
import { addMovies, setShowFavourites } from '../actions';
// import { StoreContext } from '../index';
import { connect} from '../index';

class App extends React.Component {
  componentDidMount() {
    // const { dispatch } = this.props;
    // console.log("Store from app.js", store);

    // store.subscribe(() => {
    //   console.log("UPDATED");
    //   this.forceUpdate();
    // })

    this.props.dispatch(addMovies(data));
    // console.log("DISPATCHED", store.getState());
  }
  isMovieFavourite = (movie) => {
    const { movies } = this.props;
    const index = movies.favourites.indexOf(movie);

    if (index !== -1) {
      // movie found
      return true;
    }
    return false;
  }
  changeTab = (val) => {
    // const { dispatch } = this.props;
    this.props.dispatch(setShowFavourites(val));
  }
  render() {
    console.log("RenDER", this.props);
    const { movies } = this.props;
    const { list, favourites, showFavourites } = movies;
    const { search } = this.props;
    const displayMovie = showFavourites ? favourites : list;
    return (
      <div className="App">
        <Navbar search={search} />
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
                dispatch={this.props.dispatch}
                isMovieFavourite={this.isMovieFavourite(movie)}
              />
            ))}
          </div>
          {displayMovie.length === 0 ? <div className='no-movies'>No movies to display!</div> : null}
        </div>
      </div>
    );
  }
}

// class AppWrapper extends React.Component {
//   render() {
//     return (
//       <StoreContext.Consumer>
//         {
//           (store) => <App store={store} />
//         }
//       </StoreContext.Consumer>
//     )
//   }
// }

function mapStateToProps(state){
  return{
    movies: state.movies,
    search: state.search
  }
}

const connectAppComponent = connect(mapStateToProps)(App);

export default connectAppComponent;
