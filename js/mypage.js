const userid = localStorage.getItem('id');
const userpw = localStorage.getItem('pw');
const username = localStorage.getItem('name');
const userphone = localStorage.getItem('phonenum');
const userteam = localStorage.getItem('team');
const userimg = localStorage.getItem('img');

document.addEventListener('DOMContentLoaded', () => {
    console.log(userid, userpw, username, userphone, userteam, userimg)
    const userimgImg = document.getElementById('userImg');
    const useridP = document.getElementById('userid');
    const userphoneP = document.getElementById('phonenum');
    const userpwP = document.getElementById('password');
    const userteamP = document.getElementById('team');
    let fixedPhone = maskPhoneNumber(userphone)
    let fixedPw = maskPw(userpw)

    console.log(fixedPw)

    console.log(fixedPhone)
    useridP.innerText = userid;
    userphoneP.innerHTML = fixedPhone;
    userpwP.innerHTML = fixedPw;
    userteamP.innerHTML = userteam;

    if(userimg == null) {
        console.log('change')
        userimgImg.src = "images/logo.jpg"
    }

    function maskPhoneNumber(userphone) {
        let phoneStr = userphone.toString();
        let maskedPart = phoneStr.slice(4, 8).replace(/\d/g, '*');
        let maskedPhone = phoneStr.slice(0, 4) + maskedPart + phoneStr.slice(8);
        let formattedPhone = maskedPhone.slice(0, 3) + '-' + maskedPhone.slice(3, 7) + '-' + maskedPhone.slice(7);
        
        return formattedPhone;
    }

    function maskPw(userpw) {
        let pwLength = userpw.length;
        let fixedPw = ""
        
        for(var i = 0; i < pwLength; i++) {
            fixedPw += "*"
        }

        return fixedPw
    }
})