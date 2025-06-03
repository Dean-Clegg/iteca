<?php
$pdo = require_once '../../../sql/db_connect.php';

try {
    $sql_file_path = '../../../sql/queries/login.sql';
    if (!file_exists($sql_file_path)) {
        throw new Exception('SQL file not found: ' . $sql_file_path);
    }
    $query = file_get_contents($sql_file_path);

    $input_email = isset($_POST['email']) ? $_POST['email'] : '';
    $input_password = isset($_POST['password']) ? $_POST['password'] : '';

    $stmt = $pdo->prepare($query);
    $stmt->execute([
        'email' => $input_email,
        'password' => $input_password
    ]);
    $user = $stmt->fetch();

    // Prepare response
    header('Content-Type: application/json');
    if ($user) {
        echo json_encode([
            'success' => true,
            'user' => $user
        ]);
    } else {
        echo json_encode([
            'success' => false,
            'message' => 'Invalid email or password.'
        ]);
    }
} catch (Exception $e) {
    header('Content-Type: application/json', true, 500);
    echo json_encode([
        'success' => false,
        'message' => 'Error: ' . $e->getMessage()
    ]);
}

