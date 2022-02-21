
var responseData;

function clearAllLi(){
    let uo_List = document.getElementById('uoList');
    let allLi = document.getElementsByTagName('li');
    console.log("allLi object", allLi);
    for(let i=0; i<allLi.length; i++){
        uo_List.removeChild(allLi[i]);
        i--;
    }
}

// for the auto suggessions
function suggestions(data){
    clearAllLi();
    let uo_List = document.getElementById('uoList');
    let xhrSearchRequest = new XMLHttpRequest();
    xhrSearchRequest.onload = function(){
        responseData = JSON.parse(xhrSearchRequest.response);
        console.log("From suggestions" ,responseData);
        if(!responseData.Error){
            let createLi = document.createElement('li');
            createLi.innerText = responseData.Title;
            uo_List.appendChild(createLi);
            createLi.addEventListener('click', function(){
                document.getElementById('inputText').value = this.innerText;
                fetch_movies_list(this.innerText);
            })
        }
    }
    xhrSearchRequest.open('get', `http://www.omdbapi.com/?t=${data}&apikey=4dd18108`, true);
    xhrSearchRequest.send();
}

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

// for adding in favourite list using local storage
function addingToFav(task){
    localStorage.setItem(task.Title, task.Title);
}

// for removing in favourite list using local storage
function removeFromFav(data){
    localStorage.removeItem(data);
}

// for creating card on home page
let createTaskCard = (task) => {

    let card = document.createElement('div');
    card.className = 'card shadow m-2';
    card.style.maxWidth = "540px";

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
    div2.addEventListener('click', function(){
        if(!isFilled){
            addingToFav(task);
            isFilled = isFav(task, div2);
        }else{
            removeFromFav(task.Title);
            isFilled = isFav(task, div2);
        }
    });
    
    let title = document.createElement('a');
    title.setAttribute('href', 'moviePage.html');
    title.setAttribute('target', '_blank');
    title.innerText = task.Title;
    title.addEventListener('click', function(){
        localStorage.setItem('movieDetail', JSON.stringify(task));
    })
    title.className = 'card-title fs-3';
    div1.appendChild(title);
  
    let plot = document.createElement('p');
    plot.innerText = task.Plot;
    plot.className = 'card-text';
  
    cardBody.appendChild(titleDiv);
    cardBody.appendChild(plot);
    card.appendChild(row);
    row.appendChild(imgCol);
    imgCol.appendChild(crt_image);
    row.appendChild(contentCol);
    contentCol.appendChild(cardBody);
    cardContainer.appendChild(card);

    input_text.value = "";
  }

// Fetching the movie from OMDB API
function fetch_movies_list(data){
    let xhrRequest = new XMLHttpRequest();
    xhrRequest.onload = function(){
        console.log(xhrRequest.response);
        var responseData = JSON.parse(xhrRequest.response);
        if(responseData.Error){
            alert(responseData.Error);
        }else{
            createTaskCard(responseData);
        }
        clearAllLi();
    }

    xhrRequest.open('get', 'http://www.omdbapi.com/?t=' + data + '&apikey=4dd18108', true);
    xhrRequest.send();
    // window.open('http://www.omdbapi.com/?t=' + data + '&apikey=4dd18108');
}

// for sending the data of input tag to the API
let input_text = document.getElementById('inputText');
console.log(input_text, "ByElement");
input_text.addEventListener('input', function(event){
    console.log("event", event);
    if(event.key == 'Enter'){
        fetch_movies_list(input_text.value);
    }else{
        if(!input_text.value){
            clearAllLi();
        }else{
            suggestions(input_text.value);
        }
        
    }
});











        // let image_div = document.getElementById('imageDiv');
        // console.log(image_div, "manish");
        // let crt_image = document.createElement('img');
        // crt_image.setAttribute('src', posterUrl);
        // image_div.appendChild(crt_image);