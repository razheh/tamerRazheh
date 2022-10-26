<?php
header("Access-Control-Allow-Origin: *");
ini_set('display_errors', 'On');
error_reporting(E_ALL);

$data=file_get_contents("capitals.geojson");
$data= json_decode($data, true);
 $data2= $data["features"];
 $value=$_REQUEST['country'];
 
 foreach($data2 as $country){
    if($country["properties"]["iso3"]==$value){
        $capital=$country;
    }
 }


echo json_encode($capital);


?>