<?php
header('Content-Type: application/json');

// Include PHPMailer
require_once 'vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

try {
    // Get the POST data
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (!$data) {
        throw new Exception('No data received');
    }

    // Create a new PHPMailer instance
    $mail = new PHPMailer(true);

    // SMTP configuration for Mailtrap
    $mail->isSMTP();
    $mail->Host = 'sandbox.smtp.mailtrap.io';
    $mail->SMTPAuth = true;
    $mail->Username = 'b1f87ae81d36b2';
    $mail->Password = 'f0deff852717c4';
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = 587;

    // Email settings
    $mail->setFrom($data['email'], $data['name']);
    $mail->addAddress('preettt074@gmail.com');
    $mail->addReplyTo($data['email'], $data['name']);

    // Email content
    $mail->isHTML(false);
    $mail->Subject = $data['subject'];
    $mail->Body = "Name: " . $data['name'] . "\n" .
                  "Email: " . $data['email'] . "\n" .
                  "Phone: " . $data['phone'] . "\n\n" .
                  "Message:\n" . $data['message'];

    // Send email
    $mail->send();
    
    echo json_encode(['success' => true, 'message' => 'Email sent successfully']);
    
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Failed to send email: ' . $e->getMessage()]);
}
?>