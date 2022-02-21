
// fetching the movies details from the local Storage
let movieData = localStorage.getItem('movieDetail');
movieData = JSON.parse(movieData);

// for S.No.
let count = 1;

// for removing the table
function removeFromTable(data){
    localStorage.removeItem(data);
    location.reload();
}

// for adding in the table
function addToTable(i){
    let tableRow = document.createElement('tr');

    let tableData1 = document.createElement('td');
    tableData1.innerText = count++;
    tableRow.appendChild(tableData1);

    let tableData2 = document.createElement('td');
    tableData2.innerText = localStorage.getItem(localStorage.key(i-1));
    tableRow.appendChild(tableData2);

    // for deleting from the table
    let tableData3 = document.createElement('td');
    let removeBtn = document.createElement('button');
    removeBtn.className = "btn btn-danger";
    removeBtn.innerHTML = "<i class='fas fa-trash-alt'>";

    tableData3.appendChild(removeBtn);
    tableRow.appendChild(tableData3);

    removeBtn.addEventListener('click',function(){
        removeFromTable(localStorage.key(i-1));
    })

    let tableBody = document.getElementById('table_body');
    tableBody.className = "align-middle"
    tableBody.appendChild(tableRow);
}

// Iterating over the local storage
for(let i=1; i<=localStorage.length; i++){
    if(localStorage.key(i-1) == 'movieDetail'){
        continue;
    }else{
        addToTable(i);
    }
}
    