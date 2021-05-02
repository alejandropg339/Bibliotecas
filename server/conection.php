<?php
$host = 'localhost';
$user = 'root';
$pass = '';
$db = 'biblioteca_db';
$conection = mysqli_connect($host, $user, $pass, $db) or die('Fallo de conexion');
mysqli_set_charset($conection, 'utf8');
?>