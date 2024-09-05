const userid = localStorage.getItem('id');

async function submit(event) {
    window.location.href = 'basenote.html'
}

document.getElementById('basenote-a').addEventListener('click', submit);