<?php
  /**
  * Requires the "PHP Email Form" library
  * The "PHP Email Form" library is available only in the pro version of the template
  * The library should be uploaded to: vendor/php-email-form/php-email-form.php
  * For more info and help: https://bootstrapmade.com/php-email-form/
  */

  
  
  $receiving_email_address = 'tamer.razheh@gmail.com';
  $from_email = 'tamersof@tamer-software.uk';
  //$from_email = 'tamersof@tamer-software.uk';
  

  
  $to = $receiving_email_address;
  $name = $_POST['name'];
  $email = $_POST['email'];
  $subject = $_POST['subject'];
  $message = $_POST['message'];
  $message1=
						"Full Name : ".$name."\n".
						"Email : ".$email ."\n".
						"Subject : ".$subject ."\n".
						"Message : ".$message."\n";

        
        $from="From: $name<$from_email>\r\nReturn-path: $email";
		$subject="Enquiry from site";
			mail($to, $subject, $message1, $from);
        if ($mail) {
                echo 'OK';
            }
         else {
            echo '<div class="sent-message"></div>';
        }
?>
