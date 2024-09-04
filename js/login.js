async function login(_id, pw) {
    try {
        const response = await fetch('http://localhost:3000/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ _id, pw })
        });

        if (!response.ok) {
            throw new Error(`Login failed: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (err) {
        console.error('Error during login:', err.message || err);
        alert('서버와 연결할 수 없습니다. 인터넷 연결을 확인하시고 다시 시도해 주세요.');
    }
}

async function submit(event) {
    event.preventDefault();

    const userid = document.getElementById('id').value;
    const userpw = document.getElementById('pw').value;

    console.log(userid, userpw)

    if (!userid || !userpw) {
        alert('아이디 또는 비밀번호를 입력해 주세요.');
        return;
    }

    const result = await login(userid, userpw);
    console.log(result);
    if (result) {
        console.log('로그인 성공');
        window.location.href = `main/${encodeURIComponent(userid)}`;
    } else {
        alert('로그인에 실패하였습니다. 다시 시도해 주세요.');
    }
}

document.getElementById('submitButton').addEventListener('click', submit);
