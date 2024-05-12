function solveEquation(operation) {
    const a = parseFloat(document.getElementById('aValue').value);
    const b = parseFloat(document.getElementById('bValue').value);
    const c = parseFloat(document.getElementById('cValue').value);
    let solution;

    if (isNaN(a) || isNaN(b) || isNaN(c)) {
        alert("すべての値を入力してください。");
        return;
    }

    switch(operation) {
        case '+':
            // ax + b = c の形の方程式の場合、x = (c - b) / a
            solution = (c - b) / a;
            break;
        case '-':
            // ax - b = c の形の方程式の場合、x = (c + b) / a
            solution = (c + b) / a;
            break;
        case '*':
            // ax * b = c の形の方程式の場合、x = c / (a * b)
            if(b === 0) {
                alert("0で乗算することはできません。");
                return;
            }
            solution = c / (a * b);
            break;
        case '/':
            // ax / b = c の形の方程式の場合、x = c * b / a
            if(a === 0) {
                alert("0で割ることはできません。");
                return;
            }
            solution = (c * b) / a;
            break;
        default:
            solution = '未知の演算';
    }

    document.getElementById('result').innerText = `解: x = ${solution}`;
    updateEquationDisplay(operation, a, b, c); // 式の表示を更新する関数も必要に応じて修正
}

