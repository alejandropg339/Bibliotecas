<?php

include('conection.php');

$id = $_POST['id'];
$content = $_POST['content'];

$update = "UPDATE archivo SET contenido = '$content' WHERE archivo.id = '$id'";

$result = mysqli_query($conection, $update);

if($result){
    echo "Succes operation";
}
