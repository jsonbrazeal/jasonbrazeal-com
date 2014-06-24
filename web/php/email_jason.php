<?php
/* validate form */
if (!empty($_POST)) {
    $message = filter_var($_POST["message"], FILTER_SANITIZE_STRING);
    $name = $_POST["name"];
    $email = $_POST["email"];
}

/* return an error if someone gets past the html5 validation */
if (empty($name) or empty($email) or empty($message)) {
   error_log('Error: $name, $email, and/or $message empty');
   header('HTTP/1.1 500 Internal Server Error');
   exit();
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    error_log('Error: $email failed FILTER_VALIDATE_EMAIL');
    header('HTTP/1.1 500 Internal Server Error');
    exit();
}

/* clip if suspiciously long */
if (strlen($email) > 200) {
    $email = substr($email, 0, 40);
}

if (strlen($name) > 200) {
    $name = substr($name, 0, 40);
}

if (strlen($message) > 1000) {
    $$message = substr($message, 0, 1000);
}

require 'PHPMailerAutoload.php';
$mail = new PHPMailer();

$mail->isSMTP(); // Set mailer to use SMTP
$mail->Host = 'smtp.gmail.com'; // Specify main and backup server
$mail->Port = 587; // Specify port
$mail->SMTPAuth = true; // Enable SMTP authentication
$mail->Username = 'jasonbrazeal.com@gmail.com'; // SMTP username
$mail->Password = '<gmail_password>'; // SMTP password
$mail->SMTPSecure = 'tls'; // Enable encryption, 'ssl' also accepted

$mail->From = $email;
//$mail->FromName = $name;
$mail->addAddress('jsonbrazeal@gmail.com');

$mail->WordWrap = 50; // Set word wrap to 50 characters
// $mail->addAttachment('/var/tmp/file.tar.gz'); // Add attachments
// $mail->addAttachment('/tmp/image.jpg', 'new.jpg'); // Optional name
// $mail->isHTML(true); // Set email format to HTML

$mail->Subject = 'message from jasonbrazeal.com';
$mail->Body = 'message from' . $name . '\n' . $message;
// $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

if(!$mail->send()) {
   error_log('Mailer Error: ' . $mail->ErrorInfo);
   header('HTTP/1.1 500 Internal Server Error');
   exit();
}

?>