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

    //console.log(result);
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
    console.log(result);
} 



folder();
listFolders();
