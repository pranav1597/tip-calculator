const bill = document.getElementById('bill-input');
const tipBtns = document.querySelectorAll('[data-percent]');
const custom = document.getElementById('custom');
const people = document.getElementById('people-input');
const tipScreen = document.querySelector('[data-tip-screen]');
const totalScreen = document.querySelector('[data-total-screen]');
const reset = document.getElementById('reset-btn');

bill.addEventListener('input',setBillValue);

tipBtns.forEach(btn =>{
    btn.addEventListener('click', activeClick);
})

custom.addEventListener('input',setCustomValue);

people.addEventListener('input',setPeopleValue);

reset.addEventListener('click', resetClick);

// default values
let billValue = 0.0; //default value is 0.0
let tipValue = 0.15; //default value is 0.15 for 15%
let peopleValue = 1; //default value is 1

// accept only numbers for the bill input
function validateFloat(s){
    let regex = /^[0-9]*\.?[0-9]*$/;
    return s.match(regex);
}

// accept only numbers for custom input

function validateInt(s){
    let regex = /^[0-9]*/;
    return s.match(regex);
}

// function for setting the bill value

function setBillValue(){
    if(bill.value.includes(',')){
        bill.value = bill.value.replace(',','.');
    }

    if(!validateFloat(bill.value)){
        bill.value = bill.value.substring(0, bill.value.length-1); 
    }
    
    billValue = parseFloat(bill.value);
   
    calculateTip();
    // console.log(billValue);
}

// function when clicked on btns

function activeClick(event){
    tipBtns.forEach(btn =>{
        // remove active state
        btn.classList.remove('btn-active');

        // set active state
        if(event.target.innerHTML === btn.innerHTML){
            btn.classList.add('btn-active');
            tipValue = parseFloat(btn.innerHTML)/100;
        }
    })

    // console.log(tipValue);

    custom.value = '';
    calculateTip();
    
}

// function for setting the custom value

function setCustomValue(){
    if(!validateInt(custom.value)){
        custom.value = custom.value.substring(0, custom.value.length-1);
    }

    tipValue = parseFloat(custom.value/100);

    tipBtns.forEach(btn =>{
        btn.classList.remove('btn-active');  
    })

    if(custom.value){
        calculateTip();
    }
    
}

// function for setting the num of people

function setPeopleValue(){
    if(!validateInt(people.value)){
        people.value = people.value.substring(0, people.value.length-1);
    }

    peopleValue = parseFloat(people.value);

    calculateTip();
}

function calculateTip(){
    if(peopleValue >= 1){
        let tipAmount = billValue * tipValue / peopleValue;
        let total = billValue * (tipValue + 1) / peopleValue;
        tipScreen.innerHTML = '$' + tipAmount.toFixed(2);
        totalScreen.innerHTML = '$' + total.toFixed(2);
        reset.classList.remove('reset-btn-active');
    }
}

function resetClick(){
    
    if(tipScreen.innerHTML || totalScreen.innerHTML){
    tipScreen.innerHTML = '$' + '0.00';
    totalScreen.innerHTML = '$' + '0.00';
    bill.value = 0.0;
    if(people.value){
        people.value = 1;
    }
     reset.classList.add('reset-btn-active');
    }

    
}

// console.log(bill.value);

// console.log(tipBtns[0].innerHTML);
