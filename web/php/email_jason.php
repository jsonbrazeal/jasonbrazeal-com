<?php

require 'PHPMailerAutoload.php';

$mail = new PHPMailer();

$mail->isSMTP(); // Set mailer to use SMTP
$mail->Host = 'smtp.gmail.com'; // Specify main and backup server
$mail->Port = 587; // Specify port
$mail->SMTPAuth = true; // Enable SMTP authentication
$mail->Username = 'jasonbrazeal.com@gmail.com'; // SMTP username
$mail->Password = '<gmail_password>'; // SMTP password
$mail->SMTPSecure = 'tls'; // Enable encryption, 'ssl' also accepted

$mail->From = filter_var($_POST["email"], FILTER_SANITIZE_STRING);
$mail->FromName = filter_var($_POST["name"], FILTER_SANITIZE_STRING);
$mail->addAddress('jsonbrazeal@gmail.com');

$mail->WordWrap = 50; // Set word wrap to 50 characters
// $mail->addAttachment('/var/tmp/file.tar.gz'); // Add attachments
// $mail->addAttachment('/tmp/image.jpg', 'new.jpg'); // Optional name
// $mail->isHTML(true); // Set email format to HTML

$mail->Subject = 'message from jasonbrazeal.com';
$mail->Body = filter_var($_POST["message"], FILTER_SANITIZE_STRING);
// $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

if(!$mail->send()) {
   error_log('Mailer Error: ' . $mail->ErrorInfo);
   header('HTTP/1.1 500 Internal Server Error');
   exit();
}

?>