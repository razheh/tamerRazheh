<?php

	// remove for production

	ini_set('display_errors', 'On');
	error_reporting(E_ALL);

	$executionStartTime = microtime(true);
//specifying api url with required parameters retrieved from ajax data
	//$url='https://api.opencagedata.com/geocode/v1/json?q='. $_REQUEST['lt'].'%2C%'. $_REQUEST['lg'].'&key=6a0a81f73ee9452a8339c85ce74097eb&language=en&pretty=1';
	$url='http://api.weatherapi.com/v1/current.json?key=5bff99016340441d8cc184738221209&q='.$_REQUEST['citi'].'&aqi=no';
    
//initiating the api and getting results
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_URL,$url);
//storing the result from api in variable
	$result=curl_exec($ch);
//closing the execution of api
	curl_close($ch);
//decoding json data 
	$decode = json_decode($result,true);	
//storing api fileds in output variable
	$output['status']['code'] = "200";
	$output['status']['name'] = "ok";
	$output['status']['description'] = "success";
	$output['status']['returnedIn'] = intval((microtime(true) - $executionStartTime) * 1000) . " ms";
	$output['data'] = $decode['current'];
	
	header('Content-Type: application/json; charset=UTF-8');

	echo json_encode($output); 

?>
