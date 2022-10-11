<?php
header("Access-Control-Allow-Origin: *");
ini_set('display_errors', 'On');
error_reporting(E_ALL);

$data=file_get_contents("countryBorders.geo.json");
$data= json_decode($data, true);
 $data2= $data["features"];
// header('Content-Type: application/json; charset=UTF-8');

echo json_encode($data2);


?>