<?php
//get data from form  
$name = $_POST['name'];
$email= $_POST['email'];
$message= $_POST['Message'];
$to = "tamer.razheh@yahoo.com";
$subject = "Mail From website";
$txt ="Name = ". $name . "\r\n  Email = " . $email . "\r\n Message =" . $message;
$headers = "From: razheht@tamer-software.com" . "\r\n" .
"CC: razheht@tamer-software.com";
if($email!=NULL){
    mail($to,$subject,$txt,$headers);
}
//redirect
header("Location:thankyou.html");
?>