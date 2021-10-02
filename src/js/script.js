'use strict';

const movieDB = {
    movies: [
        "Логан",
        "Лига справедливости",
        "Ла-ла лэнд",
        "Одержимость",
        "Скотт Пилигрим против..."
    ]
};

const adv = document.querySelectorAll('.promo__adv img'),
      promoBg = document.querySelector('.promo__bg'),
      genre = promoBg.querySelector('.promo__genre'),
      filmList = document.querySelector('.promo__interactive-list'),
      btnAddFilm = document.querySelector('form.add > button'),
      inputedFilmInForm = document.getElementById('watchedFilm');

let deleteFilmFromListBTNS = document.querySelectorAll('.delete');

adv.forEach(item => {
    item.remove();
});

genre.textContent = 'драма';

promoBg.style.backgroundImage = "url('img/bg.jpg')";

addFilm();
initializeDeleteFilmFunction();


//functions
function addFilm() {
    btnAddFilm.addEventListener('click', (e) => {
        if(inputedFilmInForm.value != "") {  
            if(document.querySelector("form.add input:nth-of-type(n+2)").checked) {
                console.log("Добавляем любимый фильм!");
            } 
            e.preventDefault();
            movieDB.movies.push(firstSymbolToUpper(inputedFilmInForm.value, 0));
            inputedFilmInForm.value = "";
            updateFilmList();
        }
    });
}

function noMoreXSymbols(x, str) { //x - максимальное кол-во выводимых символов
    if(str.length > 21) {
        str = str.slice(0, x+1) + "...";

        for (let i = str.length; i > 0; i--) { //дополнительно обрезает на последнем пробеле
            if (str[i] == " ") {
                str = str.slice(0, i+1) + "...";
                break;
            }
        }
    }
    return str;
}

function firstSymbolToUpper(str, numFirstSymbol) {
    str = str[numFirstSymbol].toUpperCase() + str.toLowerCase().slice(numFirstSymbol+1);
    str = str.replace(/(\r\n|\n|\r)/gm,"");
    str = str.trim();
    return str;
}

function updateFilmList() {//помещается обновленный список фильмов на страницу
    movieDB.movies.sort(); 
    filmList.innerHTML = "";
    movieDB.movies.forEach( (film, i) => { 
        filmList.innerHTML += `
            <li class="promo__interactive-item">${i+1}) ${noMoreXSymbols(21, film)}
                <div class="delete"></div>
            </li>
        `;
    });
    deleteFilmFromListBTNS = document.querySelectorAll('.delete');
    initializeDeleteFilmFunction();
}

function initializeDeleteFilmFunction() {
    deleteFilmFromListBTNS.forEach ( item => {
        item.addEventListener("click", () => {
            const deletedElement = firstSymbolToUpper(item.parentElement.textContent, 3);

            movieDB.movies.forEach( (film, i) => { //удаляет элемент из массива
                if(firstSymbolToUpper(film, 0) == firstSymbolToUpper(deletedElement, 0)) {
                    movieDB.movies.splice(i,1);
                }
            });
            item.parentElement.remove(); //удаляет элемент со страницы
            updateFilmList();
        });
    });
}