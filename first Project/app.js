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
        
        myMap.flyTo([lati, long], 5, {
            duration: 3
        });
    }).addTo(myMap);
}


function generateList() {
    const list = document.querySelector('.selectitems');
    
    countryList.sort(function (a, b) {
      if (a.properties.country < b.properties.country) {
        return -1;
      }
      if (a.properties.country > b.properties.country) {
        return 1;
      }
      return 0;
    });
    weatherbutton=null;
    currencybutton=null;
    detailsbutton=null;
    countryList.forEach((country) => {
        
      
      const a=document.createElement('option');
      //const p=document.createElement('p');
      
      
      
      
      
      
      a.classList.add('country-item');
      
      countries=country.properties.country;
      a.innerText =countries ;
      a.value =countries
     
      
      
      
  
      //div.appendChild(p);
      
    list.appendChild(a);
    
      
    });
    //flying to the country on user click on country
    list.addEventListener('change', () => {
        if (weatherbutton) {
            myMap.removeControl(weatherbutton);
            myMap.removeControl(currencybutton);
            myMap.removeControl(detailsbutton);
            weatherbutton = null
          }
          const selectedCountry = countryList.find( countryObj => 
            countryObj.properties.country === list.value);
            //getting the polygon list from selected country geojson
            const polygonCountry = storeList.find( countryObj => 
                countryObj.properties.name === list.value);
          
                

                
        
          flyToStore(selectedCountry);
          //displaying polygon of country 
        
          const city=selectedCountry.properties.city;
          const currency1=selectedCountry.properties.currency;
          const contry=selectedCountry.properties.country;
          
          weatherbutton= L.easyButton('fa-solid fa-cloud fa-lg',function (){
           weatherdetails(city);
           $('#weathermodal').modal('show');
        
        }).addTo(myMap);
         currencybutton=L.easyButton('fa fa-dollar fa-lg',function (){
            currencyexchange(currency1);
            $('#myModal').modal('show');
         
         }).addTo(myMap);
         detailsbutton= L.easyButton('fa fa-info-circle fa-lg',function (){
            moredetails(contry);
            $('#detailsmodal').modal('show');
         
         }).addTo(myMap);
         
          
         
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
                $('#city').html(city);
               $('#temprature').html(JSON.stringify(result['data']['temp_c']));
               $('#forecast').html(JSON.stringify(result['data']['condition']['text']).slice(1,-1));
               $('#windspeed').html(JSON.stringify(result['data']['wind_kph']));
               $('#time').html(JSON.stringify(result['data2']['localtime']).slice(1, -1));
               const url=JSON.stringify(result['data']['condition']['icon']).slice(1, -1);

               
               document.getElementById("weathericon").src = "https:"+url;
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
                $('#official').html(JSON.stringify(result['data'][0]['name']['official']).slice(1,-1));
               $('#Languages').html(JSON.stringify(result['data'][0]['languages']).replace(/['"]+/g, '').slice(1,-1));
               $('#Population').html(JSON.stringify(result['data'][0]['population']));
               $('#Area').html(JSON.stringify(result['data'][0]['area']));
               $('#Continent').html(JSON.stringify(result['data'][0]['continents']).slice(2,-2));
               const url2=JSON.stringify(result['data'][0]['flags']['svg']).slice(1,-1);
               
               document.getElementById("flag").src = url2;
              
                

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
                $("#currencycode").html(currency1);
               $('#exchangedata').html(JSON.stringify(result['data'],null, 4).replace(/['"]+/g, '').slice(1,-1).split(",").join("<br /><hr/>"));
                

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
    iconUrl: 'icons/flagmarker.png',
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
        return L.marker(latlng,{icon:myIcon});
    }
}

);
countryLayer.addTo(myMap);
//creating a fly animation on click on country
function flyToStore(store) {
    const lat = store.geometry.coordinates[1];
    const lng = store.geometry.coordinates[0];
    myMap.flyTo([lat, lng], 6, {
        duration: 3
    });
    setTimeout(() => {
        L.popup({closeButton: false, offset: L.point(0, -8)})
        .setLatLng([lat, lng])
        .setContent(makePopupContent(store))
        .openOn(myMap);
    }, 3000);
}

 



