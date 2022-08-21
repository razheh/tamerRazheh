//performing On click function when user clicks submit button
$('#submit3').click(function() {
//sending the data gathered from input of user to php file where api is called
    $.ajax({
        url: "php/siblings.php",
        type: 'POST',
        dataType: 'json',
        data: {
            geonameId: $('#geonameId2').val()
            
        },
        //if user enters correct data and api gives back the data then we run success funtion
        success: function(result) {

            console.log(JSON.stringify(result));
//if status of data is ok we fetch the data from fields and put them in results table in html
            if (result.status.name == "ok") {
//fetching fields from api and showing them in html table
                
               $('#txtsname').html(result['data'][0]['name']);
                $('#txtscountryCode').html(result['data'][0]['countryCode']);
                $('#txtscountryName').html(result['data'][0]['countryName']);
               

            }else{
                //if the upper condition  fails
                console.log("error");
            }
        
        },
        error: function(jqXHR, textStatus, errorThrown) {
             //if there is no success in retrieving data from api
            console.log("error")
        }
    }); 

});

