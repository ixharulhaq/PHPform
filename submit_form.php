<?php
header('Content-Type: application/json');

$conn = mysqli_connect("localhost", "root", "", "miniProject");

if ($conn->connect_error) {
    echo json_encode(["success" => false, "error" => "DB connection failed"]);
    exit;
}

$name = $_POST['name'] ?? '';
$email = $_POST['email'] ?? '';
$address = $_POST['address'] ?? '';
$phone = $_POST['phone'] ?? '';
$employment = $_POST['employment_status'] ?? '';

if (empty($name) || empty($email) || empty($address) || empty($phone) || empty($employment)) {
    echo json_encode(["success" => false, "error" => "Missing fields"]);
    exit;
}

$credit_score = rand(300, 800);

$sql = "INSERT INTO form_submissions (step1_name, step1_email, step2_address, step2_phone, step3_employment_status, credit_score)
        VALUES (?, ?, ?, ?, ?, ?)";

$stmt = $conn->prepare($sql);
$stmt->bind_param("sssssi", $name, $email, $address, $phone, $employment, $credit_score);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "creditScore" => $credit_score]);
} else {
    echo json_encode(["success" => false, "error" => $stmt->error]);
}

$stmt->close();
$conn->close();
?>
