// Acortador de querySelector
const e = function (e) {
    return document.querySelectorAll(e);
}

// Mostrar selects
const select = e('.select');

for (let i = 0; i < select.length; i++) {
    select[i].addEventListener('click', () => {
        select[i].classList.toggle('opened');
    });
}

// Obtenemos la lista de usuarios desde un archivo json
const usersList = async () => {
    const resultado = await fetch('./users.json');
    const data = await resultado.json();

    return {
        data
    }
}

// Mostramos la lista de usuarios
const showUsers = () => {
    usersList().then(data => {
        const users = data.data.users;
        let html = '';
        users.forEach(user => {
            // Regular expresion para obtener solo los ultimos 4 digitos
            let regex = /\d{0,4}/;
            const lastFouth = user.cardNumber.slice(13).replace(regex, 'XXXX');
            // Regular expresion para obtener solo los primeros 6 digitos
            regex = /\d{5}$/;
            const firstSix = user.cardNumber.slice(0, 12).replace(regex, 'XXXXX');

            // Imprimir los datos
            html += `<div class="item">
                    <div userId="${user.id}">
                        <span>${user.name}</span>
                        <span brand="${user.brand}">${user.brand}</span>
                        <span>${lastFouth}</span>
                        <span>${user.transactionType}</span>
                        <span>${user.amount.toFixed(2)}</span>
                        <span>${user.currency}</span>
                    </div>
                </div>
                <div class="item hidden">
                    <div id="card" class="card">
                        <div class="left">
                            <p>
                                <span>ID:</span> ${user.id}
                            </p>
                            <p>
                                <span>Tracking Code:</span> ${user.tracking}
                            </p>
                            <p>
                                <span>Brand ID:</span> ${user.brandId}
                            </p>
                        </div>
                        <div class="right">
                            <p>
                                <span>First 6 digits:</span> ${firstSix}
                            </p>
                            <p>
                                <span>Expiry month:</span> ${user.cardMonth}
                            </p>
                            <p>
                                <span>Expiry year:</span> ${user.cardYear}
                            </p>
                        </div>
                    </div>
                </div>
            `;

            // Añadir los datos al documento
            document.querySelector('#users').innerHTML = html;

            // Mostrar mas datos
            const cards = document.querySelectorAll('div.item');
            cards.forEach(card => {
                card.addEventListener('click', (e) => {
                    if (!e.target.classList.contains('item')) {
                        if (e.target.parentElement.nextElementSibling.classList.contains('hidden')) {

                            e.target.parentElement.nextElementSibling.classList.add('visible');
                            e.target.parentElement.nextElementSibling.classList.remove('hidden');

                        } else if (e.target.parentElement.nextElementSibling.classList.contains('visible')) {

                            e.target.parentElement.nextElementSibling.classList.remove('visible');
                            e.target.parentElement.nextElementSibling.classList.add('hidden');

                        }
                    }
                })
            })
        });
    }).catch(e => console.log(e));
}

// Llamado a la lista de usuarios
showUsers();

