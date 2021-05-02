<?php
    header("Acces-Control-Allow-Origin: *");
    include('conection.php');

    $carpeta=$_POST['id'];

    $insertQuery = "SELECT * FROM archivo where carpeta='$carpeta'";
    $result = mysqli_query($conection, $insertQuery);
    while($fila = mysqli_fetch_array($result)){
        $almacenados[] = array_map('utf8_encode', $fila); 
    }
    
    echo json_encode($almacenados);

    mysqli_close($conection);
?>