let newDoc = document.querySelector('#newDoc');

newDoc.addEventListener('click', e =>{
    e.preventDefault();
    newDoc.nextElementSibling.classList.toggle('visible');
});

let newFolder = document.querySelector('#newFolder');

newFolder.addEventListener('click', e =>{
    e.preventDefault();
    newFolder.nextElementSibling.classList.toggle('visible')
});


function folder(){

    let formFolder =  document.querySelector('#form-folder');
    let folderName = document.querySelector('#folderName');
    let folderCreate = document.querySelector('#folderCreate');

    folderCreate.addEventListener('click',e =>{
        e.preventDefault();
        const postData ={
            nombre: folderName.value
        }
        createFolder(postData);
    });

}


/*folderName.addEventListener('input', e =>{
   let folder = e.target.value;

   folderCreate.addEventListener('click',e =>{
       e.preventDefault();
    createFolder(folder);
   });
   
});*/



async function createFolder(postData){
    const formData = new FormData();
    formData.append('nombre',postData.nombre);
    let respuestaHTTP = await fetch("http://localhost/bibliotecas/server/create-folder.php", {
        method: 'POST',
        body: formData
    })
    
    const result  = await respuestaHTTP.text();

    let folderList = document.querySelector('#folder-list');
    folderList.innerHTML ="";
    listFolders();

}

async function listFolders(){
   const respuestaHTTP = await fetch('http://localhost/bibliotecas/server/query-folder.php');
   const result = await respuestaHTTP.json(); 

    const folderList = document.querySelector('#folder-list');

    const cantFolders = result.length;

    let listArray = [];

    for(let i=0; i<result.length; i++){
        let li = document.createElement('li');
        let link = document.createElement('a');
        link.setAttribute('href','#');
        link.setAttribute('id',`folder${result[i].id}`);
        link.innerHTML = result[i].nombre;
        folderList.appendChild(li).appendChild(link);
        listArray.push(result[i].id);
    }



   console.log(result);
   documents(listArray);
   
}

function documents(listArray){
    for (let i = 0 ; i<listArray.length ; i++) {
        const item = document.querySelector(`#folder${listArray[i]}`);
        item.addEventListener('click', e=>{
            e.preventDefault();
            let id  = listArray[i];
            searchDocuments(id);
            createDoc(id);
        });
    }
}

async function searchDocuments(id){
    const transforId = "id="+id;
    const respuestaHTTP = await fetch('http://localhost/bibliotecas/server/query-document.php', {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: transforId
    });

    const result = await respuestaHTTP.json();
    
    const docs = document.querySelector('#docs-table');
    
    for(let i=0; i<result.length; i++){
       /* let tr = document.createElement('tr');
        let th = document.createElement('th');
        let th2 = document.createElement('th');
        let th3 = document.createElement('th');
        th.innerHTML = result[i].nombre;
        th2.innerHTML = result[i].tipo;
        th3.innerHTML = result[i].fecha;
        docs.appendChild(tr).appendChild(th, th2, th3);*/

        let template = '';

        result.forEach(doc =>{
            template += `
            <tr TaskId="${doc.id}">
            <th><a href="#" class="tbody">${doc.nombre}</a></th>
            <th class="tbody">
                ${doc.tipo}
            </th>
            <th class="tbody">${doc.fecha}</th>
            <th><button class="btn btn-danger task-delete">Delete</button></th>
            <th><button class="btn btn-success task-show">Show</button></th>
        </tr>`
        });

        docs.innerHTML = template;
        console.log(template);
    }

    console.log(result);
    deleteDocument(id);
    content(id);
} 

function deleteDocument(id){
    const botonEliminar = document.querySelectorAll('.task-delete');

    for(let i = 0; i < botonEliminar.length; i++){
        botonEliminar[i].addEventListener('click',e=>{
            if(confirm('Are you sure you want to delete it?')){
            console.log("Putas mamadas las tuyas wey este es el boton "+[i]);
            //const pruebita =botonEliminar[i].parentElement.parentElement.querySelector('.task-id');
            const idDelete = botonEliminar[i].parentElement.parentElement.getAttribute('TaskId');
            console.log(idDelete);

            removeTask(idDelete);
            searchDocuments(id);
        }});
    }
}

async function removeTask(idDelete) {
    const transformId = "id="+idDelete;
    const respuestaHTTP = await fetch('http://localhost/bibliotecas/server/delete-document.php', {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: transformId
    });

    const result = await respuestaHTTP.text();
    console.log(result);
}


function createDoc(id){
    let formFolder =  document.querySelector('#form-document');
    let documentName = document.querySelector('#documentName');
    let documentCreate = document.querySelector('#documentCreate');
    let documentText = document.querySelector('#documentText');

    documentCreate.addEventListener('click',e =>{
        e.preventDefault();
        const postData ={
            nombre: documentName.value,
            id: id,
            contenido: documentText.value 
        }
        createDocument(postData);
        searchDocuments(id);
        console.log("nombre: "+postData.nombre," id: "+postData.id);
    });
}


async function createDocument(postData){
    const formdata = new FormData();
    formdata.append('nombre', postData.nombre);
    formdata.append('carpeta', postData.id);
    formdata.append('contenido', postData.contenido);
    const respuestaHTTP = await fetch('http://localhost/bibliotecas/server/create-document.php',{
        method: 'POST',
        body: formdata
    });
}

function content(id){
    const botonMostrar = document.querySelectorAll('.task-show');

    for(let i = 0; i < botonMostrar.length; i++){
        botonMostrar[i].addEventListener('click',e=>{
            const idShow = botonMostrar[i].parentElement.parentElement.getAttribute('TaskId');
            console.log(idShow);

            showContet(idShow);
        });
    }
}

async function showContet(idShow) {
    let textArea = document.querySelector('#textAera');
    const transformId = "id="+idShow;
    const respuestaHTTP = await fetch('http://localhost/bibliotecas/server/query-content-document.php', {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: transformId
    });

    const result = await respuestaHTTP.json();
    //
    
    const probemos = result[0].contenido;
    console.log(probemos);
      textArea.value = await probemos;
}






folder();
listFolders();

