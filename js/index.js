let newDoc = document.querySelector('#newDoc');

newDoc.addEventListener('click', e =>{
    e.preventDefault();
    newDoc.nextElementSibling.classList.toggle('visible');
});

let newFolder = document.querySelector('#newFolder');

newFolder.addEventListener('click', e =>{
    e.preventDefault();
    newFolder.nextElementSibling.classList.toggle('visible')
})