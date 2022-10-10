<?php
$data=file_get_contents("countries.geojson");
$data= json_decode($data, true);
$data2= $data["countries"]["country"];
foreach($data2 as $row){
echo $row["countryName"];
}
echo json_encode($data2);


?>