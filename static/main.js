// new QRCode(document.getElementById("qrcode"), "http://jindo.dev.naver.com/collie");


let btn1=$("#currentQRbtn")
let btn2=$("#allQRbtn")
let btn3=$("#allETQRbtn")
let ALL_OPEN_URLS=[]

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
    console.log("clicked on 1")
    new QRCode(document.getElementById("qrcode"), ALL_OPEN_URLS[0]);
})

// btn1.click(()=>{
//     console.log("clicked on 1")
//     new QRCode(document.getElementById("qrcode"), ALL_OPEN_URLS[0]);
// })

