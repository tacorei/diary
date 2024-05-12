let currentInput = 'x'; // 現在選択されている入力フィールド

function appendNumber(number) {
    const input = document.getElementById(currentInput);
    input.value += number; // 数字を追加
}

function clearInputs() {
    document.getElementById('x').value = '';
    document.getElementById('y').value = '';
    document.getElementById('c').value = '';
    document.getElementById('answer').innerText = '答え: '; // 結果をクリア
}

function calculateQuadratic() {
    const a = parseFloat(document.getElementById('x').value);
    const b = parseFloat(document.getElementById('y').value);
    const c = parseFloat(document.getElementById('c').value);
    const equation = `式: ${a}x² + ${b}x + ${c} = 0`; // 二次方程式の形で式を構築
    const answerElement = document.getElementById('answer');

    const D = b**2 - 4*a*c;
    let result;
    if (D > 0) {
        const x1 = (-b + Math.sqrt(D)) / (2*a);
        const x2 = (-b - Math.sqrt(D)) / (2*a);
        result = `x1 = ${x1.toFixed(2)}, x2 = ${x2.toFixed(2)}`;
    } else if (D === 0) {
        const x = -b / (2*a);
        result = `x = ${x.toFixed(2)}`;
    } else {
        const realPart = (-b / (2*a)).toFixed(2);
        const imaginaryPart = (Math.sqrt(-D) / (2*a)).toFixed(2);
        result = `x1 = ${realPart} + ${imaginaryPart}i, x2 = ${realPart} - ${imaginaryPart}i`;
    }

    answerElement.innerText = `${equation}\n答え: ${result}`; // 式と計算結果を表示
}

// 初期選択フィールドを 'x' に設定
document.getElementById('x').focus();
document.querySelectorAll('.input-field input').forEach(input => {
    input.addEventListener('focus', () => {
        currentInput = input.id; // 現在選択されているinputを更新
    });
});
