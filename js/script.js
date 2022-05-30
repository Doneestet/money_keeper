'use strict'

let startBtn = document.getElementById('start'),
    restartBtn = document.getElementById('restart'),
    budgetValue = document.getElementsByClassName('budget-value')[0],
    dayBudgetValue = document.getElementsByClassName('daybudget-value')[0],
    levelValue = document.getElementsByClassName('level-value')[0],
    expensesValue = document.getElementsByClassName('expenses-value')[0],
    optionalexpensesValue = document.getElementsByClassName('optionalexpenses-value')[0],
    incomeValue = document.getElementsByClassName('income-value')[0],
    monthSavingsValue = document.getElementsByClassName('monthsavings-value')[0],
    yearSavingsValue = document.getElementsByClassName('yearsavings-value')[0],

    expensesItem = document.getElementsByClassName('expenses-item'),
    expensesBtn = document.getElementsByTagName('button')[0],
    optionalExpensesBtn = document.getElementsByTagName('button')[1],
    countBtn = document.getElementsByTagName('button')[2],
    optionalExpensesItem = document.querySelectorAll('.optionalexpenses-item'),
    incomeItem = document.querySelector('.choose-income'),
	checkSavings = document.querySelector('#savings'),
	sumValue = document.querySelector('.choose-sum'),
    percentValue = document.querySelector('.choose-percent'),
    yearValue = document.querySelector('.year-value'),
    monthValue = document.querySelector('.month-value'),
    dayValue = document.querySelector('.day-value');

    let money, time;

    // задаем изначальное состоянние "кнопки неактивны"
    expensesBtn.disabled = true;
    optionalExpensesBtn.disabled = true;
    countBtn.disabled = true;
    countBtn.style.display = 'none';
    

  // 1 скрывает starbtn после клика
    function hideStartBtn (){
        startBtn.style.display ="none";
        
    }
   
    function hideRestartBtn (){
        restartBtn.style.display ="none";
        
    }
    hideRestartBtn ();

    function showRestartBtn () {
        restartBtn.style.display = 'block';

    }

    function showStartBtn () {
        startBtn.style.display = 'block';
    }

    restartBtn.addEventListener('click', () =>{
        hideRestartBtn ();
        showStartBtn();
        budgetValue.textContent = '';
        dayBudgetValue.textContent = '';
        levelValue.textContent = '';
    });

    startBtn.addEventListener('click', function () {
         
        time = prompt ("Введите дату в формате YYYY-MM-DD", "");
        money = +prompt ("Ваш бюджет на месяц?", "");

        while (isNaN(money) || money == "" || money == null) {
            money = +prompt ("Ваш бюджет на месяц?", ""); 
        }
            appData.budget = money;
            appData.timeData = time;
            budgetValue.textContent = money.toFixed(); // toFixed округляет число
            yearValue.value = new Date(Date.parse(time)).getFullYear();  // если у нас input, то правильнее работать с value а не textContent
            monthValue.value = new Date(Date.parse(time)).getMonth() + 1;  // +1 поскольку месяца считываются с 0
            dayValue.value = new Date(Date.parse(time)).getDate();

            expensesBtn.disabled = false;
            optionalExpensesBtn.disabled = false;
            countBtn.disabled = false;

            hideStartBtn();
            showRestartBtn ();
            useCountBtn();
        });

    expensesBtn.addEventListener('click', function() {
        let sum = 0;

        for (let i = 0; i < expensesItem.length; i++) {
            let a = expensesItem[i].value,          // получаем 0 элем., value потому что input
                b = expensesItem[++i].value;        // ++i - получаем следующий элемент списка
        
            if ( typeof(a)==='string' && typeof(a) != null && typeof(b) != null && a != "" && b != "" && a.length < 50) {
        
                console.log ("done");
        
                appData.expenses[a] = b;        // [a] ключ - b значение
                sum += +b;                      // +b чтобы приходили чиловые значения
            } else {
                i = i - 1;
            }
        
        }
        expensesValue.textContent = sum;
    });

    optionalExpensesBtn.addEventListener('click', function() {
        for (let i = 0; i < optionalExpensesItem.length; i++) {
                let opt = optionalExpensesItem[i].value;
                appData.optionalExpenses[i] = opt;
                optionalexpensesValue.textContent += appData.optionalExpenses[i] + ' ';
        }
    });

    function useCountBtn () {
        if (appData.budget != undefined) {

            appData.moneyPerDay = (appData.budget / 30).toFixed();
            dayBudgetValue.textContent = appData.moneyPerDay;

            if (appData.moneyPerDay < 100) {
                levelValue.textContent = "Это минимальный уровень достатка!";
            } else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
                levelValue.textContent = "Это средний уровень достатка!";
            } else if (appData.moneyPerDay > 2000) {
                levelValue.textContent = "Это высокий уровень достатка!";
            } else {
                levelValue.textContent = "Ошибочка...!";
            }
        } else {
            dayBudgetValue.textContent = "Произошла ошибка";
        }
        
        
    };
        
    incomeItem.addEventListener('input', function(){  // при вводе данных сразу отображает их в поле
        let items = incomeItem.value;
        appData.income = items.split(", ");
        incomeValue.textContent = appData.income;

    });

    checkSavings.addEventListener('click', function(){
        if(appData.savings == true) {
            appData.savings = false;
        }else {
            appData.savings = true;
        }
    });

    sumValue.addEventListener('input', function(){
        if (appData.savings == true) {
            let sum = +sumValue.value,
                percent = +percentValue.value;

            appData.monthIncome = sum/100/12*percent;
            appData.yearIncome = sum/100*percent;

            monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
            yearSavingsValue.textContent = appData.yearIncome.toFixed(1);
        }
    });

    percentValue.addEventListener('input', function(){
        if (appData.savings == true) {
            let sum = +sumValue.value,
                percent = +percentValue.value;

            appData.monthIncome = sum/100/12*percent;
            appData.yearIncome = sum/100*percent;

            monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
            yearSavingsValue.textContent = appData.yearIncome.toFixed(1);
        }
    });

    let appData = {
        budget: money,
        timeData: time,
        expenses: {},
        optionalExpenses: {},
        income: [],
        savings: false
       
    };
