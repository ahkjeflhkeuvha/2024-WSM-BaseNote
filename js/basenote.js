const userid = localStorage.getItem('id')

async function saveDiary(userId, title, date, bestPlayer, pitcher, location, gameRes, content) {
    try {
        const response = await fetch('http://localhost:3000/diaries/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: userId,
                date: date, // 날짜 형식 확인
                bestPlayer: bestPlayer,
                startingPitcher: pitcher,
                location: location,
                result: gameRes,
                title: title,
                content: content
            })
        });

        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        return { message: error.message || 'Unknown error' };
    }
}


async function submit(event) {
    event.preventDefault();

    const userId = userid;
    const title = document.getElementById('title').value;
    const date = document.getElementById('date').value;
    const bestPlayer = document.getElementById('best-player-text').value;
    const pitcher = document.getElementById('pitcher').value;
    const location = document.getElementById('stadium-select').value;
    const gameRes = document.getElementById('win-lose-select').value;
    const content = document.getElementById('content').value;

    if (!title || !date || !bestPlayer || !pitcher || !location || !gameRes || !content) {
        alert('빈칸이 있는지 확인해 주세요.');
        return;
    }

    const result = await saveDiary(userId, title, date, bestPlayer, pitcher, location, gameRes, content);
    if (result) {
        alert('일기가 성공적으로 저장되었습니다.');
        window.location.href = 'diarylist.html';
    } else {
        alert(result.message || '일기 저장에 실패하였습니다. 다시 시도해 주세요.');
    }
}

document.getElementById('submitButton').addEventListener('click', submit);
