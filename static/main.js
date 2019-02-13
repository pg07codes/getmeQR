
let btn0=$("#urlBtn")
let btn1=$("#currentQRbtn")
let btn2=$("#allETQRbtn")
let btn3=$("#allQRbtn")
let QRcvs=$("#qrcode")

let API_URL="https://api.qrserver.com/v1/create-qr-code/"
let ALL_OPEN_URLS=[]
let qrSize;


function validateURL(str) {
    let URLregex = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/
    if(URLregex.test(str))
    {
        console.log("Valid URL")
        return true
    }
    else{
        console.log("Invalid URL")
        return false
    }
}

chrome.tabs.query({'active':true, lastFocusedWindow: true},function(currentTab){
    ALL_OPEN_URLS.push(currentTab[0].url) 
    pushOtherTabs();   
})

function pushOtherTabs(){
    chrome.tabs.query({'active':false, lastFocusedWindow: true},function(tabs){
        tabs.forEach(element => {
            ALL_OPEN_URLS.push(element.url)
        })

    })
}
btn0.click(()=>{
    QRcvs.empty()
    let data=encodeURIComponent($("#url").val())
    if(data.length!==0){
        let qrSize=data.length<=90?150:(data.length<=150?220:280)
        
        QRcvs.append(`
            <img id="qr" src="${API_URL}?size=${qrSize}x${qrSize}&data='${data}'" alt="QR-code">
        `)
    }
    
})

btn1.click(()=>{
    QRcvs.empty()

    let data=encodeURIComponent(ALL_OPEN_URLS[0])
    let qrSize=data.length<=90?150:(data.length<=150?220:280)
    QRcvs.append(`
        <img id="qr" src="${API_URL}?size=${qrSize}x${qrSize}&data='${data}'" alt="QR-code">
    `)
})

btn2.click(()=>{
    QRcvs.empty()
    
    let URLString="";
    ALL_OPEN_URLS.forEach((element,i) => {
        if(i)
        URLString=URLString+i+".) "+element+" "
    });
    
    let data=encodeURIComponent(URLString)
    let qrSize=data.length<=90?150:(data.length<=150?220:280)    
    QRcvs.append(`
        <img id="qr" src="${API_URL}?size=${qrSize}x${qrSize}&data='${data}'" alt="QR-code">
    `)
})

btn3.click(()=>{
    QRcvs.empty()
    
    let URLString="";
    ALL_OPEN_URLS.forEach((element,i) => {
        URLString=URLString+i+".) "+element+" "
    });    
    
    let data=encodeURIComponent(URLString)
    let qrSize=data.length<=90?150:(data.length<=150?220:280)
    QRcvs.append(`
        <img id="qr" src="${API_URL}?size=${qrSize}x${qrSize}&data='${data}'" alt="QR-code">
    `)
})
