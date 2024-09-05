const userid = localStorage.getItem('id');

async function submit(event) {
    console.log(userid);
}

document.getElementById('basenote-a').addEventListener('click', submit);