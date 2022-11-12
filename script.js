const fileInput = document.querySelector(".wrapper input")
const downloadBtn = document.querySelector(".wrapper button")

downloadBtn.addEventListener('click', e => {
    e.preventDefault() //preventing form from submitting (action wont work)
    downloadBtn.innerHTML = 'Downloading file...'
    fetchFile(fileInput.value)
})

const fetchFile = (url) => {
    //feting the file and returning result as a blob object
    fetch(url).then(res => res.blob()).then(file => {
        //createObjectUrl creates the url of passed object
        let tempUrl = URL.createObjectURL(file)
        let aTag = document.createElement('a')
        aTag.href = tempUrl
        //passing filename as a download value of <a> tag
        aTag.download = url.replace(/^.*[\\\/]/, ''); //downloading a file with name some
        document.body.appendChild(aTag)
        aTag.click()
        aTag.remove()
        URL.revokeObjectURL(tempUrl)
        downloadBtn.innerHTML = 'Download File'
    }).catch(()=>{
        downloadBtn.innerHTML = 'Download File'
        alert('Failed to download file!')
    })

}