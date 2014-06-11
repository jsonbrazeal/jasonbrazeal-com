<?php
  $name = $_REQUEST['name'];
  $email = $_REQUEST['email'];
  $message = $_REQUEST['message'];

  mail( "jason379@gmail.com", "message from $name",
    $message, "From: $email" );
  header( "Location: http://jasonbrazeal.com/" );
?>