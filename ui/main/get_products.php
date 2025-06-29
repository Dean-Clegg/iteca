<?php

$pdo = require_once '../../sql/db_connect.php';

try {
    $sql_file_path = '../../sql/queries/getProducts.sql';
    if (!file_exists($sql_file_path)) {
        throw new Exception('SQL file not found: ' . $sql_file_path);
    }
    $query = file_get_contents($sql_file_path);

    $stmt = $pdo->prepare($query);
    $stmt->execute();
    $products = $stmt->fetchAll(PDO::FETCH_ASSOC);
    // Prepare response
    header('Content-Type: application/json');
    if ($products) {
        echo json_encode([
            'success' => true,
            'products' => $products
        ]);
    } else {
        echo json_encode([
            'success' => false,
            'message' => 'No products found'
        ]);
    }
} catch (Exception $e) {
    header('Content-Type: application/json', true, 500);
    echo json_encode([
        'success' => false,
        'message' => 'Error: ' . $e->getMessage()
    ]);
}