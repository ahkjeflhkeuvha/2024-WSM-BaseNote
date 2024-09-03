async function findDiary(id) {
    try {
        const response = await fetch(`http://localhost:3000/diaries/${id}`, {
            method: 'GET'
        });

        if (!response.ok) {
            throw new Error(`ID 찾기 실패: ${response.status}`);
        }

        const data = await response.json();
        return data.diaries;
    } catch (err) {
        console.error(err);
        alert('다시 시도해 주십시오.');
    }
}

async function onload(event) {
    const userId = extractUserIdFromUrl(); 
    console.log(userId)// 현재 URL에서 ID 추출
    const diaries = await findDiary(userId);

    if (diaries.length > 0) {
        displayDiaries(diaries);
    } else {
        alert('등록된 다이어리가 없습니다.');
    }
}

function extractUserIdFromUrl() {
    const urlParts = window.location.pathname.split('/');
    return urlParts[urlParts.length - 1];
}

function displayDiaries(diaries) {
    const diaryList = document.getElementById('diary-list');
    diaries.forEach(diary => {
        const diaryItem = document.createElement('div');
        diaryItem.className = 'diary-item';
        diaryItem.innerHTML = `
            <h3>${diary.title}</h3>
            <p>${diary.content.substring(0, 100)}...</p>
            <button onclick="showFullDiary(${diary.id})">더 보기</button>
        `;
        diaryList.appendChild(diaryItem);
    });
}

function showFullDiary(diaryId) {
    const selectedDiary = diaries.find(diary => diary.id === diaryId);
    if (selectedDiary) {
        // 모달이나 팝업으로 다이어리 전체 내용을 보여줍니다.
        alert(`제목: ${selectedDiary.title}\n내용: ${selectedDiary.content}\n선발투수: ${selectedDiary.starting_pitcher}\n장소: ${selectedDiary.location}\n결과: ${selectedDiary.result}`);
    }
}

window.onload = onload;
