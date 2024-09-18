async function findId(name, phone) {
    try {
        // 쿼리 파라미터로 name과 phone 전달
        const response = await fetch(`http://localhost:3000/users/findid?name=${encodeURIComponent(name)}&phonenum=${encodeURIComponent(phone)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`ID 찾기 실패: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (err) {
        alert('다시 시도해 주십시오.');
    }
}

async function submit(event) {
    event.preventDefault();

    const username = document.getElementById('name').value;
    const userphone = document.getElementById('phone').value;

    if (!username || !userphone) {
        alert('이름 또는 전화번호를 입력해 주세요.');
        return;
    }

    const result = await findId(username, userphone);
    if (result && result.success) {
        alert(`${username} 님의 아이디는 ${result.user._id} 입니다.`);
        setTimeout(() => {
            window.location.href = 'main.html'; // 성공 시 이동할 페이지
        }, 3000);
    } else {
        alert(result.message || '아이디 찾기에 실패하였습니다. 다시 시도해 주세요.');
    }
}

document.getElementById('submitButton').addEventListener('click', submit);
