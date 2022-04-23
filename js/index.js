document.addEventListener('DOMContentLoaded', () => {
	const tabs = document.querySelectorAll('.tabheader__item');
	const tabsContent = document.querySelectorAll('.tabcontent');
	const tabsParent = document.querySelector('.tabheader__items');
	
	function hideTabContent() {
		tabsContent.forEach(tab => {
			tab.classList.add('hide');
			tab.classList.remove('show', 'fade');
		});
		
		tabs.forEach(tab => {
			tab.classList.remove('tabheader__item_active');
		});
	}
	
	function showTabContent(i = 0) {
		tabsContent[i].classList.add('show', 'fade');
		tabsContent[i].classList.remove('hide');
		tabs[i].classList.add('tabheader__item_active');
	}
	
	hideTabContent();
	showTabContent();
	
	tabsParent.addEventListener('click', (event) => {
		const target = event.target;
		
		if (target && target.classList.contains('tabheader__item')) {
			tabs.forEach((tab, i) => {
				if (target == tab) {
					hideTabContent();
					showTabContent(i);
				}
			});
		}
		
	});
	
	
	const deadLine = '2022-05-11';
	
	function getTimeRemaining(endtime) {
		const t = Date.parse(endtime) - Date.parse(new Date()),
			days = Math.floor(t / (1000*60*60*24)),
			hours = Math.floor(t / (1000*60*60) % 24),
			minutes = Math.floor((t / 1000 / 60) % 60),
			seconds = Math.floor((t / 1000) % 60);
		
		return {
			'total': t,
			'days': days,
			'hours': hours,
			'minutes': minutes,
			'seconds': seconds,
		};
	}
	
	function getZero(num) {
		if (num >= 0 && num < 10) {
			return `0${num}`;
		} else {
			return  num;
		}
	}
	
	function setClock(selector, endtime) {
		const timer = document.querySelector(selector),
			  days = timer.querySelector('#days'),
			  hours = timer.querySelector('#hours'),
			  minutes = timer.querySelector('#minutes'),
			  seconds = timer.querySelector('#seconds'),
			  timeInterval = setInterval(updateClock, 1000);
		
		updateClock();
		
		function updateClock() {
			const t = getTimeRemaining(endtime);
			
			days.innerHTML = getZero(t.days);
			hours.innerHTML = getZero(t.hours);
			minutes.innerHTML = getZero(t.minutes);
			seconds.innerHTML = getZero(t.seconds);
			
			if (t.total <= 0) {
				clearInterval(timeInterval);
			}
		}
	}
	setClock('.timer', deadLine);
	
	
	const modalTrigger = document.querySelectorAll('[data-modal]'),
		  modal = document.querySelector('.modal'),
		  modalCloseBtn = document.querySelector('[data-close]');
	
	function openModal() {
		modal.classList.add('show');
		modal.classList.remove('hide');
		// modal.classList.toggle('hide');
		document.body.overflow = 'hidden';
		clearInterval(modalTimerId);
	}
	
	modalTrigger.forEach(btn => {
		btn.addEventListener('click', openModal);
	});
	
	function closeModal() {
		modal.classList.add('hide');
		modal.classList.remove('show');
		// modal.classList.toggle('show');
		document.body.overflow = 'hidden';
	}
	
	modalCloseBtn.addEventListener('click', closeModal);
	
	modal.addEventListener('click', (e) => {
		if(e.target === modal) {
			closeModal();
		}
	});
	
	document.addEventListener('keydown', (e) => {
		if (e.code === 'Escape' && modal.classList.contains('show')) {
			closeModal();
		}
	});
	
	const modalTimerId = setTimeout(openModal, 30000);
	
	function showModalByScroll() {
		if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
			openModal();
			window.removeEventListener('scroll', showModalByScroll);
		}
	}
	
	window.addEventListener('scroll', showModalByScroll);

	class MenuCard {
		constructor(src, alt, title, desc, price, parentSelector, ...classes) {
			this.src      = src;
			this.alt      = alt;
			this.title    = title;
			this.desc     = desc;
			this.price    = price;
			this.classes  = classes;
			this.parent   = document.querySelector(parentSelector);
			this.transfer = 81;
			this.changeToUAH();
		}

		changeToUAH(){
			this.price = this.price * this.transfer;
		}

		render() {
			const element = document.createElement('div');
			if (!this.classes.length === 0) {
				this.element = 'menu__item';
				element.classList.add(this.element)
			} else {
				this.classes.forEach(className => element.classList.add(className))
			}
			
			element.innerHTML = `
				<img src="${this.src}" alt="${this.alt}">
				<h3 class="menu__item-subtitle">${this.title}</h3>
				<div class="menu__item-descr">${this.desc}</div>
				<div class="menu__item-divider"></div>
				<div class="menu__item-price">
					<div class="menu__item-cost">Цена:</div>
					<div class="menu__item-total"><span>${this.price}</span> руб/день</div>
				</div>`;
			this.parent.append(element);
		}
	}

	new MenuCard(
		'img/tabs/vegy.jpg',
		'vegy',
		'Меню "Фитнес"',
		'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
		2,
		'.menu .container',
		'menu__item'
	).render();

	new MenuCard(
		'img/tabs/vegy.jpg',
		'vegy',
		'Меню "Фитнес"',
		'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
		2,
		'.menu .container',
		'menu__item'
	).render();

	new MenuCard(
		'img/tabs/vegy.jpg',
		'vegy',
		'Меню "Фитнес"',
		'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
		2,
		'.menu .container',
		'menu__item'
	).render();
	
});

