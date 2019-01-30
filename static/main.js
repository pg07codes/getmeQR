

let btn1=$("#currentQRbtn")
let btn2=$("#allETQRbtn")
let btn3=$("#allQRbtn")
let QRcvs=$("#qrcode")
let API_URL="https://api.qrserver.com/v1/create-qr-code/"
let ALL_OPEN_URLS=[]
let qrSize;

chrome.tabs.query({'active':true},function(currentTab){
    ALL_OPEN_URLS.push(currentTab[0].url) 
    pushOtherTabs();   
})

function pushOtherTabs(){
    chrome.tabs.query({'active':false},function(tabs){
        tabs.forEach(element => {
            ALL_OPEN_URLS.push(element.url)
        })

    })
}

btn1.click(()=>{
    QRcvs.empty()

    let data=ALL_OPEN_URLS[0]
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
    
    let data=URLString
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
    
    let data=URLString
    let qrSize=data.length<=90?150:(data.length<=150?220:280)
    QRcvs.append(`
        <img id="qr" src="${API_URL}?size=${qrSize}x${qrSize}&data='${data}'" alt="QR-code">
    `)
})
