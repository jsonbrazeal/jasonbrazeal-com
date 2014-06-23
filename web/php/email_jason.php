<?php
/* validate form */
if (!empty($_POST)) {
    $message = $_POST["message"];
    $name = $_POST["name"];
    $email = $_POST["email"];
}

if (empty($name) or empty($email) or empty($message)) {
    $error[] = "All fields are required.";
}

if (strlen($message) > 2000) {
    $error[] = "Message must be fewer than 2000 characters.";
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $error[] = "Unrecognized email format.";
}

if (count($error) != 0) {
    $alert = implode('\n', $error);
    echo 'ERROR' + $alert;
    exit();
}

if (strlen($email) > 200) {
    $email = substr($email, 0, 40);
}

if (strlen($name) > 200) {
    $name = substr($name, 0, 40);
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

$mail->From = filter_var($_POST["email"], FILTER_SANITIZE_EMAIL);
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