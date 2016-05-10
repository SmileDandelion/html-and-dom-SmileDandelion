window.onload = function () {

    var answer = ['统一建模语言', ['封装性', '多态性', '继承性'], 'A', 'C', 'ABD', 'ABC', 'no', 'yes', '模型是对现实世界的简化和抽象，模型是对所研究的系统、过程、事物或概念的一种表达形式。可以是物理实体；可以是某种图形；或者是一种数学表达式。'];
    var ItemScore = [5, [5, 5, 5], 10, 10, 10, 10, 10, 10, 20];

    function $(id) {

        return document.getElementById(id);
    }

    function addEvent(element, event, fn) {
        if (element.addEventListener) {
            element.addEventListener(event, fn, false);
        }
        else if (element.attachEvent) {
            element.attachEvent('on' + event, fn);
        }
        else {
            element['on' + event] = fn;
        }

    }

    var submit = $('submit');


    addEvent(submit, 'click', function () {

        var inputs = document.getElementsByTagName('input');
        totalScore = 0;
        var amount = 0;

        for (var i = 1; i < 4; i++) {
            if (inputs[i].value == "") {
                var tips = prompt('请输入' + inputs[i].name);
                inputs[i].value = tips;
            }
        }

        for (var n = 4; n < inputs.length;) {

            var inputName = inputs[n].getAttribute('name');
            var inputNameLength = document.getElementsByName(inputName).length;

            if (inputNameLength === 1) {

                oneEndScore(inputs, n, amount, answer, ItemScore);
                amount++;
                n += 1;
            }
            else if (inputNameLength === 2 && inputs[n].type === 'radio') {
                judgeEndScore(inputs, n, amount, answer, ItemScore);
                amount++;
                n += 2;
            }
            else if (inputNameLength === 3) {
                threeEndScore(inputs, n, amount, answer, ItemScore);
                amount++;
                n += 3;
            }
            else if (inputNameLength === 4 && inputs[n].type === 'radio') {
                radioEndScore(inputs, n, amount, answer, ItemScore);
                amount++;
                n += 4;
            }
            else if (inputNameLength === 4 && inputs[n].type === 'checkbox') {
                checkEndScore(inputs, inputName, n, amount, answer, ItemScore);
                amount++;
                n += 4;
            }
            else break;
        }

        $('score').value = totalScore;
        alert('您的成绩是' + totalScore);

    });

    function oneEndScore(inputs, n, amount, answer, ItemScore) {
        if (inputs[n].value === answer[amount]) {
            totalScore += ItemScore[amount];
        }
    }

    function judgeEndScore(inputs, number, amount, answer, ItemScore) {
        for (var i = 0; i < 2; i++) {
            if (inputs[number + i].checked && inputs[number + i].value === answer[amount]) {
                totalScore += ItemScore[amount];
            }
        }
    }

    function threeEndScore(inputs, number, amount, answer, ItemScore) {
        for (var i = 0; i < 3; i++) {
            if (blankAnswerExist(inputs[number + i].value, answer[amount])) {
                totalScore += ItemScore[amount][i];
            }
        }
    }

    function radioEndScore(inputs, number, amount, answer, ItemScore) {
        for (var i = 0; i < 4; i++) {
            if (inputs[number + i].checked && inputs[number + i].value === answer[amount]) {
                totalScore += ItemScore[amount];
            }
        }
    }

    function checkEndScore(inputs, inputName, n, amount, answer, ItemScore) {
        var chooseAnswertext = chooseAnswer(document.getElementsByName(inputName));
        if (chooseAnswertext === answer[amount]) {
            totalScore += ItemScore[amount];
        }
    }

    function blankAnswerExist(testValue, answer) {
        for (var i = 0; i < answer.length; i++) {
            if (testValue === answer[i]) {

                return true;
            }
        }

        return false;
    }

    function chooseAnswer(testInput) {
        var checkAnswer = '';
        for (var i = 0; i < testInput.length; i++) {
            if (testInput[i].checked) {
                checkAnswer += testInput[i].value;
            }
        }
        return checkAnswer;
    }

}
