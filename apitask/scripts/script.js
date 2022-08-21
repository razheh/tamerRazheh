//performing On click function when user clicks submit button
$('#submit').click(function() {
//sending the data gathered from input of user to php file where api is called
    $.ajax({
        url: "php/getchildren.php",
        type: 'POST',
        dataType: 'json',
        data: {
            geonameId: $('#geonameId').val()
            
        },
        //if user enters correct data and api gives back the data then we run success funtion
        success: function(result) {

            console.log(JSON.stringify(result));

            //if status of data is ok we fetch the data from fields and put them in results table in html
            if (result.status.name == "ok") {

                //fetching fields from api and showing them in html table
               $('#txtname').html(result['data'][0]['name']);
                $('#txtcountryCode').html(result['data'][0]['countryCode']);
                $('#txtcountryName').html(result['data'][0]['countryName']);
                

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

});

