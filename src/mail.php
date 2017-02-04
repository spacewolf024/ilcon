<?php

$to = 'paulsudol@gmail.com';

$name = $_POST['name'];
$email = $_POST['email'];
$phone = $_POST['phone'];
$comments = $_POST['comments'];

$message =
"Name: " . $name . "\r\n" .
"Email: " . $email . "\r\n" .
"Phone: " . $phone . "\r\n" .
"Comments: " . $comments . "\r\n" .

$subject = "Investor Information Request";

$headers = "From: investor@ilconigliochicago.com" . "\r\n";

mail($to, $subject, $message, $headers);
