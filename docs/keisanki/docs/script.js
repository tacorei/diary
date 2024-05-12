let currentOperand = ''; // 現在の数値
let previousOperand = ''; // 前の数値
let operation = null; // 選択された演算子

const display = document.getElementById('display');

// 数値ボタンが押された時の処理
function inputNumber(number) {
    if (currentOperand === '0' && number === '0') return; // 0の後に0を追加しない
    if (currentOperand === '0' && number !== '0') currentOperand = ''; // 最初の0を消去
    if (currentOperand.includes('.') && number === '.') return; // すでに小数点がある場合は追加しない
    currentOperand += number;
    updateDisplay();
}

// 演算子ボタンが押された時の処理
function inputOperator(op) {
    if (currentOperand === '' && previousOperand === '') return; // 現在の数値がない場合は何もしない
    if (currentOperand === '' && previousOperand !== '') {
        operation = op; // 演算子だけを変更
        return;
    }
    if (previousOperand !== '') {
        calculate();
    }
    operation = op;
    previousOperand = currentOperand;
    currentOperand = '';
    updateDisplay();
}

// 結果の計算と表示
function calculate() {
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    let calculation;
    switch (operation) {
        case '+':
            calculation = prev + current;
            break;
        case '-':
            calculation = prev - current;
            break;
        case '×':
            calculation = prev * current;
            break;
        case '÷':
            if (current === 0) {
                alert("0で割ることはできません");
                return;
            }
            calculation = prev / current;
            break;
        default:
            return;
    }
    currentOperand = calculation.toString();
    operation = null;
    previousOperand = '';
    updateDisplay();
}

// 表示を更新する関数
function updateDisplay() {
    display.innerText = currentOperand || '0';
}

// ACボタンが押された時の処理（全クリア）
function clearDisplay() {
    currentOperand = '';
    previousOperand = '';
    operation = null;
    updateDisplay();
}

// +/- ボタンが押された時の処理（符号の切り替え）
function toggleSign() {
    currentOperand = currentOperand.startsWith('-') ? currentOperand.slice(1) : `-${currentOperand}`;
    updateDisplay();
}

// % ボタンが押された時の処理（パーセント計算）
function percentage() {
    if (currentOperand !== '') {
        currentOperand = `${parseFloat(currentOperand) / 100}`;
        updateDisplay();
    }
}

// 小数点ボタンが押された時の処理
function inputDecimal() {
    if (!currentOperand.includes('.')) {
        currentOperand += '.';
        updateDisplay();
    }
}
// 平方根を計算する関数
function calculateSquareRoot() {
    if (currentOperand === '') return;
    const number = parseFloat(currentOperand);
    if (number < 0) {
        alert("負の数の平方根は計算できません");
        return;
    }
    currentOperand = Math.sqrt(number).toString();
    operation = null;
    previousOperand = '';
    updateDisplay();
}

// 円周率πを入力する関数
function inputPi() {
    currentOperand = Math.PI.toString();
    updateDisplay();
}

// 既存のcalculate関数に、新しい機能を統合する場合（例: 一次方程式の計算）は、
// 計算のロジックをswitch文に追加する形で実装します。今回の例では省略しますが、
// 特定の演算子や条件に応じて、さらに複雑な計算を行うコードを追加することが可能です。

