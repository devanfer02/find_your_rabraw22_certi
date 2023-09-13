const API_URL = "https://api.github.com/repos/devanfer02/tools/contents/storage/rabraw/filkom"

let DATA = {};

async function getData() {
    try {
        const response = await fetch(API_URL)
        if (!response.ok) {
            throw new Error('response not ok')
        }

        const jsonData = await response.json();
        console.log(jsonData)
        DATA = jsonData;
        return jsonData;
        
    } catch (error) {
        console.log(error.message)
    }
}

getData()

function search() {
    const fullname = document.getElementById('fullName').value
    const anchortag = document.getElementById('link')

    const fullnameAllCaps = fullname.toUpperCase()

    const object = DATA.find((item) => {

        return item.name.toUpperCase().includes(fullnameAllCaps)
    })

    console.log(object)

    const url_certi = object.download_url
    
    anchortag.href = url_certi
    anchortag.textContent = "Here's your rabraw certificate!"
}

