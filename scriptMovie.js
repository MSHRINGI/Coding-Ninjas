
// fetching the movie details which needs to show from local storage 
let movieData = localStorage.getItem('movieDetail');
movieData = JSON.parse(movieData);

// for checking the movie is favourite or not
// if yes than fetch favourite icon accordingly
function isFav(task, div2){
    for(let i=0; i<localStorage.length; i++){
        if(localStorage.key(i) == task.Title){
            div2.innerHTML = "<i class='fas fa-heart'></i>";
            return true;
        }else{
            div2.innerHTML = "<i class='far fa-heart'></i>";
        }
    }
    return false;
}

// for adding to the Favourite list
function addingToFav(task){
    localStorage.setItem(task.Title, task.Title);
    console.log(localStorage);
}

// for removing the favourite list
function removeFromFav(data){
    localStorage.removeItem(data);
}

// for showing the movie details using Bootstrap Card
let createTaskCard = (task) => {

    let card = document.createElement('div');
    card.className = 'card shadow m-2';

    let row = document.createElement('div')
    row.className = 'row g-0';

    let imgCol = document.createElement('div');
    imgCol.className = 'col-md-4';
    let posterUrl = task.Poster;
    let crt_image = document.createElement('img');
    crt_image.setAttribute('src', posterUrl);
    crt_image.className = 'img-fluid rounded-start';

    let contentCol = document.createElement('div');
    contentCol.className = 'col-md-8';
  
    let cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    let titleDiv = document.createElement('div');
    titleDiv.className = 'd-flex justify-content-between';

    let div1 = document.createElement('div');
    titleDiv.appendChild(div1);

    let div2 = document.createElement('button');
    div2.className = 'btn btn-warning fs-5 ml-4';
    titleDiv.appendChild(div2);
    let isFilled = isFav(task, div2);
    
    // for adding and removing movie from my favourite list through fav icon
    div2.addEventListener('click', function(){
        if(!isFilled){
            addingToFav(task);
            isFilled = isFav(task, div2);
        }else{
            removeFromFav(task.Title);
            isFilled = isFav(task, div2);
        }
    });
  
    let title = document.createElement('h2');
    title.innerText = task.Title;
    title.className = 'card-title';
    div1.appendChild(title);
  
    let plot = document.createElement('p');
    let plotSpan1 = document.createElement('span');
    plotSpan1.className = 'fs-5 fw-bold';
    plotSpan1.innerText = 'Plot : ';
    let plotSpan2 = document.createElement('span');
    plotSpan2.innerText =  task.Plot;
    plot.appendChild(plotSpan1);
    plot.appendChild(plotSpan2);
    plot.className = 'card-text m-2';

    let actors = document.createElement('p');
    let actSpan1 = document.createElement('span');
    actSpan1.className = 'fs-5 fw-bold';
    actSpan1.innerText = 'Actors : ';
    let actSpan2 = document.createElement('span');
    actSpan2.innerText =  task.Actors;
    actors.appendChild(actSpan1);
    actors.appendChild(actSpan2);
    actors.className = 'card-text m-2';

    let director = document.createElement('p');
    let dirSpan1 = document.createElement('span');
    dirSpan1.className = 'fs-5 fw-bold';
    dirSpan1.innerText = 'Director : ';
    let dirSpan2 = document.createElement('span');
    dirSpan2.innerText =  task.Director;
    director.appendChild(dirSpan1);
    director.appendChild(dirSpan2);
    director.className = 'card-text m-2';

    let released = document.createElement('p');
    let releasedSpan1 = document.createElement('span');
    releasedSpan1.innerText = 'Released : ';
    releasedSpan1.className = 'fs-5 fw-bold';
    let releasedSpan2 = document.createElement('span');
    releasedSpan2.innerText = task.Released;
    released.appendChild(releasedSpan1);
    released.appendChild(releasedSpan2);
    released.className = 'card-text m-2';

    let language = document.createElement('p');
    let lanSpan1 = document.createElement('span');
    lanSpan1.innerText = 'Language : ';
    lanSpan1.className = 'fs-5 fw-bold';
    let lanSpan2 = document.createElement('span');
    lanSpan2.innerText = task.Language;
    language.appendChild(lanSpan1);
    language.appendChild(lanSpan2);
    language.className = 'card-text m-2';

    let country = document.createElement('p');
    let countrySpan1 = document.createElement('span');
    countrySpan1.innerText = 'Country : ';
    countrySpan1.className = 'fs-5 fw-bold';
    let countrySpan2 = document.createElement('span');
    countrySpan2.innerText = task.Country;
    country.appendChild(countrySpan1);
    country.appendChild(countrySpan2);
    country.className = 'card-text m-2';

    let rating = document.createElement('p');
    let ratingSpan1 = document.createElement('span');
    ratingSpan1.className = 'fs-5 fw-bold';
    ratingSpan1.innerText = 'IMDb Rating : ';
    let ratingSpan2 = document.createElement('span');
    ratingSpan2.innerText =  task.imdbRating;
    rating.appendChild(ratingSpan1);
    rating.appendChild(ratingSpan2);
    rating.className = 'card-text m-2';
  
    cardBody.appendChild(titleDiv);
    cardBody.appendChild(plot);
    cardBody.appendChild(actors);
    cardBody.appendChild(director);
    cardBody.appendChild(released);
    cardBody.appendChild(language);
    cardBody.appendChild(country);
    cardBody.appendChild(rating);
    card.appendChild(row);
    row.appendChild(imgCol);
    imgCol.appendChild(crt_image);
    row.appendChild(contentCol);
    contentCol.appendChild(cardBody);

    let cardContainer = document.getElementById('cardContainer');
    cardContainer.appendChild(card);
}

createTaskCard(movieData);