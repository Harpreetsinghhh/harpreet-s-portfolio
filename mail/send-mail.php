<?php
header('Content-Type: application/json');

// Get the POST data
$data = json_decode(file_get_contents('php://input'), true);

// Mailtrap SMTP configuration
$smtpHost = 'sandbox.smtp.mailtrap.io';
$smtpPort = 2525;
$smtpUsername = 'b1f87ae81d36b2';
$smtpPassword = 'f0deff852717c4';

// Email content
$to = 'preettt074@gmail.com';
$subject = $data['subject'];
$message = "Name: " . $data['name'] . "\n" .
           "Email: " . $data['email'] . "\n" .
           "Phone: " . $data['phone'] . "\n\n" .
           "Message:\n" . $data['message'];
$headers = "From: " . $data['email'];

// Set up SMTP settings (requires proper server configuration)
ini_set('SMTP', $smtpHost);
ini_set('smtp_port', $smtpPort);
ini_set('username', $smtpUsername);
ini_set('password', $smtpPassword);

// Send email
$success = mail($to, $subject, $message, $headers);

if ($success) {
    echo json_encode(['success' => true, 'message' => 'Email sent successfully']);
} else {
    echo json_encode(['success' => false, 'message' => 'Failed to send email']);
}
?>