async function saveDiary(userId, title, date, bestPlayer, pitcher, location, gameRes, content) {
    try {
        const response = await fetch('http://localhost:3000/diaries/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: userId,
                date: date,
                bestPlayer: bestPlayer,
                startingPitcher: pitcher, // 변수명 확인
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
        console.log('Diary saved successfully:', data);
        return data; // 함수가 성공적으로 실행된 경우 반환 값 추가
    } catch (error) {
        console.error('Failed to save diary:', error.message || error);
        // 에러 객체를 반환하여 상위 함수에서 처리할 수 있게 함
        return { message: error.message || 'Unknown error' };
    }
}

async function submit(event) {
    event.preventDefault();

    const userId = 'jieun0996';
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
    if (result && result.message === '일기 저장 성공') {
        alert('일기가 성공적으로 저장되었습니다.');
    } else {
        alert(result.message || '일기 저장에 실패하였습니다. 다시 시도해 주세요.');
    }
}

async function fetchDiaries(id) {
    try {
        const response = await fetch(`http://localhost:3000/basenote/${id}`, {
            method: 'GET'
        });

        if (!response.ok) {
            throw new Error(`Fetch failed: ${response.status}`);
        }

        const data = await response.json();

        if (data.success) {
            // diaries 데이터를 처리하는 코드
            console.log(data.diaries);
            displayDiaries(data.diaries);
        } else {
            alert(data.message || '다시 시도해 주세요.');
        }
    } catch (err) {
        console.error(err);
        alert('서버에서 데이터를 가져오는 데 문제가 발생했습니다.');
    }
}

function displayDiaries(diaries) {
    // diaries 데이터를 HTML에 표시하는 로직
    const container = document.getElementById('diaryContainer');
    container.innerHTML = '';

    diaries.forEach(diary => {
        const diaryElement = document.createElement('div');
        diaryElement.textContent = `Diary ID: ${diary.id}, Content: ${diary.content}`;
        container.appendChild(diaryElement);
    });
}

// 예시로 특정 ID를 사용하여 데이터 불러오기
const id = window.location.pathname.split('/').pop();
fetchDiaries(id);

document.getElementById('submitButton').addEventListener('click', submit);
