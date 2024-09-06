const useridP = document.getElementById('userid')
useridP.innerHTML = localStorage.getItem('id')

const userImg = document.getElementById('userImg')

if(userImg.src == null) {
    userImg.src == 'images/logo.jpg'
}