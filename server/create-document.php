<?php
    header("Acces-Control-Allow-Origin: *");
    include('conection.php');

    $nombre =$_POST['nombre'];
    $contenido =$_POST['contenido'];
    $tipo="Docuemtno de texto";
    $carpeta =$_POST['carpeta'];

    $insertQuery = "INSERT INTO archivo (nombre, contenido, tipo, carpeta) values('$nombre', '$contenido', '$tipo', '$carpeta')";
    $result = mysqli_query($conection, $insertQuery);
    if($result){
        echo "Creacion exitosa";
    }

    mysqli_close($conection);
?>