async function findPw(id, phone) {
    try {
        // 쿼리 파라미터를 통해 name과 phone 전달
        const response = await fetch(`http://localhost:3000/users/findpw?_id=${encodeURIComponent(id)}&phonenum=${encodeURIComponent(phone)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`PW 찾기 실패: ${response.status}`);
        }

        const data = await response.json();
        console.log(data)
        return data;
    } catch (err) {
        alert('다시 시도해 주십시오.');
    }
}

async function submit(event) {
    event.preventDefault();

    const userid = document.getElementById('id').value;
    const userphone = document.getElementById('phone').value;
    console.log(userid, userphone)
    if (!userid || !userphone) {
        alert('이름 또는 전화번호를 입력해 주세요.');
        return;
    }

    const result = await findPw(userid, userphone);
    console.log(result)
    if (result) {
        alert(`${userid} 님의 비밀번호는 ${result.user.pw} 입니다.`)
        setTimeout(() => {
            window.location.href = 'login.html'; // 성공 시 이동할 페이지
        }, 3000);
    } else {
        alert('아이디 찾기에 실패하였습니다. 다시 시도해 주세요.');
    }
}

document.getElementById('submitButton').addEventListener('click', submit);
