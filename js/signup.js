async function signup(_id, pw, name, phonenum) {
    try {
        const response = await fetch('http://localhost:3000/users/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ _id, pw, name, phonenum })
        });

        if (!response.ok) {
            throw new Error(`Login failed: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (err) {
        console.error(err);
        alert('다시 시도해 주십시오.');
    }
}

async function submit(event) {
    event.preventDefault();

    const userid = document.getElementById('id').value;
    const userpw = document.getElementById('pw').value;
    const userpwck = document.getElementById('pwck').value;
    const username = document.getElementById('name').value;
    const userphone = document.getElementById('phone').value;

    if (!userid || !userpw || !userpwck || !username || !userphone) {
        alert('빈칸이 있는 지 확인해 주세요.');
        return;
    }

    if (userpw != userpwck) {
        alert('비밀번호를 확인해 주세요.');
        return;
    }

    const result = await signup(userid, userpw, username, userphone);
    if (result && result.success) {
        console.log('회원가입 성공')
        window.location.href = 'main.html'; // 로그인 성공 시 이동할 페이지
    } else {
        alert(result.message || '회원가입에 실패하였습니다. 다시 시도해 주세요.');
    }
}

document.getElementById('submitButton').addEventListener('click', submit);