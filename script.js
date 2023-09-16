const DATA_PROMISE = fetch('data.json').then(res => {
    return res.json()
}).then(data => {
    return [].concat(...data)
})

let lastInput = ''
const pdfjsLib = window['pdfjs-dist/build/pdf'];
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://mozilla.github.io/pdf.js/build/pdf.worker.js';

async function search() {
    try {
        const DATA = await DATA_PROMISE
        const fullname = document.getElementById('fullName').value.trim()
        const faculty = document.getElementById('faculty').value.trim()
        const anchortag = document.getElementById('link')

        if (fullname === '' || faculty === '') return
    
        const fullnameAllCaps = fullname.toUpperCase()
        const facultyAllCaps = faculty.toUpperCase()
        lastInput = fullname + ' ' + faculty
    
        const object = DATA.find((item) => {
            return item.name.toUpperCase().includes(fullnameAllCaps + ' ' + facultyAllCaps)
        })
    
        if (object === undefined) {
            anchortag.textContent = "Cannot find your certificate 😔."
            anchortag.style = 'text-decoration:none;'
            return;
        }    
    
        const url_certi = object.download_url
        const firstname = fullname.split(' ')[0].toLowerCase()
    
        anchortag.style = ''
        anchortag.href = url_certi
        anchortag.textContent = `Here's your rabraw22 certificate ${firstname} 😊!`
    
        await loadPDF(url_certi)
    } catch (error) {
        console.log(error)
    }
}

async function loadPDF(url_certi) {
    try {
        const loadingTask = pdfjsLib.getDocument(url_certi)
        const pdf = await loadingTask.promise
        const page = await pdf.getPage(1)
    
        const scale = 1.5;
        const viewport = page.getViewport({scale: scale});
    
        const canvas = document.getElementById('pdf_renderer');
        const context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;
    
    
        const renderContext = {
            canvasContext: context,
            viewport: viewport
        };
        const renderTask = page.render(renderContext);
        renderTask.promise.then(function () {
    
        });
    } catch (error) {
        console.log(error)
    }
}

function initEventListener() {
    const inputFullname = document.getElementById('fullName')
    const inputFaculty = document.getElementById('faculty')
    const canvas = document.getElementById('pdf_renderer');
    const context = canvas.getContext('2d')
    const anchorTag = document.getElementById('link')

    function checkIfEnter(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            search()
        }
    }
    
    function checkChangeInput(event) {
        if (inputFullname.value.trim() === '' || inputFullname.value !== lastInput) {
            anchorTag.textContent = 'Submit Your Fullname First';
            anchorTag.href = '';
            context.clearRect(0,0, canvas.width, canvas.height)
        }
    }
    
    inputFullname.addEventListener('keypress', checkIfEnter)
    inputFaculty.addEventListener('keypress', checkIfEnter)
    
    inputFullname.addEventListener('input', checkChangeInput)
    inputFaculty.addEventListener('input', checkChangeInput)
}



initEventListener()