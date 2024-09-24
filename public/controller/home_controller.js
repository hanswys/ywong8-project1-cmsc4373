
export function onClickPlayGame(e){
    e.preventDefault();
    // console.log("hi");
const randomNumber = Math.floor(Math.random() * 6) + 1;
console.log(randomNumber);
document.getElementById('number').innerHTML = randomNumber;


}