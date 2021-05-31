let newDoc = document.querySelector('#newDoc');

newDoc.addEventListener('click', e => {
    e.preventDefault();
    newDoc.nextElementSibling.classList.toggle('visible');
});

let newFolder = document.querySelector('#newFolder');

newFolder.addEventListener('click', e => {
    e.preventDefault();
    newFolder.nextElementSibling.classList.toggle('visible')
});


function folder() {

    let formFolder = document.querySelector('#form-folder');
    let folderName = document.querySelector('#folderName');
    let folderCreate = document.querySelector('#folderCreate');

    folderCreate.addEventListener('click', e => {
        e.preventDefault();
        const postData = {
            nombre: folderName.value
        }
        createFolder(postData);
    });

}



async function createFolder(postData) {
    const formData = new FormData();
    formData.append('nombre', postData.nombre);
    let respuestaHTTP = await fetch("http://localhost/bibliotecas/server/create-folder.php", {
        method: 'POST',
        body: formData
    })

    const result = await respuestaHTTP.text();
    console.log(result);

    let folderList = document.querySelector('#folder-list');
    folderList.innerHTML = "";
    listFolders();

    return result;
}

async function listFolders() {
    const respuestaHTTP = await fetch('http://localhost/bibliotecas/server/query-folder.php');
    const result = await respuestaHTTP.json();

    const folderList = document.querySelector('#folder-list');

    const cantFolders = result.length;

    let listArray = [];

    for (let i = 0; i < result.length; i++) {
        let li = document.createElement('li');
        let link = document.createElement('a');
        let img = document.createElement('img');
        link.setAttribute('href', '#');
        link.setAttribute('class', 'list-group-item');
        img.setAttribute('src','images/Folder-icon-256.png')
        img.setAttribute('class', 'img-folder');
        link.setAttribute('id', `folder${result[i].id}`);

        link.innerHTML = result[i].nombre;
        folderList.appendChild(li).appendChild(link).append(img);
        listArray.push(result[i].id);
    }



    //console.log(result);
    documents(listArray);

}

let arratyTest = [];

function documents(listArray) {
    for (let i = 0; i < listArray.length; i++) {
        const item = document.querySelector(`#folder${listArray[i]}`);
        //item.classList.add('active');
        item.addEventListener('click', e => {
            e.preventDefault();
            let id = listArray[i];

            if (arratyTest.length < 1) {
                arratyTest.push(listArray[i]);
                let lastId = arratyTest[arratyTest.length - 1];
                console.log(lastId);
            } else {
                arratyTest.push(listArray[i]);
                arratyTest.shift();
                let lastId = arratyTest[arratyTest.length - 1];
                console.log(lastId);
            }
            searchDocuments(id);
        });
    }
    createDoc();
}

async function searchDocuments(id) {
    const transforId = "id=" + id;
    const respuestaHTTP = await fetch('http://localhost/bibliotecas/server/query-document.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: transforId
    });

    const result = await respuestaHTTP.json();

    const docs = document.querySelector('#docs-table');

    for (let i = 0; i < result.length; i++) {

        let template = '';

        result.forEach(doc => {
            template += `
            <tr TaskId="${doc.id}">
            <th><a href="#" class="tbody">${doc.nombre}</a></th>
            <th class="tbody">
                ${doc.tipo}
            </th>
            <th class="tbody">${doc.fecha}</th>
            <th><button class="btn btn-danger task-delete">Eliminar</button></th>
            <th><button class="btn btn-success task-show">Contenido</button></th>
        </tr>`
        });

        docs.innerHTML = template;
        //console.log(template);
    }

    //console.log(result);
    deleteDocument(id);
    content(id);
}

function deleteDocument(id) {
    const botonEliminar = document.querySelectorAll('.task-delete');

    for (let i = 0; i < botonEliminar.length; i++) {
        botonEliminar[i].addEventListener('click', e => {
            if (confirm('Are you sure you want to delete it?')) {

                const idDelete = botonEliminar[i].parentElement.parentElement.getAttribute('TaskId');
                //console.log(idDelete);

                removeTask(idDelete);
                searchDocuments(id);
                searchDocuments(id);
            }
        });
    }
}

async function removeTask(idDelete) {
    const transformId = "id=" + idDelete;
    const respuestaHTTP = await fetch('http://localhost/bibliotecas/server/delete-document.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: transformId
    });

    const result = await respuestaHTTP.text();
    //console.log(result);
}


function createDoc() {
    let formFolder = document.querySelector('.form-documet');
    let documentName = document.querySelector('#documentName');
    let documentCreate = document.querySelector('#documentCreate');
    let documentText = document.querySelector('#documentText');
    let idDocument = document.querySelector('#idDocument');

    documentCreate.addEventListener('click', e => {
        e.preventDefault();
        let lastId = arratyTest[arratyTest.length - 1];
        const postData = {
            nombre: documentName.value,
            id: lastId,
            contenido: documentText.value,
            idDocumento: idDocument.value
        }
        createDocument(postData);
        searchDocuments(postData.id);
        formFolder.reset();
        searchDocuments(postData.id);
        console.log(postData.id);
    });
}


async function createDocument(postData) {
    if (postData.idDocumento == "") {
        const formdata = new FormData();
        formdata.append('nombre', postData.nombre);
        formdata.append('carpeta', postData.id);
        formdata.append('contenido', postData.contenido);
        const respuestaHTTP = await fetch('http://localhost/bibliotecas/server/create-document.php', {
            method: 'POST',
            body: formdata
        });
        searchDocuments(postData.id);
    } else {
        const formdata = new FormData();
        formdata.append('nombre', postData.nombre);
        formdata.append('carpeta', postData.id);
        formdata.append('contenido', postData.contenido);
        formdata.append('id', postData.idDocumento);
        const respuestaHTTP = await fetch('http://localhost/bibliotecas/server/create-document.php', {
            method: 'POST',
            body: formdata
        });
        idVacio();
        searchDocuments(postData.id);
    }

}

let arrayDocument = [];


function content(id) {
    const botonMostrar = document.querySelectorAll('.task-show');
    const textAreaVisible = document.querySelector('#text-area-visible');

    for (let i = 0; i < botonMostrar.length; i++) {
        botonMostrar[i].addEventListener('click', e => {
            const idShow = botonMostrar[i].parentElement.parentElement.getAttribute('TaskId');
            //console.log(idShow);

            showContet(idShow);
            arrayDocument.push(idShow);

        });
    }
}



async function showContet(idShow) {
    let textArea = document.querySelector('#textAera');
    let text = document.querySelector('#documentText');
    let name = document.querySelector('#documentName');
    let id = document.querySelector('#idDocument');
    const transformId = "id=" + idShow;
    const respuestaHTTP = await fetch('http://localhost/bibliotecas/server/query-content-document.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: transformId
    });

    const result = await respuestaHTTP.json();
    console.log(result);

    const probemos = result[0].contenido;
    //console.log(probemos);
    id.value = await result[0].id;
    name.value = await result[0].nombre;
    text.value = await probemos;

    const postData = {
        id: idShow
    }

    console.log(postData);

    let idDocument = arrayDocument[arrayDocument.length - 1];
    //updateContent(postData);

}


function idVacio() {
    let id = document.querySelector('#idDocument');
    id.value = "";
}


folder();
listFolders();


