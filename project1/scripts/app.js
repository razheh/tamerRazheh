//Initializing the view of Map
const myMap = L.map('map').setView([52.3555, 1.1743], 7);
//getting map tile from open source free openstreetmap tile provider
const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
//setting attribution at bottom
const attribution =
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> ';
        //adding attribution layer to map
const tileLayer = L.tileLayer(tileUrl, { attribution });
tileLayer.addTo(myMap);
weatherbutton=null;
currencybutton=null;
detailsbutton=null;
holidaybutton=null;
newsbutton=null;
countrysLayer=null;
scCountry=null;


mlayer=null;
var markers = L.markerClusterGroup({
	iconCreateFunction: function(cluster) {
		return L.divIcon({ html: '<div class="markercluster"><h1>' + cluster.getChildCount() + '</h1></div>',className:"",  iconSize:[40, 40] });
	}
});;

//getting countries from php
$.ajax({
    url: "php/main.php",
    type: 'GET',
    dataType: 'json',
    
    
    
    success: function(result) {
        
        
        
        

        const list = document.querySelector('.selectitems');
        countries=result;
        countries.sort(function (a, b) {
            if (a.properties.name < b.properties.name) {
              return -1;
            }
            if (a.properties.name > b.properties.name) {
              return 1;
            }
            return 0;
          });

        
        countries.forEach((countri) => {
              const a=document.createElement('option');
      //const p=document.createElement('p');
      
      
      
      
      
      
      a.classList.add('country-item');
      
      countries=countri.properties.name;
      cvalue=countri.properties.iso_a3;
      a.innerText =countries ;
      a.value =cvalue;
     
      
      
      
  
      //div.appendChild(p);
      
    list.appendChild(a);
        })

        
    
    },
    
    error: function(jqXHR, textStatus, errorThrown) {

        console.log("error");
       
    }
}); 
//getting current location of user through navigator command and geolocation
function getPreciseLocation(){
    

    if(navigator.geolocation){
        console.log("success");
        navigator.geolocation.getCurrentPosition(success,err);
        
        
    }else{
        
        console.log("error");
    }
}
//adding highlighted circle to the currenct location of user
function success(position){
    const lati=position.coords.latitude;
    const long=position.coords.longitude;
    const Clayer=L.circle([lati,long],{radius:90000,color:"coral"});
    
    Clayer.addTo(myMap);
    myMap.flyTo([lati, long], 5, {
        duration: 3
    });
    //addding button that on click will fly to users current location
    L.easyButton('fa-crosshairs fa-lg',function(){
        
        myMap.flyTo([lati, long], 5, {
            duration: 3
        });
    }).addTo(myMap);

    $.ajax({
        url: "php/geonames.php",
        type: 'POST',
        dataType: 'json',
        data:{
        lt:lati,
        lg:long,
        },
        
        
        
        success: function(result) {
             scCountry=result['data']['countryCode'];
             sname=result['data']['countryName']
            
                console.log(scCountry);
                const option=document.querySelector(".default");
    option.innerHTML = sname;
            option.value=scCountry;
                
                $.ajax({
                    url: "php/capitals.php",
                    type: 'POST',
                    dataType: 'json',
                    data:{
                    country:scCountry
                    },
                    
                    
                    
                    success: function(result) {
                        const selectedCountry=result;
                        
                            console.log(selectedCountry);
                            const city=selectedCountry.properties.city;
                            const currency1=selectedCountry.properties.currency;
                            const contry=selectedCountry.properties.country;
                            const id=selectedCountry.id;
                            
                            
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
                           holidaybutton= L.easyButton('fas fa-glass-cheers',function (){
                              holidays(id);
                              $('#holidaymodal').modal('show');
                           
                           }).addTo(myMap);
                           newsbutton= L.easyButton('fa-solid fa-newspaper',function (){
                            newsdetails(contry);
                            $('#newsmodal').modal('show');
                         
                         }).addTo(myMap);

                         $.ajax({
                            url: "php/triposo.php",
                            type: 'POST',
                            dataType: 'json',
                            data:{
                                countrycode:scCountry
                    
                            },
                            
                            
                            
                            
                            success: function(result) {
                                
                                cdata=(result['data']);
                                console.log(cdata);
                                
                                
                                cdata.forEach((data)=>
                                {
                                    
                                    lat=data.coordinates.latitude;
                                    lng=data.coordinates.longitude;
                                     mlayer=L.marker([lat,lng],{icon:cityIcon});
                                     mlayer.bindPopup(makePopupContent(data), { closeButton: false, offset: L.point(0, -8) });
                                     L.popup({closeButton: false, offset: L.point(0, -8)})
                            .setLatLng([lat, lng])
                            .setContent(makePopupContent(data))
                            .openOn(myMap);
                        
                        markers.addLayer(mlayer);
                        
                    
                                })
                                myMap.addLayer(markers);
                            }
                        });
                         
                         
                        
                
                        
                    
                    },
                    
                    error: function(jqXHR, textStatus, errorThrown) {
                
                        console.log("error");
                        
                        
                       
                    }
                }); 
                $.ajax({
                    url: "php/singlecountry.php",
                    type: 'POST',
                    dataType: 'json',
                    data:{
                        country:scCountry
    
                    },
                    
                    
                    
                    success: function(result) {
                        
                        
                        
                        borderCountry= result;
                        
                        
                            console.log(borderCountry);
                   
                     countrysLayer = L.geoJSON(borderCountry, {color: "black", weight: 6}, {
                
                // onEachFeature: onEachFeature,
                // pointToLayer: function(feature, latlng) {
                //     return L.marker(latlng);
                // }
            }
            
            );
            countrysLayer.addTo(myMap);          
            myMap.fitBounds(countrysLayer.getBounds()) 
                        
                    
                    },
                    
                    error: function(jqXHR, textStatus, errorThrown) {
                
                        console.log("error");
                       
                    }
                }); 
                
            
    
            
    
            
        
        },
        
        error: function(jqXHR, textStatus, errorThrown) {
    
            console.log("error");
           
        }
    }); 
    
}
function err(){
    const option=document.querySelector(".default");
    option.innerHTML = "United Kingdom";
            option.value="GB";
            $.ajax({
                url: "php/capitals.php",
                type: 'POST',
                dataType: 'json',
                data:{
                country:"GBR"
                },
                
                
                
                success: function(result) {
                    const selectedCountry=result;
                    
                        console.log(selectedCountry);
                        const city=selectedCountry.properties.city;
                        const currency1=selectedCountry.properties.currency;
                        const contry=selectedCountry.properties.country;
                        const id=selectedCountry.id;
                        
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
                       holidaybutton= L.easyButton('fas fa-glass-cheers',function (){
                          holidays(id);
                          $('#holidaymodal').modal('show');
                       
                       }).addTo(myMap);
                       newsbutton= L.easyButton('fa-solid fa-newspaper',function (){
                        newsdetails(contry);
                        $('#newsmodal').modal('show');
                     
                     }).addTo(myMap);
            
                    
            
                    
                
                },
                
                error: function(jqXHR, textStatus, errorThrown) {
            
                    console.log("error");
                   
                }
            }); 
            
               $.ajax({
                url: "php/singlecountry.php",
                type: 'POST',
                dataType: 'json',
                data:{
                    country:"GBR"

                },
                
                
                
                success: function(result) {
                    
                    
                    
                    borderCountry= result;
                    
                    
                        console.log(borderCountry);
               
                 countrysLayer = L.geoJSON(borderCountry, {color: "black", weight: 6}, {
            
            // onEachFeature: onEachFeature,
            // pointToLayer: function(feature, latlng) {
            //     return L.marker(latlng);
            // }
        }
        
        );
        countrysLayer.addTo(myMap);          
        myMap.fitBounds(countrysLayer.getBounds()) 
                    
                
                },
                
                error: function(jqXHR, textStatus, errorThrown) {
            
                    console.log("error");
                   
                }
            }); 
            
        
            $.ajax({
                url: "php/triposo.php",
                type: 'POST',
                dataType: 'json',
                data:{
                    countrycode:"UK"
        
                },
                
                
                
                
                success: function(result) {
                    
                    cdata=(result['data']);
                    
                    
                    cdata.forEach((data)=>
                    {
                        
                        lat=data.coordinates.latitude;
                        lng=data.coordinates.longitude;
                         mlayer=L.marker([lat,lng],{icon:cityIcon});
                         mlayer.bindPopup(makePopupContent(data), { closeButton: false, offset: L.point(0, -8) });
                         L.popup({closeButton: false, offset: L.point(0, -8)})
                .setLatLng([lat, lng])
                .setContent(makePopupContent(data))
                .openOn(myMap);
            
            markers.addLayer(mlayer);
            
        
                    })
                    
                    
            
                    myMap.addLayer(markers);
            
                    
                    
            
                    
                
                },
                
                error: function(jqXHR, textStatus, errorThrown) {
            
                    console.log("error");
                   
                }
            }); 
               

}
window.addEventListener('load'      , getPreciseLocation()  );

function generateList() {
    const list = document.querySelector('.selectitems');
    
   $("#countryselect").change(function(){
    $.ajax({
        url:"php/capitals.php",
        type:"POST",
        dataType:"json",
        data:{
            country:list.value
        },
        success:function(result){
            
            const selectedCountry=result;
            console.log(selectedCountry);
            if (weatherbutton) {
                myMap.removeControl(weatherbutton);
                myMap.removeControl(currencybutton);
                myMap.removeControl(detailsbutton);
                myMap.removeControl(holidaybutton);
                myMap.removeControl(newsbutton);
                weatherbutton = null
              }
              if(countrysLayer){
                myMap.removeControl(countrysLayer);
                countrysLayer=null;
              }
              if(mlayer){
                myMap.removeLayer(mlayer);
                mlayer=null;
              }
              
              
                   
                    
                    
    
                    
            
              flyToStore(selectedCountry);
              console.log(selectedCountry);
              
              const city=selectedCountry.properties.city;
              const currency1=selectedCountry.properties.currency;
              const contry=selectedCountry.properties.country;
              const id=selectedCountry.id;
              const countrycode=selectedCountry.properties.tld;
              const iso3=selectedCountry.properties.iso3;
              console.log(contry);
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
              holidaybutton= L.easyButton('fas fa-glass-cheers',function (){
                 holidays(id);
                 $('#holidaymodal').modal('show');
              
              }).addTo(myMap);
              newsbutton= L.easyButton('fa-solid fa-newspaper',function (){
                newsdetails(contry);
                $('#newsmodal').modal('show');
             
             }).addTo(myMap);
              markers.clearLayers();
              triposo(countrycode);
              $.ajax({
                url:"php/singlecountry.php",
                type:"POST",
                dataType:"json",
                data:{
                    country:iso3
                },
                success:function(result){
                    const borderCountry=result;
                     
                
                 countrysLayer = L.geoJSON(borderCountry,{color: "black", weight: 6}, {
            
            // onEachFeature: onEachFeature,
            // pointToLayer: function(feature, latlng) {
            //     return L.marker(latlng);
            // }
        }
        
        );
        countrysLayer.addTo(myMap);
        myMap.fitBounds(countrysLayer.getBounds()) 

                },
                error:function(jqXHR, textStatus, errorThrown){
                    console.log("error");

                }

              });
              
       
              
              
        },
        error:function(jqXHR, textStatus, errorThrown){
            console.log("error");
        }

    });

   })
    
    
    //flying to the country on user click on country
    // list.addEventListener('change', () => {
    //     $.ajax({
    //         url:"php/capitals.php",
    //         type:"POST",
    //         dataType:"json",
    //         data:{
    //             country:list.value
    //         },
    //         success:function(result){
                
    //             const selectedCountry=result;
    //             console.log(selectedCountry);
    //             if (weatherbutton) {
    //                 myMap.removeControl(weatherbutton);
    //                 myMap.removeControl(currencybutton);
    //                 myMap.removeControl(detailsbutton);
    //                 myMap.removeControl(holidaybutton);
    //                 myMap.removeControl(newsbutton);
    //                 weatherbutton = null
    //               }
    //               if(countrysLayer){
    //                 myMap.removeControl(countrysLayer);
    //                 countrysLayer=null;
    //               }
    //               if(mlayer){
    //                 myMap.removeLayer(mlayer);
    //                 mlayer=null;
    //               }
                  
                  
                       
                        
                        
        
                        
                
    //               flyToStore(selectedCountry);
    //               console.log(selectedCountry);
                  
    //               const city=selectedCountry.properties.city;
    //               const currency1=selectedCountry.properties.currency;
    //               const contry=selectedCountry.properties.country;
    //               const id=selectedCountry.id;
    //               const countrycode=selectedCountry.properties.tld;
    //               const iso3=selectedCountry.properties.iso3;
    //               console.log(contry);
    //               weatherbutton= L.easyButton('fa-solid fa-cloud fa-lg',function (){
    //                 weatherdetails(city);
    //                 $('#weathermodal').modal('show');
                 
    //              }).addTo(myMap);
    //               currencybutton=L.easyButton('fa fa-dollar fa-lg',function (){
    //                  currencyexchange(currency1);
    //                  $('#myModal').modal('show');
                  
    //               }).addTo(myMap);
    //               detailsbutton= L.easyButton('fa fa-info-circle fa-lg',function (){
    //                  moredetails(contry);
    //                  $('#detailsmodal').modal('show');
                  
    //               }).addTo(myMap);
    //               holidaybutton= L.easyButton('fas fa-glass-cheers',function (){
    //                  holidays(id);
    //                  $('#holidaymodal').modal('show');
                  
    //               }).addTo(myMap);
    //               newsbutton= L.easyButton('fa-solid fa-newspaper',function (){
    //                 newsdetails(contry);
    //                 $('#newsmodal').modal('show');
                 
    //              }).addTo(myMap);
    //               markers.clearLayers();
    //               triposo(countrycode);
    //               $.ajax({
    //                 url:"php/singlecountry.php",
    //                 type:"POST",
    //                 dataType:"json",
    //                 data:{
    //                     country:iso3
    //                 },
    //                 success:function(result){
    //                     const borderCountry=result;
                         
                    
    //                  countrysLayer = L.geoJSON(borderCountry, {
                
    //             // onEachFeature: onEachFeature,
    //             // pointToLayer: function(feature, latlng) {
    //             //     return L.marker(latlng);
    //             // }
    //         }
            
    //         );
    //         countrysLayer.addTo(myMap);

    //                 },
    //                 error:function(jqXHR, textStatus, errorThrown){
    //                     console.log("error");

    //                 }

    //               });
                  
           
                  
                  
    //         },
    //         error:function(jqXHR, textStatus, errorThrown){
    //             console.log("error");
    //         }

    //     });
        
         
    //   });
    
  
}
generateList();

//making popup content for each country
function makePopupContent(country) {
     

    return `
    <div>
        <h4>${country.id}</h4>
        
        
    </div>
  `
  
}
//getting countries from php routine

//getting holiday details
function holidays(id){
    console.log(id);
    const div=document.querySelector('.holi2');

    $.ajax({
        url: "php/holidays.php",
        type: 'POST',
        dataType: 'json',
        data: {
            id:id
            
        },
        //if user enters correct data and api gives back the data then we run success funtion
        success: function(result) {

            console.log(JSON.stringify(result));
            const holidays=result['data'];

            //if status of data is ok we fetch the data from fields and put them in results table in html
            if (result.status.name == "ok") {

                //fetching fields from api and showing them in html table
                
                holidays.forEach((holiday) => {
                    const tr=document.createElement('tr');
                    const p=document.createElement('td');
                    const p2=document.createElement('td');
                    dates=holiday.date;
                    days=holiday.name;
                    console.log(days);
                    p2.innerText=dates;
                    p.innerText=days;
                    div.appendChild(tr);
                    tr.appendChild(p);
                    tr.appendChild(p2);
                })
                
               
                

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
function triposo(countrycode){
    console.log(countrycode);
    

    $.ajax({
        url: "php/triposo.php",
        type: 'POST',
        dataType: 'json',
        data:{
            countrycode:countrycode

        },
        
        
        
        
        success: function(result) {
            
            cdata=(result['data']);
            
            
          cdata.forEach((data)=>
            {
                
                lat=data.coordinates.latitude;
                lng=data.coordinates.longitude;
                 mlayer=L.marker([lat,lng],{icon:cityIcon});
                 markers.addLayer(mlayer);
                 mlayer.bindPopup(makePopupContent(data), { closeButton: false, offset: L.point(0, -8) });
                 L.popup({closeButton: false, offset: L.point(0, -8)})
        .setLatLng([lat, lng])
        .setContent(makePopupContent(data))
        .openOn(myMap);


            })
            myMap.addLayer(markers);
            
            
    
            
    
            
            
    
            
        
        },
        
        error: function(jqXHR, textStatus, errorThrown) {
    
            console.log("error");
           
        }
    }); 
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
               $('#Languages').html(JSON.stringify(result['data'][0]['languages']).replace(/['"]+/g, '').slice(1,-1).split(",").join("<br />"));
               $('#Population').html(JSON.stringify(result['data'][0]['population']).replace(/\B(?=(\d{3})+(?!\d))/g, ","));
               $('#Area').html(JSON.stringify(result['data'][0]['area']).replace(/\B(?=(\d{3})+(?!\d))/g, ","));
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
function newsdetails(contry){
    console.log(contry);
  
    
    $.ajax({
        url: "php/news.php",
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
                articles=result["data"];

                //fetching fields from api and showing them in html table
            //     $('#title').html(JSON.stringify(result['data'][0]['title']).slice(1,-1));
            //    $('#description').html(JSON.stringify(result['data'][0]['description']));
            //    $('#more').html(JSON.stringify(result['data'][0]['url']));
            //    $('#sourcep').html(JSON.stringify(result['data'][0]['source']).slice(1,-1));
            //    $('#Author').html(JSON.stringify(result['data'][0]['author']).slice(1,-1));
              
            //    const url2=JSON.stringify(result['data'][0]['image']).slice(1,-1);
               
            //    document.getElementById("newsimage").src = url2;
            articles.forEach((r)=>{
                const newbody=document.querySelector('.newsbody');
                const divdetailwrapper=document.createElement("div");
                const newstop=document.createElement("div");
                const source=document.createElement("div");
                const sourcep=document.createElement("p");
                const titlediv=document.createElement("div");
                const descriptiondiv=document.createElement("div");
                const formorediv=document.createElement("div");
                const bottomdiv=document.createElement("div");
                const bottomspan=document.createElement("span");
                const bottomp=document.createElement("p");
                const titlep=document.createElement("p");
                const descriptionp=document.createElement("p");
                const formorep=document.createElement("p");
                const formorea=document.createElement("a");
                const formorespan=document.createElement("span");
                divdetailwrapper.classList.add("detail-wrapper","detail-wrapper2");
                newstop.classList.add("newstop");
                source.classList.add("source");
                titlediv.classList.add("row","apid","ntitle");
                descriptiondiv.classList.add("row","apid","ndescription");
                formorediv.classList.add("row","apid","nformore");
                bottomdiv.classList.add("bottom");
                divdetailwrapper.appendChild(newstop);
                newstop.appendChild(source);
                source.appendChild(sourcep);
                divdetailwrapper.appendChild(titlediv);
                divdetailwrapper.appendChild(descriptiondiv);
                divdetailwrapper.appendChild(formorediv);
                divdetailwrapper.appendChild(bottomdiv);
                titlediv.appendChild(titlep);
                descriptiondiv.appendChild(descriptionp);
                formorediv.appendChild(formorespan);
                formorediv.appendChild(formorea);
                formorea.appendChild(formorep);
                bottomdiv.appendChild(bottomspan);
                bottomdiv.appendChild(bottomp);
    
                newbody.appendChild(divdetailwrapper);
                  formorespan.innerText="For more:";
                  bottomspan.innerText="Author:";
                  titlep.innerText=JSON.stringify(r.title).slice(1,-1);
                  descriptionp.innerText=JSON.stringify(r.description).slice(1,-1);
                  formorep.innerText=JSON.stringify(r.url).slice(1,-1);
                  sourcep.innerText=JSON.stringify(r.source).slice(1,-1);
                  bottomp.innerText=JSON.stringify(r.author);
            })

            
                

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
var cityIcon = L.ExtraMarkers.icon({
    icon: 'fa-solid fa-city',
    markerColor: 'red',
    shape: 'square',
    prefix: 'fa'
  });
//getting boundries of countries using geojson file
// const countrysLayer = L.geoJSON(storeList, {
    
//     // onEachFeature: onEachFeature,
//     // pointToLayer: function(feature, latlng) {
//     //     return L.marker(latlng);
//     // }
// }

// );
// countrysLayer.addTo(myMap);
//adding marker to the capital of each country based on latitude and longitude 
// const countryLayer = L.geoJSON(countryList, {
    
//     onEachFeature: onEachFeature,
//     pointToLayer: function(feature, latlng) {
//         return L.marker(latlng,{icon:myIcon});
//     }
// }

// );
// countryLayer.addTo(myMap);
//creating a fly animation on click on country
function flyToStore(store) {
    const lat = store.geometry.coordinates[1];
    const lng = store.geometry.coordinates[0];
    myMap.flyTo([lat, lng], 6, {
        duration: 3
    });
    setTimeout(() => {
       
    }, 3000);
}

 



