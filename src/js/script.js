'use strict';

document.addEventListener("DOMContentLoaded", () => {
    const movieDB = {
        movies: [
            "Логан",
            "Лига справедливости",
            "Ла-ла лэнд",
            "Одержимость",
            "Скотт Пилигрим против всех"
        ]
    };
    
    const adv = document.querySelectorAll('.promo__adv img'),
          promoBg = document.querySelector('.promo__bg'),
          genre = promoBg.querySelector('.promo__genre'),
          filmList = document.querySelector('.promo__interactive-list'),
          btnAddFilm = document.querySelector('form.add > button'),
          inputedFilmInForm = document.getElementById('watchedFilm');
    
    let deleteFilmFromListBTN = document.querySelectorAll('.delete');
    
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
                if(document.querySelector("form.add [type='checkbox']").checked) {
                    console.log("Добавляем любимый фильм!");
                } 
                e.preventDefault();

                movieDB.movies.push(firstSymbolToUpper(inputedFilmInForm.value));
                movieDB.movies.sort(); 
                inputedFilmInForm.value = "";
                
                updateFilmList();
            }
        });
    }
    
    function noMoreXSymbols(str, x) { //x - максимальное кол-во выводимых символов
        if(str.length > x) {

            if (str[22] == " ") {
                str = str.slice(0, x+1) + "...";
            }
            else if (str[22] != " ") { //если 22-й символ - не пробел, то долнительно обрезает на последнем пробеле
                str = str.slice(0, x+1) + "...";
    
                for (let i = str.length; i > 0; i--) { 
                    if (str[i] == " ") {
                        str = str.slice(0, i) + "...";
                        break;
                    }
                    if(i == 10) {
                        str = str.slice(0, x+1) + "...";
                        break;
                    }
                }
            }

        }

        return str;
    }
    
    function firstSymbolToUpper(str) {
        str = str.trim();
        str = str.replace(/(\r\n|\n|\r)/gm,"");
        str = str[0].toUpperCase() + str.toLowerCase().slice(1);

        return str;
    }
    
    function updateFilmList() {//помещается обновленный список фильмов на страницу
        filmList.innerHTML = "";
        movieDB.movies.forEach( (film, i) => { 
            filmList.innerHTML += `
                <li class="promo__interactive-item">${i+1}) ${noMoreXSymbols(film, 21)}
                    <div class="delete"></div>
                </li>
            `;
        });
        initializeDeleteFilmFunction();
    }
    
    function initializeDeleteFilmFunction() {
        document.querySelectorAll('.delete').forEach ( (item, i) => {
            item.addEventListener("click", () => {
                movieDB.movies.splice(i,1);
                item.parentElement.remove(); //удаляет элемент со страницы
                updateFilmList();
            });
        });
    }
});