// Boton de busqueda
const btnSearch = document.getElementById('search');
btnSearch.addEventListener('click', search);

// Llamado a la lista de usuarios
showAllUsers();

// Obtenemos la lista de usuarios desde un archivo json
async function usersList() {
    const resultado = await fetch('./users.json');
    const data = await resultado.json();
    const { users } = data;

    return users;
}

async function showAllUsers() {
	const users = await usersList();
	showUsers(users);
}

function showUsers(users) {
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
						<div class="card">
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
		showMoreData();
	});
}

function showMoreData() {
	const cards = document.querySelectorAll("div.item");
	cards.forEach((card) => {
		card.addEventListener("click", (e) => {
			if (!e.target.classList.contains("item")) {
				if (
					e.target.parentElement.nextElementSibling.classList.contains("hidden")
				) {
					e.target.parentElement.nextElementSibling.classList.remove("hidden");
					e.target.parentElement.nextElementSibling.classList.add("visible");
				} else if (
					e.target.parentElement.nextElementSibling.classList.contains("visible")
				) {
					e.target.parentElement.nextElementSibling.classList.remove("visible");
					e.target.parentElement.nextElementSibling.classList.add("hidden");
				}
			}
		});
	});
}

function filterData(array, select) {
	return array.filter(item => item.transactionType == select || item.currency == select);
}

async function search(e) {
	e.preventDefault();

	const users = await usersList();

	const transactionType = document.querySelector("#transactionType").value;
	const currency = document.querySelector("#currency").value;

	if (transactionType == "" && currency == "") {
		// TODO: Create Alert message
		console.log("Al menos un campo es requerido.");
		// Mensaje de alerta
		alertMessage();

		// Muestra nuevamente la lista completa de usuarios
		showAllUsers();
	}


	const usersCurrencyFilter = filterData(users, currency);
	const usersTransactionTypeFilter = filterData(users, transactionType);

	console.log(usersCurrencyFilter)
	console.log(usersTransactionTypeFilter)

	if (usersCurrencyFilter) {
		showUsers(usersCurrencyFilter);
	}

	if (usersTransactionTypeFilter) {
		showUsers(usersTransactionTypeFilter);
	}

}

function alertMessage() {

	let alertBox = document.createElement("div");
	let msg = document.createTextNode("Al menos un campo es requerido.");
	let p = document.createElement('p');
	let btn = document.createElement('button');

	btn.innerHTML = "&#10004;";
	btn.classList.add("btnMessageBox");
	btn.setAttribute('id', 'btnAlertMessage');
	alertBox.classList.add("alertMessageBox");

	p.appendChild(msg);
	alertBox.appendChild(p);
	alertBox.appendChild(btn);

	document.getElementById("app").appendChild(alertBox);

	btn.addEventListener('click', deleteAlertMessage);

}

function deleteAlertMessage() {
	const btn = document.getElementById('btnAlertMessage');

	return btn.parentElement.remove();
}



