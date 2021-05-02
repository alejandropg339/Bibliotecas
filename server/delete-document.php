<?php

include('conection.php');

$id = $_GET['id'];

$queryDelete = "DELETE FROM archivo WHERE id = '$id'";
$result = mysqli_query($conection,$queryDelete);

if($result){
    echo "Operación exitosa";
}

mysqli_close($conection);
?>