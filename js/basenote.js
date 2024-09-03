// 데이터베이스에 일기 저장 요청을 보내는 함수
async function saveDiary(userId, title, date, bestPlayer, pitcher, location, result, content) {
    try {
        const response = await fetch('http://localhost:3000/diaries/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId, title, date, bestPlayer, pitcher, location, result, content })
        });

        if (!response.ok) {
            throw new Error(`Save failed: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (err) {
        console.error(err);
        alert('다시 시도해 주십시오.');
    }
}

// 폼 제출을 처리하는 함수
async function submit(event) {
    event.preventDefault();

    // 폼 필드 값 가져오기
    const userId = 'jieun0996'; // 예시로 하드코딩된 사용자 ID
    const title = document.getElementById('title').value;
    const date = document.getElementById('date').value;
    const bestPlayer = document.getElementById('best-player-text').value;
    const pitcher = document.getElementById('pitcher').value;

    // stadium 선택된 값 가져오기
    const locationElement = document.getElementById('stadium-select');
    const location = locationElement.value; // `.value`는 select 요소의 선택된 값을 가져옴

    // win-lose 선택된 값 가져오기
    const gameResElement = document.getElementById('win-lose-select');
    const gameRes = gameResElement.value; // `.value`는 select 요소의 선택된 값을 가져옴

    const content = document.getElementById('content').value;

    console.log(userId, title, date, bestPlayer, pitcher, location, gameRes, content);

    // 입력값 유효성 검사
    if (!title || !date || !bestPlayer || !pitcher || !location || !gameRes || !content) {
        alert('빈칸이 있는 지 확인해 주세요.');
        return;
    }

    // 일기 저장 요청 보내기
    const result = await saveDiary(userId, title, date, bestPlayer, pitcher, location, gameRes, content);
    if (result && result.message === '일기 저장 성공') {
        console.log('일기 저장 성공');
        // 저장 성공 시 다른 페이지로 이동하거나 추가 작업 수행
        alert('일기가 성공적으로 저장되었습니다.');
        // window.location.href = 'someOtherPage.html'; // 필요한 경우 페이지 이동
    } else {
        alert(result.message || '일기 저장에 실패하였습니다. 다시 시도해 주세요.');
    }
}

// 폼 제출 버튼에 이벤트 리스너 추가
document.getElementById('submitButton').addEventListener('click', submit);
