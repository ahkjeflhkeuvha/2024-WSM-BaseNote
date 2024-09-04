document.addEventListener('DOMContentLoaded', () => {
    // 일기 목록을 가져오고 렌더링하는 함수
    async function loadDiaries() {
        try {
            // 일기 목록 데이터를 가져옵니다 (여기서는 예시 URL을 사용합니다)
            const response = await fetch('http://localhost:3000/diaries/basenote/jieun0996');

            const data = await response.json();
            const diaries = await data["diaries"];
            const diaryList = document.getElementById('diary-list');

            diaries.forEach(diary => {
                const diaryElement = document.createElement('div');
                diaryElement.setAttribute("class", "diary-content")
                diaryElement.innerHTML = `
                    <h2>${diary.title}</h2>
                    <p>${diary.date}</p>
                    <p>${diary.content.slice(0, 100)}...</p>
                    <button onclick="openPopup(${diary.id})">Read More</button>
                `;
                diaryList.appendChild(diaryElement);
            });
        } catch (error) {
            console.error('Failed to load diaries:', error);
        }
    }

    // 팝업을 여는 함수
    window.openPopup = async function(id) {
        try {
            const response = await fetch(`http://localhost:3000/diaries/${id}`);
            const data = await response.json();
            const datas = await data["diaries"];

            console.log(datas)

            const popupContent = document.getElementById('popup-content');
            popupContent.innerHTML = `
                <div class="popup-items">
                    <div id="date">
                        <p>날짜</p>
                        <p>${datas[0].date}</p>
                    </div>
                    <div id="best-player">
                        <p>베스트 플레이어</p>
                        <p>${datas[0].bestPlayer}
                    </div>
                    <div id="pitcher">
                        <p>선발투수</p>
                        <p>${datas[0].startingPitcher}
                    </div>
                    <div id="stadium">
                        <p>경기장</p>
                        <p>${datas[0].location}
                    </div>
                    <div id="win-lose">
                        <p>승/패</p>
                        <p>${datas[0].result}
                    </div>
                </div>
                <div class="popup-title">
                    <p>제목</p>
                    <p>${datas[0].title}</p>
                </div>
                <div class="popup-contents">
                    <p>일기</p>
                    <p>${datas[0].content}</p>
                </div>
            `;

            const popup = document.getElementById('popup');
            popup.classList.add('active');
        } catch (error) {
            console.error('Failed to load diary:', error);
        }
    }

    // 팝업을 닫는 함수
    window.closePopup = function() {
        const popup = document.getElementById('popup');
        popup.classList.remove('active');
    }

    // 일기 목록을 로드합니다
    loadDiaries();
});
