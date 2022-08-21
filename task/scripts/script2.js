//performing On click function when user clicks submit button
$('#submit2').click(function() {
    
//sending the data gathered from input of user to php file where api is called
    $.ajax({
        url: "php/getaddress.php",
        type: 'POST',
        dataType: 'json',
        data: {
            lat: $('#lat').val(),
            lng: $('#lng').val()
            
        },
        //if user enters correct data and api gives back the data then we run success funtion
        success: function(result) {

            console.log(JSON.stringify(result));
//if status of data is ok we fetch the data from fields and put them in results table in html
            if (result.status.name == "ok") {
//fetching fields from api and showing them in html table
                
               $('#txthousenumber').html(result['data']['houseNumber']);
                $('#txtLocality').html(result['data']['locality']);
                $('#txtstreet').html(result['data']['street']);
                

            }else{
                 //if the upper condition  fails
                console.log("error");
            }
        
        },
        //if there is no success in retrieving data from api
        error: function(jqXHR, textStatus, errorThrown) {
            console.log("error")
        }
    }); 

});