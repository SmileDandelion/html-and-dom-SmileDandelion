window.onload = function () {

    var blankAnswer = ['统一建模语言', '封装性', '多态性', '继承性'];
    var radioAnswer = ['A', 'C'];
    var checkAnswer = ['ABD', 'ABC'];
    var judgeAnswer = ['no', 'yes'];
    var shortAnswer = ['模型是对现实世界的简化和抽象，模型是对所研究的系统、过程、事物或概念的一种表达形式。可以是物理实体；可以是某种图形；或者是一种数学表达式。'];

    var ItemScore = [5, 5, 5, 5, 10, 10, 10, 10, 10, 10, 20];

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
        var forms = document.getElementsByTagName('form');
        var totalScore = 0;

        for (var i = 1; i < 4; i++) {
            if (inputs[i].value == "") {
                var tips = prompt("请输入" + inputs[i].name);
                inputs[i].value  = tips;
            }
        }

        if (forms[0].getElementsByTagName('input')[0].value == blankAnswer[0]) {
            totalScore += ItemScore[0];
        }

        for (var a = 0; a < forms[1].getElementsByTagName('input').length; a++) {

            if (blankAnswerExist(forms[1].getElementsByTagName('input')[a].value, blankAnswer)) {
                totalScore += ItemScore[1 + a];
            }
        }

        for (var b = 2; b < 4; b++) {

            var radioChoose = forms[b].getElementsByTagName('input');

            for (var k = 0; k < 4; k++) {

                if (radioChoose[k].checked && radioChoose[k].value == radioAnswer[b - 2]) {
                    totalScore += 10;
                }
            }
        }

        for (var c = 4; c < 6; c++) {

            var checkChoose = forms[c].getElementsByTagName('input');
            var chooseAnswertext = chooseAnswer(checkChoose);
            if (chooseAnswertext == checkAnswer[c - 4]) {
                totalScore += 10;
            }
        }

        for (var d = 6; d < 8; d++) {

            var judgeChoose = forms[d].getElementsByTagName('input');

            for (var e = 0; e < 2; e++) {

                if (judgeChoose[e].checked && judgeChoose[e].value == judgeAnswer[d - 6]) {
                    totalScore += 10;
                }
            }
        }
        $('score').value = totalScore;
        alert('您的成绩是' + totalScore);

    });

    function blankAnswerExist(testValue, answer) {
        for (var i = 1; i < 4; i++) {
            if (testValue == answer[i]) {

                return true;
            }
        }

        return false;
    }

    function chooseAnswer(testInput) {
        var checkAnswer = '';
        for (var k = 0; k < 4; k++) {
            if (testInput[k].checked) {
                checkAnswer += testInput[k].value;
            }
        }
        return checkAnswer;
    }

}
