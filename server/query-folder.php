<?php
    header("Acces-Control-Allow-Origin: *");
    include('conection.php');

    $insertQuery = "SELECT * FROM carpeta";
    $result = mysqli_query($conection, $insertQuery);
    while($fila = mysqli_fetch_array($result)){
        $almacenados[] = array_map('utf8_encode', $fila); 
    }
    
    echo json_encode($almacenados);

    mysqli_close($conection);
?>