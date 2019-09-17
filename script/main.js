const e = function(e){
    return document.querySelectorAll(e);
}

const select = e('.select');

for(let i = 0; i < select.length; i++){
    select[i].addEventListener('click', ()=>{
        select[i].classList.toggle('opened');
    });
}
