<?php
header("Access-Control-Allow-Origin: *");
ini_set('display_errors', 'On');
error_reporting(E_ALL);

$data=file_get_contents("capitals.geojson");
$data= json_decode($data, true);
 $data2= $data["features"];
//  $countries=[];
//  foreach($data2 as $country){
//     Array_push($countries,['name'=>$country["properties"]["name"],'iso'=>$country["properties"]["iso_a3"],'geometry'=>$country["geometry"]["coordinates"]]);
//  }
 
// header('Content-Type: application/json; charset=UTF-8');

echo json_encode($data2);


?>