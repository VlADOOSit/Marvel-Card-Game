let socket = io();
let userId;
let login;
let img;


socket.on("connect", () => {
    console.log(`my id = ${socket.id}`);
    userId = socket.id;
});

document.getElementById('gradient-button').addEventListener('click', () => {
    if(document.getElementById('gradient-button').value == "Пошук суперника"){
        login = document.getElementById('user').innerText;
        img = document.getElementById('avatar').src;
        
        socket.emit('start-search');

        document.getElementById('load').setAttribute('style', 'display: block');
        document.getElementById('gradient-button').setAttribute('value', 'Скасувати пошук');
    }
    else {
        socket.emit('close-search');
        document.getElementById('load').setAttribute('style', 'display: none');
        document.getElementById('gradient-button').setAttribute('value', 'Пошук суперника');
    }
    
});

let datas;

socket.on('start-game', (data) => {
    
    document.getElementById('container1').setAttribute('style', 'display:none');
    document.getElementById('container2').setAttribute('style', 'display:block');
    document.body.style.backgroundImage = "url('assets/game/fon2.png')";
    document.getElementById('youName').innerText = login;
    document.getElementsByClassName('main-cards__image')[1].style.backgroundImage = `url(${img})`;
    window.scrollTo(0, document.body.scrollHeight);

    
    
    console.log('game started');
    console.log(`creator - ${data.creator}, opponent - ${data.opponent}`);
    //checkStart(1);//ІНФУ ВЗЯТИ З СЄРВАКА
    console.log(data.creator);
    if(userId == data.creator) {
        checkStart(1);//ІНФУ ВЗЯТИ З СЄРВАКА
    }
    else {
        checkStart(0);
    }
    datas=data;
    if (userId == datas.creator) {
        socket.emit('setName', datas.opponent, login);
    }
    else {
        socket.emit('setName', datas.creator, login);
    }

    socket.on('getName', (log) => {
        document.getElementById('oppName').innerText = log;
    });

    if (userId == datas.creator) {
        socket.emit('setAva', datas.opponent, img);
    }
    else {
        socket.emit('setAva', datas.creator, img);
    }

    socket.on('getAva', (resImg) => {
        document.getElementsByClassName('main-cards__image')[0].style.backgroundImage = `url(${resImg})`;
    });

});



let counterCardsUser = 0;
let counterCardsOpponent = 0;
let counterOnBoardCardsUser = 0;
let counterOnBoardCardsOpponent = 0;
let counterOfClicks = false;
const nHeroes = 21;
let previousIndexOfCard = -1;
let previousCounterOnBoardCardsUser = 0;
let arrOfIndexUserCards= [];
let arrHeroes = [];

arrHeroes[0] = {
    id: 'spiderman',
    attack: 5,
    defense: 4,
    price: 5,
    name: 'Людина-павук',
    superpower: 'Вам додається 2 картки '
}
arrHeroes[1] = {
    id: 'captain-America',
    attack: 4,
    defense: 4,
    price: 5,
    name: 'Капітан Америка',
    superpower: '+1 до захисту карток співкомандників'

}
arrHeroes[2] = {
    id: 'iron-man',
    attack: 2,
    defense: 7,
    price: 4,
    name: 'Залізна людина',
    superpower: '-1 до атаки карток опонентів'
}
arrHeroes[3] = {
    id: 'black-widow',
    attack: 2,
    defense: 1,
    price: 1,
    name: 'Чорна вдова',
    superpower: '+1 до атаки карток співкомандників'
}
arrHeroes[4] = {
    id: 'tor',
    attack: 4,
    defense: 4,
    price: 5,
    name: 'Тор',
    superpower: '+3 монети на цьому ході'
}
arrHeroes[5] = {
    id: 'hulk',
    attack: 7,
    defense: 6,
    price: 5,
    name: 'Халк',
    superpower: 'Не має спеціальних навичок.'
    
}
arrHeroes[6] = {
    id: 'deadpool',
    attack: 4,
    defense: 2,
    price: 3,
    name: 'Дедпул',
    superpower: "+3 до здоров'я вашого героя."
}
arrHeroes[7] = {
    id: 'black-pantera',
    attack: 4,
    defense: 3,
    price: 4,
    name: 'Чорна пантера',
    superpower: "-3 до здоров'я героя опонента."
}
arrHeroes[8] = {
    id: 'doctor-strength',
    attack: 5,
    defense: 2,
    price: 5,
    name: 'Доктор Стрендж',
    superpower: 'Може атакувати на першому ході.'
}
arrHeroes[9] = {
    id: 'thanos',
    attack: 6,
    defense: 6,
    price: 8,
    name: 'Танос',
    superpower: 'Ставиться одразу 2 даних картки.'
}
arrHeroes[10] = {
    id: 'eye',
    attack: 2,
    defense: 1,
    price: 3,
    name: 'Соколине око',
    superpower: '+2 до захисту карток співкомандників'
}
arrHeroes[11] = {
    id: 'nick-fiuri',
    attack: 2,
    defense: 2,
    price: 3,
    name: 'Нік Фьюрі',
    superpower: '+2 до атаки карток співкомандників'
}
arrHeroes[12] = {
    id: 'antman',
    attack: 2,
    defense: 1,
    price: 5,
    name: 'Людина-мураха',
    superpower: 'При появі знищує всі картки опонента.'
}
arrHeroes[13] = {
    id: 'groot',
    attack: 1,
    defense: 1,
    price: 4,
    name: 'Грут',
    superpower: 'При появі знищує всі картки на столі.'
}
arrHeroes[14] = {
    id: 'gamora',
    attack: 2,
    defense: 3,
    price: 3,
    name: 'Гамора',
    superpower: '-2 до ціни ваших витягнутих карток.'
}
arrHeroes[15] = {
    id: 'star-knight',
    attack: 2,
    defense: 1,
    price: 3,
    name: 'Зоряний лорд',
    superpower: 'Розблоковує хід усім вашим карткам.'
}
arrHeroes[16] = {
    id: 'rocket',
    attack: 1,
    defense: 2,
    price: 3,
    name: 'Ракета',
    superpower: 'Захист всіх карток ворога стає 2.'
}
arrHeroes[17] = {
    id: 'drucks',
    attack: 1,
    defense: 3,
    price: 2,
    name: 'Дракс руйнівник',
    superpower: 'Атака всіх карток ворога стає 2.'
}
arrHeroes[18] = {
    id: 'winter-soldier',
    attack: 1,
    defense: 2,
    price: 2,
    name: 'Зимовий солдат',
    superpower: 'Атака всіх ваших карток стає 3.'
}
arrHeroes[19] = {
    id: 'falcon',
    attack: 3,
    defense: 2,
    price: 3,
    name: 'Сокіл',
    superpower: 'Захист всіх ваших карток стає 3.'
}
arrHeroes[20] = {
    id: 'roady',
    attack: 3,
    defense: 3,
    price: 4,
    name: 'Роуді',
    superpower: '-2 до атаки карток опонентів'
}

function getRandomArbitrary(max, min){
    return Math.round(Math.random() * (max - min) + min);
}
//ВПРИНЦИПІ 2 АНІМАЦІЇ. ПЕРШЕ - ЗМІНА КОЛЬОРУ СТАТКИ, ЯКА ЗМІНИЛАСЯ(НАПРИКЛАД на 1с стала червоною)
//ДРУГЕ - може змінюватись яскравість картки поступово, при анблокові всіх карток, або можливість атаки зразу

//1!!! НА СЄРВАКУ СТВОРЮЄМО ДАНІ ПРО ТО, ХТО ПЕРШИЙ ХОДИТЬ. ПОСИЛАЄМО ЦЕ КЛІЄНТУ ЦИФРОЮ. true(або будь яка цифра) - перший ходиш ти, false(або 0 або нічого) - оппонент.
function checkStart(number = false){
    if(number){
        let button = document.getElementById('red-button');
        button.innerHTML = 'Ваш хід';
        button.style.background = 'linear-gradient(#83a4ff, #0059ff 48%, #002efc 52%, #0318d6)';
        button.style.border = '2px solid #0318d6';
        button.removeAttribute('disabled'); 
    }
}



function changeCourse(){
    let button = document.getElementById('red-button');
    if(button.innerHTML == 'Ваш хід'){ 
        let cur_value = Number(document.getElementById('money-opponent-value').innerHTML);
        if(cur_value < 9){
            cur_value++;
            document.getElementById('money-opponent-value').innerHTML = cur_value;
        }
        button.innerHTML = 'Хід суперника';
        button.style.border = '2px solid #9c0101';
        button.style.background = 'linear-gradient(#FB9575, #F45A38 48%, #EA1502 52%, #F02F17)';  
        button.setAttribute('disabled', true);      
        addNewOpponentCard();
        //2!!!НА СЕРВАК НАМ Є СЕНС ПОСИЛАТЬ ЛИШЕ ФАКТ ТОГО, ЩО ХІД ЗАКІНЧЕНО
        console.log(datas);
        if (userId == datas.creator) {
            socket.emit('endCourse', datas.opponent);
        }
        else {
            socket.emit('endCourse', datas.creator);
        }
    }
    else{//2!!!ІНФА ПРО ЗАКІНЧЕННЯ ХОДУ ПРИХОДИТЬ З СЕРВАКА.
        button.innerHTML = 'Ваш хід';
        button.style.background = 'linear-gradient(#83a4ff, #0059ff 48%, #002efc 52%, #0318d6)';
        button.style.border = '2px solid #0318d6';
        button.removeAttribute('disabled'); 
        let cur_value = Number(document.getElementById('money-user-value2').innerHTML);
        document.getElementById('money-user-value1').innerHTML = cur_value;
        if(cur_value < 9){ cur_value++;}
        document.getElementById('money-user-value1').innerHTML = cur_value;
        document.getElementById('money-user-value2').innerHTML = cur_value;
        addNewUserCard(); 
        //unclickOpponentCard();
        clickOnBoardCard(counterOnBoardCardsUser);
        //if(counterOnBoardCardsOpponent > 1){//ТЕСТОВА ТЄМА, НЕ ЗАБУТИ ВИДАЛИТИ!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        //    hitByOpponent(-1, 1);
        //}
    }
}

socket.on('startCourse', () => {
    console.log('123123');
    changeCourse();
})

function Hide1(){ 
    document.getElementsByClassName('message')[1].style.display = "none";
}

function addNewUserCard(){

    if(counterCardsUser <= 7){
        counterCardsUser++;
        let temp = counterCardsUser;
        let index = getRandomArbitrary(20.499999, -0.499999);
        let user_cards = document.querySelector('.cards_user');
        user_cards.innerHTML += ` 
        <div id=${arrHeroes[index].id} >
            <div class="cards" id='cardUser${counterCardsUser}'>
                <div class="cards__image">
                    <img src="assets/heroes/${index + 1}.png" alt="Hero" id="img-${arrHeroes[index].id}">
                </div>
                <div class="cards__unit-name">${arrHeroes[index].name}</div>
                <div class="cards__unit-description">${arrHeroes[index].superpower}</div>
                <div class="cards__unit-stats clearfix">
                    <div class="one-third">
                        <div class="stat">${arrHeroes[index].attack}</div>
                        <div class="stat-value">Атака</div>
                    </div>
                    <div class="one-third">
                        <div class="stat">${arrHeroes[index].defense}</div>
                        <div class="stat-value">Захист</div>
                    </div>
                    <div class="one-third no-border">
                        <div class="stat">${arrHeroes[index].price}</div>
                        <div class="stat-value">Ціна</div>
                    </div>
                </div>
            </div>
        </div>`;
        addAnimation1(); 
        for(let i = 1; i < counterCardsUser + 1; i++){
            let current = document.getElementById('cardUser' + i);
            if(document.getElementById('money-user-value1').innerHTML >= current.children[3].children[2].children[0].innerHTML){
                addHover1(i);
            } 
            else{
                removeHover1(i);
            }
        }
        for(let i = 1; i < counterOnBoardCardsUser + 1; i++){
            removeOpacity(i);
        }
        removeAnimation2(); 
        sortCards('cardUser', counterCardsUser);
        clickOnCard(counterCardsUser);
        unclickOpponentCard();
    }
    else{
        //alert('Максимальна кількість карт вже на столі');
        document.getElementsByClassName('message')[1].setAttribute('style', 'display:block');
        setTimeout(Hide1, 3000);
        for(let i = 1; i < counterCardsUser + 1; i++){
            let current = document.getElementById('cardUser' + i);
            if(document.getElementById('money-user-value1').innerHTML >= current.children[3].children[2].children[0].innerHTML){
                addHover1(i);
            } 
            else{
                removeHover1(i);
            }
        }
        
    }
}

function addNewUserCardModified(){

    if(counterCardsUser <= 7){
        counterCardsUser++;
        let temp = counterCardsUser;
        let index = getRandomArbitrary(20.499999, -0.499999);
        let user_cards = document.querySelector('.cards_user');
        user_cards.innerHTML += ` 
        <div id=${arrHeroes[index].id} >
            <div class="cards" id='cardUser${counterCardsUser}'>
                <div class="cards__image">
                    <img src="assets/heroes/${index + 1}.png" alt="Hero" id="img-${arrHeroes[index].id}">
                </div>
                <div class="cards__unit-name">${arrHeroes[index].name}</div>
                <div class="cards__unit-description">${arrHeroes[index].superpower}</div>
                <div class="cards__unit-stats clearfix">
                    <div class="one-third">
                        <div class="stat">${arrHeroes[index].attack}</div>
                        <div class="stat-value">Атака</div>
                    </div>
                    <div class="one-third">
                        <div class="stat">${arrHeroes[index].defense}</div>
                        <div class="stat-value">Захист</div>
                    </div>
                    <div class="one-third no-border">
                        <div class="stat">${arrHeroes[index].price}</div>
                        <div class="stat-value">Ціна</div>
                    </div>
                </div>
            </div>
        </div>`;
        //ЗМІНЮВАВ ФУНКЦІЮ!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        addAnimation1(); 
        for(let i = 1; i < counterCardsUser + 1; i++){
            let current = document.getElementById('cardUser' + i);
            if(document.getElementById('money-user-value1').innerHTML >= current.children[3].children[2].children[0].innerHTML){
                addHover1(i);
            } 
            else{
                removeHover1(i);
            }
        }
        sortCards('cardUser', counterCardsUser);
        clickOnCard(counterCardsUser);
    }
    else{
        //alert('Максимальна кількість карт вже на столі');
        document.getElementsByClassName('message')[1].setAttribute('style', 'display:block');
        setTimeout(Hide1, 3000);
        for(let i = 1; i < counterCardsUser + 1; i++){
            let current = document.getElementById('cardUser' + i);
            if(document.getElementById('money-user-value1').innerHTML >= current.children[3].children[2].children[0].innerHTML){
                addHover1(i);
            } 
            else{
                removeHover1(i);
            }
        }
        
    }
}

function addNewOpponentCard(){
    counterCardsOpponent++;
    if(counterCardsOpponent <= 8){
        let user_cards = document.querySelector('.cards_opponent');
        user_cards.innerHTML += ` 
            <div id='cardOpponent${counterCardsOpponent}'>
                <img src='./assets/game/card2.jpeg' id='cardOpponentImg${counterCardsOpponent}' alt='CardOpponent'>
            </div> `;
        removeAnimation2Opponent();
        addAnimationOpponent1();
        sortCards('cardOpponentImg', counterCardsOpponent);
        for(let i = 1; i < counterCardsUser + 1; i++){
            removeHover1(i);
        }
        unclickOpponentCard();
    }
    else{
        counterCardsOpponent--;
    }
}

function addNewOpponentCardModified(){
    counterCardsOpponent++;
    if(counterCardsOpponent <= 8){
        let user_cards = document.querySelector('.cards_opponent');
        user_cards.innerHTML += ` 
            <div id='cardOpponent${counterCardsOpponent}'>
                <img src='./assets/game/card2.jpeg' id='cardOpponentImg${counterCardsOpponent}' alt='CardOpponent'>
            </div> `;
            //ЗМІНЮВАВ ФУНКЦІЮ!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        addAnimationOpponent1();
        sortCards('cardOpponentImg', counterCardsOpponent);
        unclickOpponentCard();
    }
    else{
        counterCardsOpponent--;
    }
}

function sortCards(playerId, counter){
    let curUserCard = document.getElementById(playerId + 1);
    if(curUserCard === null){
        return;
    }
    if(counter % 2 == 0){
        let start = 54 - counter * 7 / 2;
        curUserCard.style.left = start + '%';
        for(let i = 2; i <= counter; i++){
            curUserCard = document.getElementById(playerId + i);
            start += 7;
            curUserCard.style.left = start + '%';
        }
    }
    else{
        let start = 50.5 - (counter - 1) * 7 / 2;
        curUserCard.style.left = start + '%';
        for(let i = 2; i <= counter; i++){
            curUserCard = document.getElementById(playerId + i);
            start += 7;
            curUserCard.style.left = start + '%';
        }
    }
}

function clickOnCard(counter){
    for(let i = 0; i < counter + 1; i++){
        let card = document.getElementById('cardUser' + i);
        if(card !== null && card !==undefined){
            card.onclick = () =>{addUserCardOnBoard(i);}
        }
    }
}


function Hide(){ 
    document.getElementsByClassName('message')[0].style.display = "none";
}


function checkSuperpower(index){
    //console.log(index);
    switch(index){
        case 0:
            addNewUserCardModified();
            setTimeout( ()=>{
                removeAnimation2();
                addNewUserCardModified();
            }, 1500);
            break;
        case 1:
            for(let i = 1; i < counterOnBoardCardsUser; i++){
                let elem = document.getElementById('card-user-on-board' + i);
                elem.children[3].children[1].children[0].innerHTML = Number(elem.children[3].children[1].children[0].innerHTML) + 1;
                addAnimation5(elem, 1);
                setTimeout(()=>{
                        removeAnimation5(elem, 1);
                },1000)
            }
            break;
        case 2:
            for(let i = 1; i < counterOnBoardCardsOpponent + 1; i++){
                let elem = document.getElementById('cardOpponentOnBoard' + i);
                if(elem.children[3].children[0].children[0].innerHTML > 1){
                    elem.children[3].children[0].children[0].innerHTML = Number(elem.children[3].children[0].children[0].innerHTML) - 1;
                    addAnimation5(elem, 0);
                    setTimeout(()=>{
                        removeAnimation5(elem, 0);
                    },1000)
                }
            }
            break;
        case 3:
            for(let i = 1; i < counterOnBoardCardsUser; i++){
                let elem = document.getElementById('card-user-on-board' + i);
                elem.children[3].children[0].children[0].innerHTML = Number(elem.children[3].children[0].children[0].innerHTML) + 1;
                addAnimation5(elem, 0);
                setTimeout(()=>{
                    removeAnimation5(elem, 0);
                }, 1000)
            }
            break;
        case 4:
            document.getElementById('money-user-value1').innerHTML = Number(document.getElementById('money-user-value1').innerHTML) + 3;
            for(let i = 1; i < counterCardsUser + 1; i++){
                let current = document.getElementById('cardUser' + i);
                if(document.getElementById('money-user-value1').innerHTML >= current.children[3].children[2].children[0].innerHTML){
                    addHover1(i);
                } 
                else{
                    removeHover1(i);
                }
            }
            break;
        case 5:
            break;
        case 6:
            document.getElementById('you').children[2].children[0].innerHTML = Number(document.getElementById('you').children[2].children[0].innerHTML) + 3;
            addAnimation5Main(document.getElementById('you'));
            setTimeout(()=>{
                removeAnimation5Main(document.getElementById('you'));
            }, 1000);
            break;
        case 7:
            if(Number(document.getElementById('opponent').children[2].children[0].innerHTML) > 3) {
                document.getElementById('opponent').children[2].children[0].innerHTML = Number(document.getElementById('opponent').children[2].children[0].innerHTML) - 3;
            }
            else{
                document.getElementById('opponent').children[2].children[0].innerHTML = 1;
            }
            addAnimation5Main(document.getElementById('opponent'));
            setTimeout(()=>{
                removeAnimation5Main(document.getElementById('opponent'));
            }, 1000);
            break;
        case 8:
            clickOnBoardOneCard(counterOnBoardCardsUser);
            removeOpacity(counterOnBoardCardsUser);
            let cardUser = document.getElementById('card-user-on-board' + counterOnBoardCardsUser);
            cardUser.style.opacity = '0.6';
            setTimeout(()=>{
                cardUser.animate([
                    {
                        opacity: '0.6'
                    },
                    {
                        opacity: '1'
                    }
                ], 1000);
                cardUser.style.opacity = '1';
                cardUser.style.animation = null;
            },1000);
            break;
        case 9:
            if(counterOnBoardCardsUser <= 6){
                counterOnBoardCardsUser++;
                let user_cards = document.querySelector('.cards_user');                    
                user_cards.innerHTML += ` 
                <div id=${arrHeroes[9].id} >
                    <div class="cards" id='card-user-on-board${counterOnBoardCardsUser}'>
                        <div class="cards__image">
                            <img src="assets/heroes/10.png" alt="Hero" id="img-${arrHeroes[9].id}">
                        </div>
                        <div class="cards__unit-name">${arrHeroes[9].name}</div>
                        <div class="cards__unit-description">${arrHeroes[9].superpower}</div>
                        <div class="cards__unit-stats clearfix">
                            <div class="one-third">
                                <div class="stat">${arrHeroes[9].attack}</div>
                                <div class="stat-value">Атака</div>
                            </div>
                            <div class="one-third">
                                <div class="stat">${arrHeroes[9].defense}</div>
                                <div class="stat-value">Захист</div>
                            </div>
                            <div class="one-third no-border">
                                <div class="stat">${arrHeroes[9].price}</div>
                                <div class="stat-value">Ціна</div>
                            </div>
                        </div>
                    </div>
                </div>`;
                
                let divUserNumber = document.getElementById('card-user-on-board' + counterOnBoardCardsUser);
            setTimeout(() => {
                divUserNumber.style.display = 'block';
                addAnimation4(divUserNumber);
            }, 1000);
                divUserNumber.style.display = 'none';
                divUserNumber.style.top = '50%';              
                sortCardsOnBoard('card-user-on-board', counterOnBoardCardsUser);
                unclickOnBoardOneCard(counterOnBoardCardsUser);
                unclickOnBoardOneCard(counterOnBoardCardsUser - 1);
                addOpacity(counterOnBoardCardsUser);
                clickOnCard(counterCardsUser);
                unclickOpponentCard();          
        }
        for(let i = 1; i < counterOnBoardCardsUser - 1; i++){
            let card = document.getElementById('card-user-on-board' + i);
            if(card !== null && card !==undefined){
                //console.log(card.style.opacity);
                if(card.style.opacity == 1){
                    card.onclick = () =>{fightOpponent(i);}
                }
                else{
                    unclickOnBoardOneCard(i);
                }
            }
        }
        break;
        case 10:
            for(let i = 1; i < counterOnBoardCardsUser; i++){
                let elem = document.getElementById('card-user-on-board' + i);
                elem.children[3].children[1].children[0].innerHTML = Number(elem.children[3].children[1].children[0].innerHTML) + 2;
                addAnimation5(elem, 1);
                setTimeout(()=>{
                    removeAnimation5(elem, 1);
                }, 1000)
            }
            break;
        case 11:
            for(let i = 1; i < counterOnBoardCardsUser; i++){
                let elem = document.getElementById('card-user-on-board' + i);
                elem.children[3].children[0].children[0].innerHTML = Number(elem.children[3].children[0].children[0].innerHTML) + 2;
                addAnimation5(elem, 0);
                setTimeout(()=>{
                    removeAnimation5(elem, 0);
                }, 1000)
            }
            break;
        case 12:
            if(counterOnBoardCardsOpponent >= 1){
                for(let i = 1; i < counterOnBoardCardsOpponent + 1; i++){
                    let cardOpponent = document.getElementById('cardOpponentOnBoard' + i);
                    addAnimation3All(cardOpponent);
                    setTimeout(() => {
                        cardOpponent.outerHTML = '';
                    }, 1500);
                }   
                counterOnBoardCardsOpponent = 0;
            }
            break;
        case 13:
            for(let i = 1; i < counterOnBoardCardsOpponent + 1; i++){
                let cardOpponent = document.getElementById('cardOpponentOnBoard' + i);
                addAnimation3All(cardOpponent);
                setTimeout(() => {
                    cardOpponent.outerHTML = '';
                }, 1500);
            }   
            counterOnBoardCardsOpponent = 0;
            let last = document.getElementById('card-user-on-board' + counterOnBoardCardsUser);
            for(let i = 1; i < counterOnBoardCardsUser; i++){
                let cardUser = document.getElementById('card-user-on-board' + i);
                addAnimation3All(cardUser);
                setTimeout(() => {
                    cardUser.outerHTML = '';
                }, 1500);
            }   
            counterOnBoardCardsUser = 1;
            last.id = 'card-user-on-board1';
            last.style.left = '25%';
            unclickOnBoardOneCard(counterOnBoardCardsUser);
            break;
        case 14:
            for(let i = 1; i < counterCardsUser + 1; i++){
                let cardUser = document.getElementById('cardUser' + i);
                if(Number(cardUser.children[3].children[2].children[0].innerHTML) > 2) {
                    cardUser.children[3].children[2].children[0].innerHTML = Number(cardUser.children[3].children[2].children[0].innerHTML) - 2;
                }
                else{
                    cardUser.children[3].children[2].children[0].innerHTML = 1;
                }
                addAnimation5(cardUser, 2);
                setTimeout(()=>{
                    removeAnimation5(cardUser, 2);
                }, 1000);
                if(document.getElementById('money-user-value1').innerHTML >= cardUser.children[3].children[2].children[0].innerHTML){
                    addHover1(i);
                } 
                else{
                    removeHover1(i);
                }
            }
            break;
        case 15:
            for(let i = 1; i < counterOnBoardCardsUser; i++){
                let cardUser = document.getElementById('card-user-on-board' + i);
                console.log(cardUser.style.opacity);
                if(cardUser.style.opacity === '0.6'){
                    clickOnBoardOneCard(i);
                    removeOpacity(i);              
                    cardUser.style.opacity = '0.6';
                    setTimeout( () => {
                        cardUser.animate([
                            {
                                opacity: '0.6'
                            },
                            {
                                opacity: '1'
                            }
                        ], 1000);
                        cardUser.style.opacity = '1';
                        cardUser.style.animation = null;
                    },1000);
                }
            }
            break;
        case 16:
            for(let i = 1; i < counterOnBoardCardsOpponent + 1; i++){
                let elem = document.getElementById('cardOpponentOnBoard' + i);
                if(elem){
                    elem.children[3].children[1].children[0].innerHTML = 2;
                    addAnimation5(elem, 1);
                    setTimeout(()=>{
                        removeAnimation5(elem, 1);
                    },1000)
                }
            }
            break;
        case 17:
            for(let i = 1; i < counterOnBoardCardsOpponent + 1; i++){
                let elem = document.getElementById('cardOpponentOnBoard' + i);
                if(elem){
                    elem.children[3].children[0].children[0].innerHTML = 2;
                    addAnimation5(elem, 0);
                    setTimeout(()=>{
                        removeAnimation5(elem, 0);
                    },1000)
                }
            }
            break;
        case 18:
            for(let i = 1; i < counterOnBoardCardsUser; i++){
                let elem = document.getElementById('card-user-on-board' + i);
                if(elem){
                    elem.children[3].children[0].children[0].innerHTML = 3;
                    addAnimation5(elem, 0);
                    setTimeout(()=>{
                        removeAnimation5(elem, 0);
                    },1000)
                }
            }
            break;
        case 19:
            for(let i = 1; i < counterOnBoardCardsUser; i++){
                let elem = document.getElementById('card-user-on-board' + i);
                if(elem){
                    elem.children[3].children[1].children[0].innerHTML = 3;
                    addAnimation5(elem, 1);
                    setTimeout(()=>{
                        removeAnimation5(elem, 1);
                    },1000)
                }
            }
            break;
        case 20:
            for(let i = 1; i < counterOnBoardCardsOpponent + 1; i++) {
                let elem = document.getElementById('cardOpponentOnBoard' + i);
                if(elem.children[3].children[0].children[0].innerHTML > 2){
                    elem.children[3].children[0].children[0].innerHTML = Number(elem.children[3].children[0].children[0].innerHTML) - 2;
                }
                else{
                    elem.children[3].children[0].children[0].innerHTML = 1;
                }
                addAnimation5(elem, 0);
                setTimeout(()=>{
                    removeAnimation5(elem, 0);
                },1000)
            }
            break;
        default:
            console.log("default: " + index);
            break;
    }
}



function addUserCardOnBoard(indexOfCard){
    let cur_value = Number(document.getElementById('money-user-value1').innerHTML);
    let isYourCourse = document.getElementById('red-button');
    let indexOfHero;
    if(isYourCourse.innerHTML != 'Хід суперника'){
        if(counterOnBoardCardsUser <= 6){
            let divUserNumber = document.getElementById('cardUser' + indexOfCard);
            cur_value -= divUserNumber.children[3].children[2].children[0].innerHTML;
            if(cur_value >= 0){
                counterOnBoardCardsUser++;
                document.getElementById('money-user-value1').innerHTML = cur_value;
                divUserNumber.id = 'card-user-on-board' + counterOnBoardCardsUser;
                for(let i = 0; i < nHeroes; i++){
                    if(divUserNumber.parentElement.id == arrHeroes[i].id){
                        indexOfHero = i;
                        break;
                    }
                }
                divUserNumber.style.top = '50%';
                document.getElementById('card-user-on-board' + counterOnBoardCardsUser).style.animation = 'null';
                sortCardsOnBoard('card-user-on-board', counterOnBoardCardsUser);
                unclickOnBoardOneCard(counterOnBoardCardsUser);
                let currentCard;
                for( let n = indexOfCard + 1; n <= counterCardsUser; n++){
                    currentCard = document.getElementById('cardUser' + n);
                    let cur = n - 1;
                    currentCard.id = 'cardUser' + cur;
                }
                counterCardsUser--;
                sortCards('cardUser', counterCardsUser);
                removeAnimation1();
                removeAnimation2(); 
                addAnimation2(indexOfCard);
                addOpacity(counterOnBoardCardsUser);  
                reviewHover1();
                clickOnCard(counterCardsUser);  
                unclickOpponentCard();  
                checkSuperpower(indexOfHero);
                if (userId == datas.creator) {
                    socket.emit('cardOnBoard', datas.opponent, indexOfHero);
                }
                else {
                    socket.emit('cardOnBoard', datas.creator, indexOfHero);
                }
            }
        }
        else{
            //alert("Максимальна кількість карт вже задіяна");
            document.getElementsByClassName('message')[0].setAttribute('style', 'display:block');
            setTimeout(Hide, 3000);
        }
    }
    //3!!!ПОСИЛАЄМО НА СЕРВАК ІНФУ ПРО ТЕ, ЩО Я ПОСТАВИВ КАРТУ. ТРЕБА ПОСЛАТЬ ІНДЕКС ГЕРОЯ(0 - Спайдермен, 1- КЕП АМерика і т.д) --> indexOfHero
}



function checkSuperpowerOpponent(index){
    switch(index){
        case 0:
            addNewOpponentCardModified();
            setTimeout( ()=>{
                addNewOpponentCardModified();
            }, 1500);
            break;
        case 1:
            for(let i = 1; i < counterOnBoardCardsOpponent; i++){
                let elem = document.getElementById('cardOpponentOnBoard' + i);
                elem.children[3].children[1].children[0].innerHTML = Number(elem.children[3].children[1].children[0].innerHTML) + 1;
                addAnimation5(elem, 1);
                setTimeout(()=>{
                        removeAnimation5(elem, 1);
                },1000)
            }
            break;
        
        case 2:
            for(let i = 1; i < counterOnBoardCardsUser + 1; i++){
                let elem = document.getElementById('card-user-on-board' + i);
                if(elem.children[3].children[0].children[0].innerHTML > 1){
                    elem.children[3].children[0].children[0].innerHTML = Number(elem.children[3].children[0].children[0].innerHTML) - 1;
                }
                addAnimation5(elem, 0);
                setTimeout(()=>{
                    removeAnimation5(elem, 0);
                },1000)
            }
            break;
       
        case 3:
            for(let i = 1; i < counterOnBoardCardsOpponent; i++){
                let elem = document.getElementById('cardOpponentOnBoard' + i);
                elem.children[3].children[0].children[0].innerHTML = Number(elem.children[3].children[0].children[0].innerHTML) + 2;
                addAnimation5(elem, 0);
                setTimeout(()=>{
                    removeAnimation5(elem, 0);
                }, 1000)
            }
            break;

        case 4:
            break;
        
        case 5:
            break;
        case 6:
            document.getElementById('opponent').children[2].children[0].innerHTML = Number(document.getElementById('opponent').children[2].children[0].innerHTML) + 3;
            addAnimation5Main(document.getElementById('opponent'));
            setTimeout(()=>{
                removeAnimation5Main(document.getElementById('opponent'));
            }, 1000);
            break;
        case 7:
            if(Number(document.getElementById('you').children[2].children[0].innerHTML) > 3) {
                document.getElementById('you').children[2].children[0].innerHTML = Number(document.getElementById('you').children[2].children[0].innerHTML) - 3;
            }
            else{
                document.getElementById('you').children[2].children[0].innerHTML = 1;
            }
            addAnimation5Main(document.getElementById('you'));
            setTimeout(()=>{
                removeAnimation5Main(document.getElementById('you'));
            }, 1000);
            break;
         
        case 8:
            break;
       
        case 9:
            if(counterOnBoardCardsOpponent <= 6){
                setTimeout(() => {
                    counterOnBoardCardsOpponent++;
                    let opponentCardsOnBoard = document.querySelector('.cards-opponent-on-board');
                    opponentCardsOnBoard.innerHTML += ` 
                        <div id=${arrHeroes[9].id} >
                            <div class="cards" id='cardOpponentOnBoard${counterOnBoardCardsOpponent}'>
                                <div class="cards__image">
                                    <img src="assets/heroes/10.png" alt="Hero" id="img-${arrHeroes[9].id}">
                                </div>
                                <div class="cards__unit-name">${arrHeroes[9].name}</div>
                                <div class="cards__unit-description">${arrHeroes[9].superpower}</div>
                                <div class="cards__unit-stats clearfix">
                                    <div class="one-third">
                                        <div class="stat">${arrHeroes[9].attack}</div>
                                        <div class="stat-value">Атака</div>
                                    </div>
                                    <div class="one-third">
                                        <div class="stat">${arrHeroes[9].defense}</div>
                                        <div class="stat-value">Захист</div>
                                    </div>
                                    <div class="one-third no-border">
                                        <div class="stat">${arrHeroes[9].price}</div>
                                        <div class="stat-value">Ціна</div>
                                    </div>
                                </div>
                            </div>
                        </div>`;
                    sortCardsOnBoard('cardOpponentOnBoard', counterOnBoardCardsOpponent);
                    let divUserNumber = document.getElementById('cardOpponentOnBoard' + counterOnBoardCardsOpponent);
                    setTimeout(()=>{ addAnimation4(divUserNumber);}, 1);
                    divUserNumber.style.top = '20%';              
                    removeAnimation2Opponent();
                }, 1000);
            }
            break;
        case 10: 
            for(let i = 1; i < counterOnBoardCardsOpponent; i++){
                let elem = document.getElementById('cardOpponentOnBoard' + i);
                elem.children[3].children[1].children[0].innerHTML = Number(elem.children[3].children[1].children[0].innerHTML) + 2;
                addAnimation5(elem, 1);
                setTimeout(()=>{
                    removeAnimation5(elem, 1);
                }, 1000)
            }
            break;
        case 11:
            for(let i = 1; i < counterOnBoardCardsOpponent; i++){
                let elem = document.getElementById('cardOpponentOnBoard' + i);
                elem.children[3].children[0].children[0].innerHTML = Number(elem.children[3].children[0].children[0].innerHTML) + 2;
                addAnimation5(elem, 0);
                setTimeout(()=>{
                    removeAnimation5(elem, 0);
                }, 1000)
            }
            break;
        
        case 12:
            if(counterOnBoardCardsUser >= 1){
                for(let i = 1; i < counterOnBoardCardsUser + 1; i++){
                    let cardUser = document.getElementById('card-user-on-board' + i);
                    addAnimation3All(cardUser);
                    setTimeout(() => {
                        cardUser.outerHTML = '';
                    }, 1500);
                }   
                counterOnBoardCardsUser =  0;
            }
            break;
        
        case 13:
            for(let i = 1; i < counterOnBoardCardsUser + 1; i++){
                let cardUser = document.getElementById('card-user-on-board' + i);
                addAnimation3All(cardUser);
                setTimeout(() => {
                    cardUser.outerHTML = '';
                }, 1500);
            }   
            counterOnBoardCardsUser = 0;
            let last = document.getElementById('cardOpponentOnBoard' + counterOnBoardCardsOpponent);
            for(let i = 1; i < counterOnBoardCardsOpponent; i++){
                let cardOpponent = document.getElementById('cardOpponentOnBoard' + i);
                addAnimation3All(cardOpponent);
                setTimeout(() => {
                    cardOpponent.outerHTML = '';
                }, 1500);
            }   
            counterOnBoardCardsOpponent = 1;
            last.id = 'cardOpponentOnBoard1';
            last.style.left = '25%';
            unclickOnBoardOneCard(counterOnBoardCardsOpponent);
            break;
        case 14:
            break;
        
        case 15:
            break;
        
        case 16:
            for(let i = 1; i < counterOnBoardCardsUser + 1; i++){
                let elem = document.getElementById('card-user-on-board' + i);
                if(elem){
                    elem.children[3].children[1].children[0].innerHTML = 2;
                    addAnimation5(elem, 1);
                    setTimeout(()=>{
                        removeAnimation5(elem, 1);
                    },1000)
                }
            }
            break;
        
        case 17:
            for(let i = 1; i < counterOnBoardCardsUser + 1; i++){
                let elem = document.getElementById('card-user-on-board' + i);
                if(elem){
                    elem.children[3].children[0].children[0].innerHTML = 2;
                    addAnimation5(elem, 0);
                    setTimeout(()=>{
                        removeAnimation5(elem, 0);
                    },1000)
                }
            }
            break;
        
        case 18:
            for(let i = 1; i < counterOnBoardCardsOpponent; i++){
                let elem = document.getElementById('cardOpponentOnBoard' + i);
                if(elem){
                    elem.children[3].children[0].children[0].innerHTML = 3;
                    addAnimation5(elem, 0);
                    setTimeout(()=>{
                        removeAnimation5(elem, 0);
                    },1000)
                }
            }
            break;
        case 19:
            for(let i = 1; i < counterOnBoardCardsOpponent; i++){
                let elem = document.getElementById('cardOpponentOnBoard' + i);
                if(elem){
                    elem.children[3].children[1].children[0].innerHTML = 3;
                    addAnimation5(elem, 1);
                    setTimeout(()=>{
                        removeAnimation5(elem, 1);
                    },1000)
                }
            }
            break;
        
        case 20:
            for(let i = 1; i < counterOnBoardCardsUser + 1; i++){
                let elem = document.getElementById('card-user-on-board' + i);
                if(elem.children[3].children[0].children[0].innerHTML > 2){
                    elem.children[3].children[0].children[0].innerHTML = Number(elem.children[3].children[0].children[0].innerHTML) - 2;
                }
                else{
                    elem.children[3].children[0].children[0].innerHTML = 1;
                }
                addAnimation5(elem, 0);
                setTimeout(()=>{
                    removeAnimation5(elem, 0);
                },1000)
            }
            break;
        default:
            console.log("default: " + index);
            break;
    }
}




function addOpponentCardOnBoard(index){
    //3!!!Отримали інфу з сервака, а саме індекс поставленого героя
    counterOnBoardCardsOpponent++;
    let opponentCardsOnBoard = document.querySelector('.cards-opponent-on-board');
    opponentCardsOnBoard.innerHTML += ` 
        <div id=${arrHeroes[index].id} >
            <div class="cards" id='cardOpponentOnBoard${counterOnBoardCardsOpponent}'>
                <div class="cards__image">
                    <img src="assets/heroes/${index + 1}.png" alt="Hero" id="img-${arrHeroes[index].id}">
                </div>
                <div class="cards__unit-name">${arrHeroes[index].name}</div>
                <div class="cards__unit-description">${arrHeroes[index].superpower}</div>
                <div class="cards__unit-stats clearfix">
                    <div class="one-third">
                        <div class="stat">${arrHeroes[index].attack}</div>
                        <div class="stat-value">Атака</div>
                    </div>
                    <div class="one-third">
                        <div class="stat">${arrHeroes[index].defense}</div>
                        <div class="stat-value">Захист</div>
                    </div>
                    <div class="one-third no-border">
                        <div class="stat">${arrHeroes[index].price}</div>
                        <div class="stat-value">Ціна</div>
                    </div>
                </div>
            </div>
        </div>`;
    sortCardsOnBoard('cardOpponentOnBoard', counterOnBoardCardsOpponent);
    let cardToDelete = document.getElementById('cardOpponent' + counterCardsOpponent);
    if(cardToDelete){
        cardToDelete.outerHTML = '';
    }
    counterCardsOpponent--;
    sortCards('cardOpponentImg', counterCardsOpponent);
    addAnimation2Opponent(counterCardsOpponent);
    checkSuperpowerOpponent(index);
}


socket.on('cardOnBoardState', (index) => {
    //console.log('1qweqw3');
    console.log(index);
    addOpponentCardOnBoard(index);
})

function sortCardsOnBoard(playerId, counter){
    for(let i = 1; i < counter + 1; i++){
        let divUserNumber = document.getElementById(playerId + i);
        divUserNumber.style.left = (17 + i * 8) + '%';
    }
}

function clickOnBoardCard(counter){
    for(let i = 1; i < counter + 1; i++){
        let card = document.getElementById('card-user-on-board' + i);
        if(card !== null && card !==undefined){
            card.onclick = () =>{fightOpponent(i);}
        }
    }
}


function unclickOnBoardCard(counter){//ПОКИ НІДЕ НЕ ЗАЮЗАННО
    for(let i = 0; i < counter + 1; i++){
        let card = document.getElementById('card-user-on-board' + i);
        if(card !== null && card !==undefined){
            card.onclick = () =>{}
        }
    }
}

function clickOnBoardCardModified(counter){
    for(let i = 1; i < counter + 1; i++){
        let card = document.getElementById('card-user-on-board' + i);
        if(card !== null && card !==undefined){
            if(card.onclick == '() =>{unclickOpponentCard()}'){
                card.onclick == '() =>{unclickOpponentCard()}';
            }
            else{
                card.onclick = () =>{fightOpponent(i);}
            }
        }
    }
}

function unclickOnBoardOneCard(index){
    let card = document.getElementById('card-user-on-board' + index);
    if(card !== null){
        card.onclick = () =>{unclickOpponentCard()};
    }
}

function clickOnBoardOneCard(index){
    let card = document.getElementById('card-user-on-board' + index);
    if(card !== null){
        card.onclick = () =>{fightOpponent(index);};

    }
}

function fightOpponent(indexOfCard){
    let isYourCourse = document.getElementById('red-button');
    if(isYourCourse.innerHTML != 'Хід суперника'){
        if(counterOfClicks == true && previousIndexOfCard == indexOfCard) {
            previousIndexOfCard = indexOfCard;
            unclickOpponentCard();
        }
        else{
            let card = document.getElementById('card-user-on-board' + indexOfCard);
            if(previousIndexOfCard != -1){
                removeBorderAll();
                removeBorderOpponent();
            }
            previousIndexOfCard = indexOfCard;
            clickOnOpponentCard(indexOfCard); 
            counterOfClicks = true; 
        }
    }
}

function hitOpponent(indexOfCard, indexOfGoalCard = -1){
    let cardUser = document.getElementById('card-user-on-board' + indexOfCard); 
    if(indexOfGoalCard != -1){
        addAnimationFightCard(indexOfCard, indexOfGoalCard);
        setTimeout( () => {
            let cardOpponent = document.getElementById('cardOpponentOnBoard' + indexOfGoalCard);
            let difHPUser =  cardUser.children[3].children[1].children[0].innerHTML - cardOpponent.children[3].children[0].children[0].innerHTML;
            let difHPOpponent = cardOpponent.children[3].children[1].children[0].innerHTML - cardUser.children[3].children[0].children[0].innerHTML;
            let currentCard;
            if(difHPUser <= 0){
                difHPUser = 0;
                removeAnimationFight(indexOfCard);
                addAnimation3(cardUser);
                setTimeout(() => {
                    cardUser.outerHTML = '';
                    for( let n = indexOfCard + 1; n <= counterOnBoardCardsUser; n++){
                        currentCard = document.getElementById('card-user-on-board' + n);
                        let cur = n - 1;
                        currentCard.id = 'card-user-on-board' + cur;
                    }
                    counterOnBoardCardsUser--;
                    sortCardsOnBoard('card-user-on-board', counterOnBoardCardsUser);
                    clickOnBoardCardModified(counterOnBoardCardsUser);
                }, 500);
            }
            if(difHPOpponent <= 0){
                difHPOpponent = 0;
                removeAnimationFight(indexOfCard);
                addAnimation3(cardOpponent);
                setTimeout(() => {
                    cardOpponent.outerHTML = '';
                    for( let n = indexOfGoalCard + 1; n <= counterOnBoardCardsOpponent; n++){
                        currentCard = document.getElementById('cardOpponentOnBoard' + n);
                        let cur = n - 1;
                        currentCard.id = 'cardOpponentOnBoard' + cur;
                    }
                    counterOnBoardCardsOpponent--;
                    sortCardsOnBoard('cardOpponentOnBoard', counterOnBoardCardsOpponent);
                }, 500);
            }
            if(difHPUser > 0){
                unclickOnBoardOneCard(indexOfCard);
                addOpacity(indexOfCard);
                addAnimation5(cardUser, 1);
                setTimeout(()=>{
                    removeAnimation5(cardUser, 1);
                }, 1000)
            }
            if(difHPOpponent > 0){
                addAnimation5(cardOpponent, 1);
                setTimeout(()=>{
                    removeAnimation5(cardOpponent, 1);
                }, 1000)
            }
            cardUser.children[3].children[1].children[0].innerHTML = difHPUser;
            cardOpponent.children[3].children[1].children[0].innerHTML = difHPOpponent;
        }, 550);     
    }
    else{
        addAnimationFightMainCard(indexOfCard);
        setTimeout( () => {
            let cardOpponent = document.getElementById('opponent');
            let difHP = cardOpponent.children[2].children[0].innerHTML - cardUser.children[3].children[0].children[0].innerHTML;
            cardOpponent.children[2].children[0].innerHTML = difHP;
            unclickOnBoardOneCard(indexOfCard);
            addOpacity(indexOfCard);
            if(difHP <= 0){
                if (userId == datas.creator) {
                    socket.emit('setHit', datas.opponent, indexOfCard, indexOfGoalCard);
                }
                else {
                    socket.emit('setHit', datas.creator, indexOfCard, indexOfGoalCard);
                }
                //alert("GAME OVER You win");//ЗАПУСТИТЬ ПЕРЕАДРЕСАЦІЮ НА СТАРТОВУ СТОРІНКУ
                //setTimeout(document.body.innerHTML ='', 10000);
                //document.body.innerHTML ='';
                //setTimeout(location.href=location.href, 5000);
                window.location.href = '/you_win';
            }
            addAnimation5Main(cardOpponent);
            setTimeout(()=>{
                removeAnimation5Main(cardOpponent);
            }, 1000)
        }, 550);
    }
      
    unclickOpponentCard();
    if (userId == datas.creator) {
        socket.emit('setHit', datas.opponent, indexOfCard, indexOfGoalCard);
    }
    else {
        socket.emit('setHit', datas.creator, indexOfCard, indexOfGoalCard);
    }
    //4!!!ПОСИЛАЄМО НА СЕРВАК ІНФУ ПРО ТЕ, ЩО БУВ НАНЕСЕНИЙ УДАР. КРІМ ТОГО ТРЕБА ПОСЛАТИ АБО ВИКЛИКАНІ В ФУНКЦІЇ ІНДЕКСИ -->IndexOfCard, IndexOfGoalCard
}



function hitByOpponent(indexOfCard, indexOfCardOpponent){
    //4!!!ОТРИМУЄМО З СЕРВАКА ІНФУ ПРО НАНЕСЕНИЙ УДАР. ТРЕБА ЗНАТЬ З ЯКОЮ ПОЗИЦІЇ ВДАРИЛИ. ДЛЯ ЦЬОГО ТРЕБА ДАНІ 2 ПАРАМЕТИ
    let cardOpponent = document.getElementById('cardOpponentOnBoard' + indexOfCardOpponent);
    if(indexOfCard != -1){
        addAnimationFightCardOpponent(indexOfCard, indexOfCardOpponent);
        setTimeout( () => {
            let cardUser = document.getElementById('card-user-on-board' + indexOfCard);
            let difHPUser =  cardUser.children[3].children[1].children[0].innerHTML - cardOpponent.children[3].children[0].children[0].innerHTML;
            let difHPOpponent = cardOpponent.children[3].children[1].children[0].innerHTML - cardUser.children[3].children[0].children[0].innerHTML;
            let currentCard;
            if(difHPUser <= 0){
                difHPUser = 0;
                removeAnimationFightOpponent(indexOfCardOpponent);
                addAnimation3(cardUser);
                setTimeout(() => {
                    cardUser.outerHTML = '';
                    for( let n = indexOfCard + 1; n <= counterOnBoardCardsUser; n++){
                        currentCard = document.getElementById('card-user-on-board' + n);
                        let cur = n - 1;
                        currentCard.id = 'card-user-on-board' + cur;
                    }
                    counterOnBoardCardsUser--;
                    sortCardsOnBoard('card-user-on-board', counterOnBoardCardsUser);
                    clickOnBoardCardModified(counterOnBoardCardsUser);//перезаписуємо через видалення елемента
                }, 500);
            }
            if(difHPOpponent <= 0){
                difHPOpponent = 0;
                removeAnimationFightOpponent(indexOfCardOpponent);
                addAnimation3(cardOpponent);
                setTimeout(() => {
                    cardOpponent.outerHTML = '';
                    for( let n = indexOfCardOpponent + 1; n <= counterOnBoardCardsOpponent; n++){
                        currentCard = document.getElementById('cardOpponentOnBoard' + n);
                        let cur = n - 1;
                        currentCard.id = 'cardOpponentOnBoard' + cur;
                    }
                    counterOnBoardCardsOpponent--;
                    sortCardsOnBoard('cardOpponentOnBoard', counterOnBoardCardsOpponent);
                }, 500);
            }
            if(difHPUser > 0){
                addAnimation5(cardUser, 1);
                setTimeout(()=>{
                    removeAnimation5(cardUser, 1);
                }, 1000)
            }
            if(difHPOpponent > 0){
                addAnimation5(cardOpponent, 1);
                setTimeout(()=>{
                    removeAnimation5(cardOpponent, 1);
                }, 1000)
            }
            cardUser.children[3].children[1].children[0].innerHTML = difHPUser;
            cardOpponent.children[3].children[1].children[0].innerHTML = difHPOpponent;  
            //console.log(cardUser.outerHTML);
            //console.log(cardOpponent.outerHTML);
        }, 550);
    }
    else{
        addAnimationFightMainCardOpponent(indexOfCardOpponent);
        setTimeout( () => {
            let cardUser = document.getElementById('you');
            let difHP = cardUser.children[2].children[0].innerHTML - cardOpponent.children[3].children[0].children[0].innerHTML;
            cardUser.children[2].children[0].innerHTML = difHP;
            if(difHP <= 0){
                //alert("GAME OVER You lose");//ЗАПУСТИТЬ ПЕРЕАДРЕСАЦІЮ НА СТАРТОВУ СТОРІНКУ
                //setTimeout(document.body.innerHTML ='', 10000);
                //document.body.innerHTML ='';
                //setTimeout(location.href=location.href, 5000);
                window.location.href = '/you_lose';
            }
            addAnimation5Main(cardUser);
            setTimeout(()=>{
                removeAnimation5Main(cardUser);
            }, 1000)
            console.log(cardUser.outerHTML);
        }, 550);
    }
}

socket.on('getHit', (indexOfCard, indexOfGoalCard) => {
    //console.log('1qweqw3');
    //console.log('rrrrr');
    //console.log(indexOfCard)
    //console.log(indexOfGoalCard)
    hitByOpponent(indexOfGoalCard, indexOfCard);
});

function clickOnOpponentCard(indexOfCard){
    addBorder1(indexOfCard);
    addBorderOpponent();
    let mainCard = document.querySelector('.cards-opponent-clickable').children[0];
    mainCard.onclick = () =>{hitOpponent(indexOfCard);}
    for(let i = 0; i < counterOnBoardCardsOpponent + 1; i++){
        let card = document.getElementById('cardOpponentOnBoard' + i);
        if(card !== null && card !==undefined){
            card.onclick = () =>{hitOpponent(indexOfCard, i);}
        }
    }
}

function unclickOpponentCard(){
    removeBorderAll();
    removeBorderOpponent();
    let mainCard = document.querySelector('.cards-opponent-clickable').children[0];
    mainCard.onclick = () =>{};
    for(let i = 0; i < counterOnBoardCardsOpponent + 1; i++){
        let card = document.getElementById('cardOpponentOnBoard' + i);
        if(card !== null && card !==undefined){
            card.onclick = () =>{};
        }
    }
    counterOfClicks = false; 
}


function addAnimation1(){
    document.getElementById('cardUser' + counterCardsUser).style.animation = '2s show ease';
    if(counterCardsUser >= 2){
        for(let i = 1; i < counterCardsUser; i++){
            document.getElementById('cardUser' + i).style.animation = 'null';
        }
    }
}

function removeAnimation1(){
    for(let i = 1; i < counterCardsUser + 1; i++){
        if( document.getElementById('cardUser' + i) != null && document.getElementById('cardUser' + i) != undefined)
            document.getElementById('cardUser' + i).style.animation = 'null';
    }
}


function addAnimation2(index){
    let currentCard = document.getElementById('card-user-on-board' + counterOnBoardCardsUser);
    let current;
    if(index == counterCardsUser + 1){
        current = document.getElementById('cardUser' + counterCardsUser);
    }else{
        current = document.getElementById('cardUser' + index);
    }
        currentCard.style.animation = '1s show2 ease';
        let left;
        if(current){
            left = current.style.left;
        }
        else{
            left = '50.5%';
        }
        currentCard.innerHTML += `<style>
        @keyframes show2 {
            from {top: 75.4%; left: ${left};}
        }
        </style>`;
}

function removeAnimation2(){
    for(let i = 1; i < counterOnBoardCardsUser + 1; i++){
        if( document.getElementById('card-user-on-board' + i) != null && document.getElementById('card-user-on-board' + i) != undefined)
            document.getElementById('card-user-on-board' + i).style.animation = 'null';
    }
}


function addAnimationOpponent1(){
    document.getElementById('cardOpponentImg' + counterCardsOpponent).style.animation = '2s showOpponent ease';
    if(counterCardsOpponent >= 2){
        for(let i = 1; i < counterCardsOpponent; i++){
            document.getElementById('cardOpponentImg' + i).style.animation = 'null';
        }
    }
}


function addAnimation2Opponent(index){
    let currentCard = document.getElementById('cardOpponentOnBoard' + counterOnBoardCardsOpponent);
    let current;

    if(index == counterCardsOpponent + 1){
        current = document.getElementById('cardOpponentImg' + counterCardsOpponent);
    } else{
        current = document.getElementById('cardOpponentImg' + index);
    }
    currentCard.style.animation = '1s show2Opponent ease';
    let left = 0;
    if(current){
        left = current.style.left;
    }
    else{
        left = '50.5%';
    }
    currentCard.innerHTML += `<style>
        @keyframes show2Opponent {
            from {top: 0%; left: ${left};}
        }
        </style>`;
    if(counterOnBoardCardsOpponent >= 1){
        for(let i = 1; i < counterOnBoardCardsOpponent; i++){
            document.getElementById('cardOpponentOnBoard' + i).style.animation = 'null';
        }
    }
}

function  removeAnimation2Opponent(){
    for(let i = 1; i < counterOnBoardCardsOpponent + 1; i++){
        if( document.getElementById('cardOpponentOnBoard' + i) != null && document.getElementById('cardOpponentOnBoard' + i) != undefined){
            if( document.getElementById('cardOpponentOnBoard' + i) != null && document.getElementById('cardOpponentOnBoard' + i) != undefined){
                document.getElementById('cardOpponentOnBoard' + i).style.animation = 'null';
            }
        }
    }
}

function addHover1(index) {
    let current = document.getElementById('cardUser' + index);
    current.innerHTML += `<style>
    #cardUser${index}:hover {
        top: 72%;  
    }</style>`; 
}

function removeHover1(index) {
    let current = document.getElementById('cardUser' + index);
    current.innerHTML += `<style>
    #cardUser${index}:hover {
        top: 75.3%;              
    }</style>`; 
}   

function reviewHover1() {
    
    for(let i = 1; i < counterCardsUser + 1; i++){
        let current = document.getElementById('cardUser' + i);
        if(document.getElementById('money-user-value1').innerHTML >=  current.children[3].children[2].children[0].innerHTML){
            //addHover1(i);
            current.innerHTML += `<style>
            #cardUser${i}:hover {
                top: 72%;  
            }</style>`; 
        } 
        else{
            current.innerHTML += `<style>
            #cardUser${i}:hover {
                top: 75.3%;              
            }</style>`; 
        }
    }
}  


function addOpacity(index) {
    let current = document.getElementById('card-user-on-board' + index);
    console.log(index);
    current.style.opacity = '0.6';
    /*current.innerHTML += `<style>
    #card-user-on-board${index} { 
        top: 2%;
    }</style>`; */
}

function removeOpacity(index) {
    let current = document.getElementById('card-user-on-board' + index);
    console.log(index);
    current.style.opacity = '1';
}


function addBorder1(index) {
    let current = document.getElementById('card-user-on-board' + index);
    current.style.border = '3px solid green';
}

function removeBorderAll() {
    for(let i = 1; i < counterOnBoardCardsUser + 1; i++){
        let current = document.getElementById('card-user-on-board' + i);
        current.style.border = '0px';
    }
    
}

function addBorderOpponent() {
    let current = document.getElementById('opponent');
    current.style.border = '0.4vh solid red';
    for(let i = 1; i < counterOnBoardCardsOpponent + 1; i++){
        let card = document.getElementById('cardOpponentOnBoard' + i);
        card.style.border = '0.3vh solid red';
    }
}

function removeBorderOpponent() {
    let current = document.getElementById('opponent');
    current.style.border = '0px';
    for(let i = 1; i < counterOnBoardCardsOpponent + 1; i++){
        let card = document.getElementById('cardOpponentOnBoard' + i);
        card.style.border = '0px';
    }   
}


function addAnimation3(current){
    current.style.animation = '0.5s fade ease';
}

function addAnimation3All(current){
    current.style.animation = '1.5s fade ease';
}

function addAnimation4(current){
    if(current === document.getElementById('card-user-on-board' + counterOnBoardCardsUser)){
        current.style.animation = '1s fadeAway ease';
    }
    else{
        current.style.animation = '1s fadeAwayOpponent ease';
        console.log('Opponent');
    }
}


function addAnimation5(card, characteristic) {
    card.children[3].children[characteristic].children[0].style.animation = '1s changeColor ease';
    
}

function removeAnimation5(card, characteristic) {
    card.children[3].children[characteristic].children[0].style.animation = 'null';
}

function addAnimation5Main(card) {
    card.children[2].children[0].style.animation = '1s changeColor ease';
    
}

function removeAnimation5Main(card) {
    card.children[2].children[0].style.animation = 'null';
}

function addAnimationFightCard(indexOfCard, indexOfCardOpponent){
    let cardUser = document.getElementById('card-user-on-board' + indexOfCard);
    let cardOpponent = document.getElementById('cardOpponentOnBoard' + indexOfCardOpponent);
        cardUser.animate([
            {
                left: cardUser.style.left,
                top: '50%'
            },
            {
                left: cardOpponent.style.left,
                top: '20%'
            }
        ], 300);
        setTimeout(() =>{
            cardUser.animate([
                {
                    left: cardOpponent.style.left,
                    top: '20%'
                },
                {
                    left: cardUser.style.left,
                    top: '50%'

                }
            ], 250);
        }, 250)
}


function removeAnimationFight(indexOfCard){
        let cardUser = document.getElementById('card-user-on-board' + indexOfCard);
        cardUser.animate([]);
}   

function addAnimationFightMainCard(indexOfCard){
    let cardUser = document.getElementById('card-user-on-board' + indexOfCard);
        cardUser.animate([
            {
                left: cardUser.style.left,
                top: '50%'
            },
            {
                left: '10%',
                top: '20%'
            }
        ], 300);
        setTimeout(() =>{
            cardUser.animate([
                {
                    left: '10%',
                    top: '20%'
                },
                {
                    left: cardUser.style.left,
                    top: '50%'

                }
            ], 250);
        }, 250)
}



function addAnimationFightCardOpponent(indexOfCard, indexOfCardOpponent){
    let cardUser = document.getElementById('card-user-on-board' + indexOfCard);
    let cardOpponent = document.getElementById('cardOpponentOnBoard' + indexOfCardOpponent);
    cardOpponent.animate([     
        {
            left: cardOpponent.style.left,
            top: '20%'
        },
        {
            left: cardUser.style.left,
            top: '50%'

        }
    ], 300);
    setTimeout(() =>{
        cardOpponent.animate([
            {
                left: cardUser.style.left,
                top: '50%'
            },
            {
                left: cardOpponent.style.left,
                top: '20%'
            }
        ], 250);
    }, 220)
}

function addAnimationFightMainCardOpponent(indexOfCard){
    let cardUser = document.getElementById('cardOpponentOnBoard' + indexOfCard);
        cardUser.animate([
            {
                left: cardUser.style.left,
                top: '20%'
            },
            {
                left: '10%',
                top: '50%'
            }
        ], 300);
        setTimeout(() =>{
            cardUser.animate([
                {
                    left: '10%',
                    top: '50%'
                },
                {
                    left: cardUser.style.left,
                    top: '20%'

                }
            ], 250);
        }, 250)
}

function removeAnimationFightOpponent(indexOfCard){
        let cardUser = document.getElementById('cardOpponentOnBoard' + indexOfCard);
        cardUser.animate([]);    
}   


socket.on('leave', () => {
    //alert('Your opponent leave');
    window.location.href = '/leave';
    console.log('1111111111');
    //document.getElementById('container2').setAttribute('style', 'display:none');
    //document.getElementById('container1').setAttribute('style', 'display:block');
    
    //document.body.style.backgroundImage = "url('assets/1.jpg')";
});


addNewOpponentCard();
addNewOpponentCard();
addNewOpponentCard();

addNewUserCard();
addNewUserCard();
addNewUserCard();

