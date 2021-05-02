<?php
    include('conection.php');

    $nombre =$_POST['nombre'];

    $insertQuery = "INSERT INTO carpeta (nombre) values('$nombre')";
    $result = mysqli_query($conection, $insertQuery);
    if($result){
        echo "Creacion exitosa";
    }

    mysqli_close($conection);
?>