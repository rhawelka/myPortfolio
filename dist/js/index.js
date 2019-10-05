/*
 *     Global functions 
 */

function disableScrolling() {
  let x = window.scrollX;
  let y = window.scrollY;
  window.onscroll = function () {
    window.scrollTo(x, y);
  };
}

function enableScrolling() {
  window.onscroll = function () {};
}


/*
 *  Images source
 */
let cityGameImagesArr;
let legoSetsImagesArr;

async function asyncGetImages() {
  const response = await fetch('http://localhost:3306/Portfolio/dist/JsonData/imagesSrc.json');
  const json = await response.json();
  return json;
}

asyncGetImages()
  .then(
    (data) => {
      legoSetsImagesArr = data["legoSetsImages"].map(legoImgSrc => legoImgSrc.source);
      cityGameImagesArr = data["cityGameImages"].map(cityGameImgSrc => cityGameImgSrc.source);
      loadLegoImages();
      loadCityGameImages();
    }
  ).catch(error => console.error(error));


function loadLegoImages() {
  const legoSetsArr = document.getElementsByClassName('legoSet');
  const legoSetsAnchors = document.querySelector('.legoSetsImages').getElementsByTagName('a');
  for (i = 0; i < legoSetsImagesArr.length; i++) {
    legoSetsArr[i].src = legoSetsImagesArr[i];
    legoSetsAnchors[i].href = legoSetsImagesArr[i];
  }
}

function loadCityGameImages() {
  const cityGameImagesFromGame = document.querySelector('.cityGameImages');
  const cityGameImages = document.getElementsByClassName('cityGameImg');
  const cityGameImageToClick = document.querySelector('.cityGame');
  cityGameImageToClick.addEventListener('click', function () {
    cityGameImagesFromGame.classList.toggle('active');
  });
  for (let i = 0; i < cityGameImagesArr.length; i++) {
    cityGameImages[i].src = cityGameImagesArr[i];
  }
  setModalToCityGameImages(cityGameImages);
}

function setModalToCityGameImages(cityGameImages) {
  const modalCityGame = document.getElementById('cityGameModal');
  const modalImg = document.getElementById("imgCG");
  const sectionArticle = document.getElementsByClassName('section__article');
  for (let i = 0; i < cityGameImagesArr.length; i++) {
    cityGameImages[i].src = cityGameImagesArr[i];
    cityGameImages[i].addEventListener('click', function () {
      modalCityGame.style.display = "block";
      modalImg.src = this.src;
      bb8Head.style.zIndex = 0;
      sectionArticle[3].style.opacity = 1;
      for (let i = 0; i < sectionArticle.length; i++) {
        sectionArticle[i].style.transition = "0s";
      }
      disableScrolling();
    });
  }
  var span = document.getElementsByClassName("closeCityGame")[0];
  span.onclick = function () {
    modalCityGame.style.display = "none";
    bb8Head.style.zIndex = 1;
    sectionArticle[3].style.opacity = .8;
    for (let i = 0; i < sectionArticle.length; i++) {
      sectionArticle[i].style.transition = "2s ease-in-out";
    }
    enableScrolling();
  }
}

/*
 *  experience items 
 */

async function asyncGetSkillsData() {
  const response = await fetch('./dist/JsonData/experience.json');
  const json = await response.json();
  return json;
}

const skillBar = document.querySelector('.lightsaber--plasma');
const skillDescription = document.querySelector('.skillDescription');
const skillsItems = document.getElementsByClassName('scrollmenu__item');
const skillsImages = document.getElementsByClassName('powerList__img');
const lightsaberLabel = document.querySelector('.lightsaber--label');
lightsaberLabel.addEventListener('click', function(){
  skillBar.style.width = 0;
});

asyncGetSkillsData()
  .then(data => (function () {
      for (let i = 0; i < data.length; i++) {
        skillsImages[i].src = data[i].imgSrc;
        skillsItems[i].addEventListener('click', function () {
          skillBar.style.width = data[i].percentage +'%';
          skillBar.style.backgroundColor = data[i].color;
          skillBar.style.boxShadow = '0px 0px 10px 5px ' + data[i].color;
          skillDescription.innerHTML = 'lvl: ' + data[i].description;
        });
      }
    })
    ())
  .catch(error => console.error(error));







/*
 *  yoda quotes 
 */
async function asyncGetYodaQuotes() {
  const response = await fetch('http://localhost:5500/Portfolio/dist/JsonData/yodaQuotes.json');
  const json = await response.json();
  return json;
}

asyncGetYodaQuotes()
  .then(data => (function () {
    const yodaQuotesSpan = document.querySelector('.yodaQuote');
    let randomNumberBetween0and18 = Math.floor(Math.random() * data.length);
    yodaQuotesSpan.innerHTML = data[randomNumberBetween0and18]
  })())
  .catch(error => console.error(error));

/*
 * modals for experience
 */
const bb8Head = document.querySelector('.head');
const modalSalesManago = document.getElementById("SMmodal");
const modalGlobalLogic = document.getElementById("GLmodal");
const btnSalesManago = document.getElementById("salesmanagoImg");
const btnGlobalLogic = document.getElementById("globalLogicImg");
const span2 = document.querySelector(".SMclose");
const span3 = document.querySelector('.GLclose');

btnSalesManago.onclick = function () {
  modalSalesManago.style.display = "block";
  bb8Head.style.zIndex = 0;
  disableScrolling();
}
btnGlobalLogic.onclick = function () {
  modalGlobalLogic.style.display = "block";
  bb8Head.style.zIndex = 0;
  disableScrolling();
}

span2.onclick = function () {
  modalSalesManago.style.display = "none";
  bb8Head.style.zIndex = 1;
  enableScrolling();
};
span3.onclick = function () {
  modalGlobalLogic.style.display = "none";
  bb8Head.style.zIndex = 1;
  enableScrolling();
};

window.onclick = function (event) {
  if (event.target == modalSalesManago) {
    modalSalesManago.style.display = "none";
    bb8Head.style.zIndex = 1;
    enableScrolling();
  }
  if (event.target == modalGlobalLogic) {
    modalGlobalLogic.style.display = "none";
    bb8Head.style.zIndex = 1;
    enableScrolling();
  }
}

/* 
 *    ------  Animations  ---------
 */

//milenium falcon show when scroll down

$(window).scroll(function () {
  if ($(this).scrollTop() > 20) {
    $('.toTopButton').fadeIn();
  } else {
    $('.toTopButton').fadeOut();
  }
});

//Click millenium falcon to scroll to top

$('.toTopButton').click(function () {
  $('html, body').animate({
    scrollTop: 0
  }, 1000);
  $(this).animate({
    top: '-150vh'
  }, 300);
  $(this).animate({
    fontSize: '80px'
  }, 100);
  $(this).css('text-shadow', 'let(--box-shadow-blue)');
  setTimeout(() => {
    $('.toTopButton:first').css('top', '');
    $('.toTopButton:first').css('text-shadow', '');
  }, 1500);
});

//  C3PO button events 

const modalC3PO = document.querySelector('.section__modalInfo');
const btnC3PO = document.querySelector('.section__headerC3PO--button');
const closeC3PO = document.querySelector('.modal-close');
btnC3PO.addEventListener('click', function () {
  modalC3PO.style.display = "block";
  disableScrolling();
  $('.section__headerC3PO--alert').css('display', 'none');
  $('.section__headerC3PO--arrows').css('display', 'none');
  $('.swg-c3po').css('animation', 'none');
});
closeC3PO.addEventListener('click', function () {
  modalC3PO.style.display = "none";
  enableScrolling();
})