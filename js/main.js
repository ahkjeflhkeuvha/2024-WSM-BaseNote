const userid = localStorage.getItem('id');

async function locate(event) {
    console.log(userid);
    window.location.href = 'basenote.html';
}

document.addEventListener('DOMContentLoaded', () => {
    async function loadPercent() {
        try {
            // 일기 목록 데이터를 가져옵니다
            const response = await fetch(`http://localhost:3000/diaries/basenote/${userid}`);
            const data = await response.json();
            const diaries = data["diaries"];
            
            // 승, 무, 패 개수 계산
            let winCount = 0, noneCount = 0, loseCount = 0;
            
            diaries.forEach((diary) => {
                const result = diary.result;  // diary.result는 승, 무, 패 결과

                if (result === "승") winCount++;
                else if (result === "패") loseCount++;
                else if (result === "무") noneCount++;
            });

            // 차트에 사용할 데이터 생성
            const totalResults = {
                win: winCount,
                none: noneCount,
                lose: loseCount
            };

            // 차트 설정
            const ctx = document.getElementById('resultChart').getContext('2d');
            const resultChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: [''],  // 하나의 막대에 승무패를 누적 표시
                    datasets: [
                        {
                            label: '승',
                            data: [totalResults.win],  // 승 데이터
                            backgroundColor: '#4CAF50',  // 초록색
                        },
                        {
                            label: '무',
                            data: [totalResults.none],  // 무 데이터
                            backgroundColor: '#FFC107',  // 노란색
                        },
                        {
                            label: '패',
                            data: [totalResults.lose],  // 패 데이터
                            backgroundColor: '#F44336',  // 빨간색
                        }
                    ]
                },
                options: {
                    indexAxis: 'y', // 막대를 가로로 변경 (원하지 않으면 이 부분 제거)
                    scales: {
                        x: {
                            stacked: true, // X축 스택 활성화
                            beginAtZero: true // X축 0부터 시작
                        },
                        y: {
                            stacked: true // Y축 스택 활성화
                        }
                    },
                    plugins: {
                        legend: {
                            position: 'top' // 범례의 위치를 상단으로 설정
                        }
                    }
                }
            });
        } catch (error) {
            console.error('Failed to load diaries:', error);
        }
    }

    loadPercent();
});

document.getElementById('basenote-a').addEventListener('click', locate);
