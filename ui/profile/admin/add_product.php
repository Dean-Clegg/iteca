<?php
$pdo = require_once '../../../sql/db_connect.php';

try {
    $sql_file_path = '../../../sql/queries/addProduct.sql';
    if (!file_exists($sql_file_path)) {
        throw new Exception('SQL file not found: ' . $sql_file_path);
    }
    $query = file_get_contents($sql_file_path);

    $input_quantity = isset($_POST['quantity']) ? $_POST['quantity'] : '';
    $input_imageUrl = isset($_POST['imageUrl']) ? $_POST['imageUrl'] : '';
    $input_price = isset($_POST['price']) ? $_POST['price'] : '';
    $input_name = isset($_POST['name']) ? $_POST['name'] : '';
    $input_description = isset($_POST['description']) ? $_POST['description'] : '';
    $input_categoryId = isset($_POST['categoryId']) ? $_POST['categoryId'] : '';

    $stmt = $pdo->prepare($query);
    $stmt->execute([
        'quantity' => $input_quantity,
        'imageUrl' => $input_imageUrl,
        'price' => $input_price,
        'name' => $input_name,
        'description' => $input_description,
        'categoryId' => $input_categoryId,
    ]);
    $result = $stmt->post();

    // Prepare response
    header('Content-Type: application/json');
    if ($result) {
        echo json_encode([
            'success' => true,
        ]);
    } else {
        echo json_encode([
            'success' => false,
            'message' => 'Failed to add product'
        ]);
    }
} catch (Exception $e) {
    header('Content-Type: application/json', true, 500);
    echo json_encode([
        'success' => false,
        'message' => 'Error: ' . $e->getMessage()
    ]);
}

