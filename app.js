// Кнопки
const tariff = Array.from(document.querySelectorAll('.tariff'));
// Кнопки c выводом суммы справа 
const total = document.querySelector('#total');
// ползунок и значение 2
const time = document.querySelector('#time');
const volume = document.querySelector('#volume');
// опции
const option = Array.from(document.querySelectorAll('.option'));
//тз - итого сумма с опциями *
//тз - дополнительно опция по выбору опции -> st
//-> st2 тз = для optionUpdate вызвать updatePrice и OptionUpdate для обновления
//-> end тз updatePrice  и //getOptionPrice метод уже есть в самом *начале*
// тз - смена тарифа справа *


const orderTariff = document.querySelector('#order_tariff');
// тз - срок аренды 
const orderTime = document.querySelector('#order_time');
// тз - опции
const orderOption = document.querySelector('#order_option');


tariff.forEach((el) => {
	el.addEventListener('click', tariffUpdate);
});
time.addEventListener("input", timeUpdate);
option.forEach((el) => {
	el.addEventListener('change', optionUpdate);
});


function tariffUpdate(e) {
	currentSet.tariff = e.target.id;
	console.log(currentSet.tariff);
	// после смены тарифа, идет смена цены
	updatePrice();
	// вызовы функций по очереди !!!
	orderUpdate();
}

function timeUpdate(e) {
	//изменяем currentSet и считываем значение с ползунка 
	currentSet.time = time.value;
	//изменяем volume 
	volume.value = currentSet.time;
	//обновляем итоговую стоимость
	updatePrice();
	orderUpdate();
}

function optionUpdate(e) {
	//от срабатывания двойного клика
	e.stopPropagation();
	//выбранная опция
	if(e.target.checked) {
		//добавляем id опцию/и в массив option in CurrentSEt
		//работаем с id
		currentSet.option.push(e.target.id);
		//если чекбокс не выбран - надо его удалить    
	} else {
		//Узнаем индекс нашей опции! 
		let index = currentSet.option.indexOf(e.target.id);
		//после удаляем нашу опцию
		currentSet.option.splice(index, 1);
	} //НЕ ЗАБЫВАТЬ ВЫЗВАТЬ ФУНКЦИЮ!!! ИНАЧЕ НЕ_БУ.ДЕТ_РА.БО.ТА.ТЬ_!!!
	updatePrice();
	orderUpdate();
}


// изменяет total цену 
function updatePrice() {
	// получаем стоимость текущего тарифа + меняем стоимость 
	let tariffPrice = currentSet.getTariffPrice();
	//считываем из currentSet
	let optionPrice = currentSet.getOptionPrice();
	//добавляем перем-ю optionPrice к общему расчету + optionPrice
	let totalPrice = currentSet.time * tariffPrice + optionPrice; // общая стоимость * тариф  + обновляем итоговую стоимость currentSet.time * tariffPrice 
	total.value = totalPrice;
}


// изменяет order_тариф 
function orderUpdate() {
	if(currentSet.time < 5) {
		orderTime.value = currentSet.time + " часа";
	} else {
		orderTime.value = currentSet.time + " часов";
	}
	orderTariff.value = currentSet.getTariffPrice() + "\u{20BD}/час";
	// вкладка дополнительно
	orderOption.value = currentSet.getOptionPrice() + "\u{20BD}";
}


const priceInfo = {
	tariff: {
		economy: 500,
		comfort: 800,
		business: 1100,
		premium: 1400,
	},
	option: {
		option1: 1000,
		option2: 1500,
		option3: 1500,
		option4: 2000,
	},
};


let currentSet = {
	tariff: "comfort",
	time: 2,
	option: [],
	getTariffPrice() {
		return priceInfo.tariff[this.tariff];
	},
	getOptionPrice() {
		let optionPrice = 0;
		if(!this.option.length == 0) {
			this.option.forEach((el) => {
				optionPrice += priceInfo.option[el];
			});
		}
		return optionPrice;
	},
};
// console.log(currentSet.getOptionPrice());
// console.log(currentSet.getTariffPrice());