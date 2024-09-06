async function login(_id, pw) {
    try {
        const response = await fetch('http://localhost:3000/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ _id: _id, pw: pw })
        });

        if (!response.ok) {
            throw new Error(`Login failed: ${response.status}`);
        }
                         
        const data = await response.json();
        console.log(data)
        if (data.success) {
            return data
        } else {
            alert('로그인에 실패했습니다.');
        }
    } catch (err) {
        alert('다시 시도해 주십시오.');
    }
}

async function submit(event) {
    event.preventDefault();

    const userid = document.getElementById('id').value;
    const userpw = document.getElementById('pw').value;

    if (!userid || !userpw) {
        alert('아이디 또는 비밀번호를 입력해 주세요.');
        return;
    }

    const result = await login(userid, userpw);
    console.log(result)
    if (result) {
        console.log('로그인 성공');
        localStorage.setItem('id', userid);
        localStorage.setItem('pw', userpw);
        localStorage.setItem('phonenum', )
        window.location.href = `main.html`;
    } else {
        alert('로그인에 실패하였습니다. 다시 시도해 주세요.');
    }
}

document.getElementById('submitButton').addEventListener('click', submit);
