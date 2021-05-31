const fetch = require('node-fetch');
const FormData = require('form-data');

async function createFolder(postData) {


    const formData = new FormData();
    formData.append('nombre', postData);

    try{
        let respuestaHTTP = await fetch("http://localhost/bibliotecas/server/create-folder.php", {
            method: 'POST',
            body: formData
        });

        const result = await respuestaHTTP.text();
        console.log(result);
    
        return result;


    }catch(err){
        console.log(err);
        return err;
    }

}

module.exports=createFolder;