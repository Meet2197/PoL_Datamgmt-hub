<?php
header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect and sanitize form data
    $name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_STRING);
    $email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
    $group = filter_input(INPUT_POST, 'group-name', FILTER_SANITIZE_STRING);
    $concern = filter_input(INPUT_POST, 'concern-type', FILTER_SANITIZE_STRING);

    // Set the recipient email address
    $to = "meet_kaushal.bhatt@tu-dresden.de";

    // Set the email subject
    $subject = "New Inquiry from PoL Data Management Corner: " . $concern;

    // Construct the email body
    $body = "Hello Data Manager,\n\n"
          . "I am contacting you from the PoL Data Management Corner website with the following concern:\n\n"
          . "Name: " . $name . "\n"
          . "Email: " . $email . "\n"
          . "Group Name: " . $group . "\n"
          . "Type of Concern: " . $concern . "\n\n"
          . "Could you please get back to me regarding this matter?";

    // Set the headers
    $headers = "From: " . $email . "\r\n"
             . "Reply-To: " . $email . "\r\n"
             . "X-Mailer: PHP/" . phpversion();

    // Send the email
    if (mail($to, $subject, $body, $headers)) {
        echo json_encode(['status' => 'success', 'message' => 'Your email has been sent successfully.']);
    } else {
        http_response_code(500); // Internal Server Error
        echo json_encode(['status' => 'error', 'message' => 'There was an error sending your email. Please try again.']);
    }
} else {
    http_response_code(405); // Method Not Allowed
    echo json_encode(['status' => 'error', 'message' => 'Method Not Allowed']);
}
?>