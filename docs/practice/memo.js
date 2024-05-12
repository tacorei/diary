// memo.js

// ページ読み込み時にメモを表示
window.onload = function() {
    loadMemos();
    
    // Enterキーでメモを保存するイベントリスナーを追加
    document.getElementById('memoInput').addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            saveMemo();
        }
    });
};

// メモを保存する関数
function saveMemo() {
    let memo = document.getElementById('memoInput').value;
    // ローカルストレージにメモを保存
    if (memo !== '') {
        let memos = JSON.parse(localStorage.getItem('memos')) || [];
        memos.push(memo);
        localStorage.setItem('memos', JSON.stringify(memos));
        // メモを表示する
        loadMemos();
        // メモ入力欄をクリア
        document.getElementById('memoInput').value = '';
    } else {
        alert('メモを入力してください');
    }
}

// メモを削除する関数
function deleteMemo(index) {
    let memos = JSON.parse(localStorage.getItem('memos')) || [];
    memos.splice(index, 1);
    localStorage.setItem('memos', JSON.stringify(memos));
    // メモを再表示
    loadMemos();
}

// メモを表示する関数
function loadMemos() {
    let memos = JSON.parse(localStorage.getItem('memos')) || [];
    let memoDisplay = document.getElementById('memoDisplay');
    memoDisplay.innerHTML = '';
    if (memos.length > 0) {
        memos.forEach(function(memo, index) {
            let memoDiv = document.createElement('div');
            memoDiv.textContent = `${index + 1}. ${memo}`;
            // メモをマウスオーバーしたら削除ボタンを表示
            memoDiv.addEventListener('mouseover', function() {
                let deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.style.float = 'right';
                deleteButton.style.marginLeft = '5px'; // マージンを追加して削除ボタンの表示領域を広げる
                deleteButton.onclick = function(event) {
                    // イベントの伝搬を停止してメモの削除のみ行う
                    event.stopPropagation();
                    deleteMemo(index);
                };
                memoDiv.appendChild(deleteButton);
            });
            // マウスがメモから離れたら削除ボタンを非表示にする
            memoDiv.addEventListener('mouseout', function() {
                let deleteButton = memoDiv.querySelector('button');
                if (deleteButton) {
                    deleteButton.remove();
                }
            });
            memoDiv.style.cursor = 'pointer'; // カーソルをポインターに設定することで削除ボタンの当たり判定を強化する
            memoDiv.addEventListener('click', function() {
                deleteMemo(index);
            });
            memoDisplay.appendChild(memoDiv);
        });
    } else {
        memoDisplay.textContent = 'メモはありません';
    }
}
