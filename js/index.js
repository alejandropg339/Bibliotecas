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

   console.log(result);
   
}

folder();
listFolders();