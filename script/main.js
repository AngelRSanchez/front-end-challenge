const e = function(e){
    return document.querySelectorAll(e);
}

const select = e('.select');
const cardDiv = e('.item')[1];


for(let i = 0; i < select.length; i++){
    select[i].addEventListener('click', ()=>{
        select[i].classList.toggle('opened');
    });
}

function showCard(){
    const card = e('#card')[0];
    card.classList.toggle('hidden');
    cardDiv.classList.toggle('divCard');
}

cardDiv.addEventListener('click', showCard);