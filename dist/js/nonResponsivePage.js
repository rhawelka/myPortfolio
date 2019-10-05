const container = document.querySelector('.container');
const containerNonResponisivePage = document.querySelector('.containerNonResponisivePage');

setInterval(() => {
    let windowWidth = window.innerWidth;
    if(windowWidth<1200){
        container.style.display = "none";
        containerNonResponisivePage.style.display = "block";
           }
    if(windowWidth>1200){
        container.style.display = "";
        containerNonResponisivePage.style.display = "none";
            }
}, 100);




