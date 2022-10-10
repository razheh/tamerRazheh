
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
        
        <link rel="stylesheet" href="./leaflet/leaflet.css">
    <link rel="stylesheet" href="./styles.css">
    
    <link rel="stylesheet" href="./plugin/src/easy-button.css">

    <link rel="stylesheet" href="./bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="./fontawesome/css/all.min.css">
    <title>Locator</title>
    <link rel="icon" type="image/x-icon" href="icons/map.png">
</head>

<!-- running current location funtion on load of Page -->
<body >
    
        
    <!-- displaying map -->
    <div class=" top">
      <div class="container-fluide">
        <div class="">
          <!-- <select class="selectitems dropdown" >
          <option value="" selected disabled>Select your country</option>
        </select> -->
        <select class="selectitems dropdown" >
          <option value="" selected disabled>Select your country</option>
          <?php
          include('php/main.php');
          foreach($data2 as $row){
            echo '<option value="'.$row["countryName"].'">'.$row["countryName"].'</option>';
          }
          ?>
        </select>
            
          </div>
        </div>
        

          <div id="map"></div>
      </div> 
      
        
    </div>
    </div>
    <div class="modal fade curencymodal" id="myModal" role="dialog">
        <div class="modal-dialog">
        
          <!-- Modal content for exhange rates-->
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal">&times;</button>
              <h4 class="modal-title">Exchange Rates For All Countries Against <span>1 <p id="currencycode"></p></span></h4>
            </div>
            <div class="modal-body" >
              
              <p id="exchangedata"></p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            </div>
          </div>
          
        </div>
      </div>
      <div class="modal fade curencymodal" id="holidaymodal" role="dialog">
        <div class="modal-dialog">
        
          <!-- Modal content for exhange rates-->
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal">&times;</button>
              <h4 class="modal-title">National Holidays </h4>
            </div>
            <div class="modal-body" >
              <div class="holi">

              </div>
              
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            </div>
          </div>
          
        </div>
      </div>

      <div class="modal fade weathermodal" id="weathermodal" role="dialog">
        <div class="modal-dialog">
        
          <!-- Modal content for weather data-->
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal">&times;</button>
              <h4 class="modal-title">Weather Of Selected City</h4>
            </div>
            <div class="modal-body" >
             <div class="weather-icon">
              <div class="row apid" ><img id="weathericon" src="" height="150px" width="150px"></div>
             </div>
              <div class="weatherinfo">
                
                <div class="row apid" ><img src="icons/city.svg" height="30px" width="30px"><p id="city"></p><span></span></div>
                <div class="row apid" ><img src="icons/dateandtime.svg" height="30px" width="30px"><p id="time"></p><span></span></div>
                <div class="row apid" ><img src="icons/temperature.svg" height="30px" width="30px"> <p id="temprature"></p><span>^C</span></div>
                <div class="row apid" ><img src="icons/forecast.svg" height="30px" width="30px"><p id="forecast"></p><span></span></div>
                <div class="row apid" ><img src="icons/windspeed.svg" height="30px" width="30px"><p id="windspeed"></p><span></span></div>
                <div class="row apid" ><img src="icons/humidity.svg" height="30px" width="30px"><p id="Humidity"></p><span></span></div>
                
              </div>
            
              
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            </div>
          </div>
          
        </div>
      </div>
      <div class="modal fade detailsmodal" id="detailsmodal" role="dialog">
        <div class="modal-dialog">
        
          <!-- Modal content for more details getting from Api-->
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal">&times;</button>
              <h4 class="modal-title">More Details Regarding this country</h4>
            </div>
            <div class="modal-body" >
              <div class="flag">
                <div class="row apid" ><img id="flag" src="" srcset="" height="150px" width="150px"></div>
              </div>
              
              <div class="detail-wrapper">
                <div class="row apid"><span>Official Name: </span><p id="official"></p><span></span></div>
             <div class="row apid" ><span>Languages: </span><p id="Languages"></p><span></span></div>
             <div class="row apid" ><span>Population: </span><p id="Population"></p><span></span></div>
             <div class="row apid" ><span>Area: </span><p id="Area"></p><span></span></div>
             <div class="row apid" ><span>Continent: </span><p id="Continent"></p><span></span></div>
              </div>
             
             
              
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            </div>
          </div>
          
        </div>
      </div>

        
    

    
    
    
    
</body>

        <script src="./leaflet/leaflet.js" ></script>
        <script src="./leaflet/leaflet-src.js" ></script>
        <script src="./plugin/src/easy-button.js"></script>
        
        
    <script src="scripts/countryborders.geo.json"></script>
    <script type="application/javascript" src="scripts/jquery-2.2.3.min.js"></script>
    <script src="./app.js"></script>
    
    <script src="./bootstrap/js/bootstrap.min.js"></script>
</html>