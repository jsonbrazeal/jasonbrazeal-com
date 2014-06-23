<?php
  $name = $_POST['name'];
  $email = $_POST['email'];
  $message = $_POST['message'];

  mail( "jsonbrazeal@gmail.com", "message from $name",
    $message, "From: $email" );
  header( "Location: http://localhost:8008/" );
?>