// js/basenote.js

document.getElementById('submitButton').addEventListener('click', async function(event) {
    event.preventDefault(); // 기본 폼 제출 동작 방지

    // 폼 데이터 수집
    const date = document.getElementById('date').value;
    const bestPlayer = document.getElementById('best-player-text').value;
    const pitcher = document.getElementById('pitcher').value;
    const stadium = document.getElementById('stadium').value;
    const winLose = document.getElementById('win-lose').value;
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;

    // 데이터 전송
    try {
        const response = await fetch('http://localhost:3000/api/diaries', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                date: date,
                bestPlayer: bestPlayer,
                pitcher: pitcher,
                stadium: stadium,
                winLose: winLose,
                title: title,
                content: content
            })
        });

        if (!response.ok) {
            throw new Error('일기 저장 실패');
        }

        const data = await response.json();
        alert('일기가 성공적으로 저장되었습니다.');
    } catch (err) {
        console.error('Error:', err);
        alert('일기 저장 중 오류가 발생했습니다.');
    }
});
