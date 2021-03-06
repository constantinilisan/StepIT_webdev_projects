var selectContainer = document.getElementById("breedSelect");
var imageContainer = document.getElementById("kittenPic");
var sideBreedData = document.getElementById("breedInfo");

//Getting a random cat image and populating options for Select with breeds names
function getBreeds(){
    return fetch("https://api.thecatapi.com/v1/breeds", {
        method: "GET",
        mode: "cors",
        headers: {
        "x-api-key": "8b7a9ba3-b98b-4c7d-90b8-080251ad7512",
        }
    })
        .then(res => res.json())
}

function getPic(){
    return fetch("https://api.thecatapi.com/v1/images/search", {
        method: "GET",
        mode: "cors",
        headers: {
        "x-api-key": "8b7a9ba3-b98b-4c7d-90b8-080251ad7512",
        }
    })
    .then(res => res.json())
}

getBreeds().then(data => {
    //console.log(data[0].name, data[0].adaptability, data.length);
    populateSelection(data);
});

getPic().then(data => {
    //console.log(data[0].url);
    displayPic(data);
});

function displayPic(object){
    //console.log(object[0]);
    var image = document.createElement("img");
    image.id = "randomCat";
    image.src = object[0].url;
    image.alt = "Nice kitty";
    imageContainer.appendChild(image);
};

function populateSelection(array){
    array.forEach(element => {
        var selectOption = document.createElement("option");
        selectOption.textContent = element.name;
        selectContainer.appendChild(selectOption);
    });
};
//Clicking on a pic will randomly get another pic for that breed. We will also update the breed info side
/*
"origin":"Egypt"
"weight_imperial":"7  -  10",
"adaptability":5,
"affection_level":5,
"child_friendly":3,
"dog_friendly":4,
"energy_level":5,
"grooming":1,
"health_issues":2,
"intelligence":5,
"shedding_level":2,
"social_needs":5,
"stranger_friendly":5,
"vocalisation":1*/
function drawStars(value){
    var string='';
    for(var i=0;i<value;i++)
        string += "*";
    return string;
}
function putBreedinfo(object){
    //sideBreedData.innerHTML='';
    while (sideBreedData.childNodes.length > 2) {
        sideBreedData.removeChild(sideBreedData.lastChild);
    }
    sideBreedData
    var sideBreedDataItem = document.createElement("li");                            
    sideBreedDataItem.textContent = "Origin: " + object.origin;                
    sideBreedData.appendChild(sideBreedDataItem);
    var sideBreedDataItem = document.createElement("li");                            
    sideBreedDataItem.textContent = "Weight: " + object.weight_imperial + " pounds";                
    sideBreedData.appendChild(sideBreedDataItem);
    var sideBreedDataItem = document.createElement("li");                            
    sideBreedDataItem.textContent = "Affection: " + drawStars(object.affection_level);                
    sideBreedData.appendChild(sideBreedDataItem);
    var sideBreedDataItem = document.createElement("li");                            
    sideBreedDataItem.textContent = "Child Friendly: " + drawStars(object.child_friendly);                
    sideBreedData.appendChild(sideBreedDataItem);
    var sideBreedDataItem = document.createElement("li");                            
    sideBreedDataItem.textContent = "Intelligence " + drawStars(object.intelligence);                
    sideBreedData.appendChild(sideBreedDataItem);
};

selectContainer.addEventListener("change", (event) => {
    imageContainer.removeChild(imageContainer.firstChild);
    getBreeds().then(data => {
        data.forEach(elem =>{
            if (elem.name === event.target.value){
                putBreedinfo(elem);
                //console.log("https://api.thecatapi.com/v1/images/search?breed_id="+elem.id);
                fetch("https://api.thecatapi.com/v1/images/search?breed_id="+elem.id, {
                    method: "GET",
                    mode: "cors",
                    headers: {
                    "x-api-key": "8b7a9ba3-b98b-4c7d-90b8-080251ad7512",
                    }
                })
                    .then(res => res.json())
                    .then(data => displayPic(data))                             
            }
        });
    });
});

imageContainer.addEventListener("click", () =>{
    imageContainer.removeChild(imageContainer.firstChild);
    getBreeds().then(data => {
        data.forEach(elem =>{
            if (elem.name === selectContainer.value){
                //console.log("https://api.thecatapi.com/v1/images/search?breed_id="+elem.id);
                fetch("https://api.thecatapi.com/v1/images/search?breed_id="+elem.id, {
                    method: "GET",
                    mode: "cors",
                    headers: {
                    "x-api-key": "8b7a9ba3-b98b-4c7d-90b8-080251ad7512",
                    }
                })
                    .then(res => res.json())
                    .then(data => displayPic(data))                             
            }
        });
    });
});