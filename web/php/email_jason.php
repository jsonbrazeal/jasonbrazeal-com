<?php
  $name = $_REQUEST['name'];
  $email = $_REQUEST['email'];
  $message = $_REQUEST['message'];

  mail( "jsonbrazeal@gmail.com", "message from $name",
    $message, "From: $email" );
  header( "Location: http://jasonbrazeal.com/" );
?>