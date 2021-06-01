const fetch = require('node-fetch');
const FormData = require('form-data');

async function createFolder(postData) {


    const formData = new FormData();
    formData.append('nombre', postData);

    try {
        let respuestaHTTP = await fetch("http://localhost/bibliotecas/server/create-folder.php", {
            method: 'POST',
            body: formData
        });

        const result = await respuestaHTTP.text();
        console.log(result);

        return result;


    } catch (err) {
        console.log(err);
        return err;
    }

}

//Create document 

async function createDocument(name, idFolder, content) {

    try {
        const formdata = new FormData();
        formdata.append('nombre', name);
        formdata.append('carpeta', idFolder);
        formdata.append('contenido', content);
        const respuestaHTTP = await fetch('http://localhost/bibliotecas/server/create-document.php', {
            method: 'POST',
            body: formdata
        });

        const result = await respuestaHTTP.text();
        console.log(result);

        return (result);

    } catch (err) {

        return (err);
    }

}

//Update document

async function updateDocument(name, idFolder, content, idDocument) {

    try {
        const formdata = new FormData();
        formdata.append('nombre', name);
        formdata.append('carpeta', idFolder);
        formdata.append('contenido', content);
        formdata.append('id', idDocument);

        const respuestaHTTP = await fetch('http://localhost/bibliotecas/server/create-document.php', {
            method: 'POST',
            body: formdata
        });

        const result = respuestaHTTP.text();

        return result;

    } catch (err) {
        return (err);
    }


}

// Delete document

async function deleteDocument(idDelete) {

    try {

        const transformId = "id=" + idDelete;
        const respuestaHTTP = await fetch('http://localhost/bibliotecas/server/delete-document.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: transformId
        });

        const result = await respuestaHTTP.text();

        return result;

    } catch (err) {
        return (err);
    }
}



module.exports = {createFolder, createDocument, updateDocument, deleteDocument};