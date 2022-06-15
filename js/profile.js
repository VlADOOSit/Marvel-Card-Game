let counter = 1;

let ava = document.getElementById("avatar");

function renderAvatar(counter){
    let ava = document.getElementById("avatar");
    if(counter % 5 == 1){
        ava.outerHTML = `<img src="./assets/avatars/1.jpg" alt="avatar" id="avatar">`;
    }
    if(counter % 5 == 2){
        ava.outerHTML = `<img src="./assets/avatars/2.jpg" alt="avatar" id="avatar">`;
    }
    if(counter % 5 == 3){
        ava.outerHTML = `<img src="./assets/avatars/3.jpeg" alt="avatar" id="avatar">`;
    }
    if(counter % 5 == 4){
        ava.outerHTML = `<img src="./assets/avatars/4.pjg" alt="avatar" id="avatar">`;
    }
    if(counter % 5 == 0){
        ava.outerHTML = `<img src="./assets/avatars/5.jpg" alt="avatar" id="avatar">`;
    }   
}

renderAvatar(counter);



function changeAvatar(){
    counter++;
    renderAvatar(counter);
}
