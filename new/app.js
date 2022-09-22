//Initializing the view of Map
const myMap = L.map('map').setView([52.3555, 1.1743], 4);
//getting map tile from open source free openstreetmap tile provider
const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
//setting attribution at bottom
const attribution =
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> ';
        //adding attribution layer to map
const tileLayer = L.tileLayer(tileUrl, { attribution });
tileLayer.addTo(myMap);

//getting current location of user through navigator command and geolocation
function getPreciseLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showExactPosition)
    }else{
        x.innerHTML = "Geolocation is not supported"
    }
}
//adding highlighted circle to the currenct location of user
function showExactPosition(position){
    const lati=position.coords.latitude;
    const long=position.coords.longitude;
    const Clayer=L.circle([lati,long],{radius:90000,color:"coral"});
    Clayer.addTo(myMap);
    //addding button that on click will fly to users current location
    L.easyButton('fa-crosshairs fa-lg',function(){
        
        myMap.flyTo([lati, long], 14, {
            duration: 3
        });
    }).addTo(myMap);
}

//generating countries list showed on right menu from geoJson file
function generateList() {
  const ul = document.querySelector('.list');
  countryList.forEach((country) => {
    const li = document.createElement('li');
    const div = document.createElement('div');
    const a = document.createElement('a');
    const p = document.createElement('p');
    //flying to the country on user click on country
    a.addEventListener('click', () => {
        flyToStore(country);
    });
    div.classList.add('country-item');
    a.innerText = country.properties.country;
    a.href = '#';
    

    div.appendChild(a);
    
    li.appendChild(div);
    ul.appendChild(li);
  });
}

generateList();
//making popup content for each country
function makePopupContent(country) {
     

    return `
    <div>
        <h4>${country.properties.country}</h4>
        <p>Capital:${country.properties.city}</p>
        <p>Currency:${country.properties.currency}</p>
        <button onclick='currencyexchange("${country.properties.currency}")' type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal" style="margin-left:5px; margin-right:5px; margin-bottom:7px;">Get Exchange Rates</button>
        <button onclick='weatherdetails("${country.properties.city}")' type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#weathermodal" style="margin-left:5px; margin-right:5px; margin-bottom:7px;">Weather</button>
        <button onclick='moredetails("${country.properties.country}")' type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#detailsmodal" style="margin-left:5px; margin-right:5px; margin-bottom:7px;">More Details</button>
    </div>
  `
  
}
//getting weather details from api from php file by passing city name as attribute to Api
function weatherdetails(city){
    console.log(city);

    $.ajax({
        url: "php/weather.php",
        type: 'POST',
        dataType: 'json',
        data: {
            citi:city
            
        },
        //if user enters correct data and api gives back the data then we run success funtion
        success: function(result) {

            console.log(JSON.stringify(result));

            //if status of data is ok we fetch the data from fields and put them in results table in html
            if (result.status.name == "ok") {

                //fetching fields from api and showing them in html table
               $('#temprature').html(JSON.stringify(result['data']['temp_c']));
               $('#forecast').html(JSON.stringify(result['data']['condition']['text']));
               $('#windspeed').html(JSON.stringify(result['data']['wind_kph']));
               document.getElementById("weathericon").src = JSON.stringify(result['data']['condition']['icon']);
               $('#Humidity').html(JSON.stringify(result['data']['humidity']));
                

            }else{
                //if the upper condition  fails
                console.log("error");
               
            }
        
        },
        //if there is no success in retrieving data from api
        error: function(jqXHR, textStatus, errorThrown) {

            console.log("error");
            $('#txterror').html("Enter Valid Id");
        }
    }); 
}
//getting more details about the country using the restcountries api 
function moredetails(contry){
    console.log(contry);
  
    
    $.ajax({
        url: "php/rest.php",
        type: 'POST',
        dataType: 'json',
        data: {
            country:contry
            
        },
        //if user enters correct data and api gives back the data then we run success funtion
        success: function(result) {

            console.log(JSON.stringify(result));

            //if status of data is ok we fetch the data from fields and put them in results table in html
            if (result.status.name == "ok") {

                //fetching fields from api and showing them in html table
                $('#official').html(JSON.stringify(result['data'][0]['name']['official']));
               $('#Languages').html(JSON.stringify(result['data'][0]['languages']));
               $('#Population').html(JSON.stringify(result['data'][0]['population']));
               $('#Area').html(JSON.stringify(result['data'][0]['area']));
               $('#Continent').html(JSON.stringify(result['data'][0]['continents']));
               
               document.getElementById("flag").src = JSON.stringify(result['data'][0]['flags']['svg']);
               document.getElementById("flag").srcset = JSON.stringify(result['data'][0]['flags']['svg']);
                

            }else{
                //if the upper condition  fails
                console.log("error");
               
            }
        
        },
        //if there is no success in retrieving data from api
        error: function(jqXHR, textStatus, errorThrown) {

            console.log("error");
            $('#txterror').html("Enter Valid Id");
        }
    }); 
}
//getting exchange rates from currency exchange api
function currencyexchange(currency1){
    console.log(currency1);
    
    $.ajax({
        url: "php/currency.php",
        type: 'POST',
        dataType: 'json',
        data: {
            code:currency1
            
        },
        //if user enters correct data and api gives back the data then we run success funtion
        success: function(result) {

            console.log(JSON.stringify(result),null,4);

            //if status of data is ok we fetch the data from fields and put them in results table in html
            if (result.status.name == "ok") {

                //fetching fields from api and showing them in html table
               $('#exchangedata').html(JSON.stringify(result['data']),null,4);
                

            }else{
                //if the upper condition  fails
                console.log("error");
               
            }
        
        },
        //if there is no success in retrieving data from api
        error: function(jqXHR, textStatus, errorThrown) {

            console.log("error");
            $('#txterror').html("Enter Valid Id");
        }
    }); 

}
//binding popup on each country
function onEachFeature(feature, layer) {
    layer.bindPopup(makePopupContent(feature), { closeButton: false, offset: L.point(0, -8) });
}

var myIcon = L.icon({
    iconUrl: 'marker.png',
    iconSize: [30, 40]
});
//getting boundries of countries using geojson file
const countrysLayer = L.geoJSON(storeList, {
    
    // onEachFeature: onEachFeature,
    // pointToLayer: function(feature, [lat,lng]) {
    //     return L.marker([lat,lng], { icon: myIcon });
    // }
}

);
countrysLayer.addTo(myMap);
//adding marker to the capital of each country based on latitude and longitude 
const countryLayer = L.geoJSON(countryList, {
    
    onEachFeature: onEachFeature,
    pointToLayer: function(feature, latlng) {
        return L.marker(latlng);
    }
}

);
countryLayer.addTo(myMap);
//creating a fly animation on click on country
function flyToStore(store) {
    const lat = store.geometry.coordinates[1];
    const lng = store.geometry.coordinates[0];
    myMap.flyTo([lat, lng], 14, {
        duration: 3
    });
    setTimeout(() => {
        L.popup({closeButton: false, offset: L.point(0, -8)})
        .setLatLng([lat, lng])
        .setContent(makePopupContent(store))
        .openOn(myMap);
    }, 3000);
}

 



