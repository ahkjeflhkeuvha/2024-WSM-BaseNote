document.addEventListener('DOMContentLoaded', () => {
    const userid = localStorage.getItem('id');

    // 일기 목록을 가져오고 렌더링하는 함수
    async function loadDiaries() {
        try {
            const response = await fetch(`http://localhost:3000/diaries/basenote/${userid}`);
            const data = await response.json();
            const diaries = data["diaries"];
            const diaryList = document.getElementById('diary-list');

            diaries.forEach(diary => {
                const title = diary.content.substr(0, 10);
                const text = diary.content.substr(0, 80);
                const diaryElement = document.createElement('div');
                diaryElement.setAttribute("class", "diary-content");
                diaryElement.innerHTML = `
                    <img src="images/logo.jpg" alt="">
                    <h5>${title}</h5>
                    <div>
                        <p>${diary.date}</p>
                        <p>${diary.bestPlayer}</p>
                        <p>${diary.result}</p>
                    </div>
                    <p>${text}</p>
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

            if (!data.success) {
                alert('Diary not found');
                return;
            }

            const diary = data["diaries"][0];
            const popupContent = document.getElementById('popup-content');
            popupContent.innerHTML = `
                <div class="popup-items">
                    <div id="date">
                        <p>날짜</p>
                        <p>${diary.date}</p>
                    </div>
                    <div id="best-player">
                        <p>베스트 플레이어</p>
                        <p>${diary.bestPlayer}</p>
                    </div>
                    <div id="pitcher">
                        <p>선발투수</p>
                        <p>${diary.startingPitcher}</p>
                    </div>
                    <div id="stadium">
                        <p>경기장</p>
                        <p>${diary.location}</p>
                    </div>
                    <div id="win-lose">
                        <p>승/패</p>
                        <p>${diary.result}</p>
                    </div>
                </div>
                <div class="popup-title">
                    <p>제목</p>
                    <p>${diary.title}</p>
                </div>
                <div class="popup-contents">
                    <p>일기</p>
                    <p>${diary.content}</p>
                </div>
            `;

            const popup = document.getElementById('popup');
            popup.classList.add('active');
        } catch (error) {
            console.error('Failed to load diary:', error);
        }
    };

    window.closePopup = function() {
        const popup = document.getElementById('popup');
        popup.classList.remove('active');
    };

    loadDiaries();

    const plusBut = document.getElementsByClassName('plus-button')[0];
    plusBut.addEventListener('click', () => {
        window.location.href = 'basenote.html';
    });

});
