let DATA = [];

async function getData() {
    DATA = JSON.parse(STRING_DATA)
}

getData()

function search() {
    const fullname = document.getElementById('fullName').value
    const anchortag = document.getElementById('link')

    const fullnameAllCaps = fullname.toUpperCase()

    const object = DATA.find((item) => {
        return item.name.toUpperCase().includes(fullnameAllCaps)
    })

    if (object === undefined) {
        anchortag.textContent = "Cannot find your certificate 😔."
        anchortag.style = 'text-decoration:none;'
        return;
    }
    
    const url_certi = object.download_url

    anchortag.style = ''
    anchortag.href = url_certi
    anchortag.textContent = "Here's your rabraw22 certificate 😊!"
}

const inputTag = document.getElementById('fullName')
const anchorTag = document.getElementById('link')

inputTag.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        search()
    }
})

inputTag.addEventListener('input', function(event) {
    if (inputTag.value.trim() === '') {
        anchorTag.textContent = 'Submit Your Fullname First';
    }
})