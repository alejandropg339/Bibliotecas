<?php
    header("Acces-Control-Allow-Origin: *");
    include('conection.php');


    if(isset($_POST['id'])){
        $nombre =$_POST['nombre'];
        $contenido =$_POST['contenido'];
        $tipo="Docuemtno de texto";
        $fecha =$_POST['fecha'];
        $carpeta =$_POST['carpeta'];
        $id = $_POST['id'];

        $update = "UPDATE archivo SET contenido = '$contenido' WHERE archivo.id = '$id'";

        $result = mysqli_query($conection, $update);

        if($result){
         echo "Succes operation";
        }
    }else{
        $nombre =$_POST['nombre'];
        $contenido =$_POST['contenido'];
        $tipo="Docuemtno de texto";
        $fecha =$_POST['fecha'];
        $carpeta =$_POST['carpeta'];
    
        $insertQuery = "INSERT INTO archivo (nombre, contenido, tipo, fecha, carpeta) values('$nombre', '$contenido', '$tipo', NOW() ,'$carpeta')";
        $result = mysqli_query($conection, $insertQuery);
        if($result){
            echo "Creacion exitosa";
        }
    }


    mysqli_close($conection);
