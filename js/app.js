const btnBurger = document.querySelector(".header__burger");
const burger = document.querySelector(".burger__open");



function toggleBurger() {
  document.querySelector("body").classList.toggle("scrollNone");
  burger.classList.toggle("burger__open-active");
  btnBurger.classList.toggle("close");
}

btnBurger.addEventListener("click", () => {
  toggleBurger();
});

let header = document.querySelector("header");

window.addEventListener("scroll", () => {
  if (scrollY > 10) {
    header.classList.add("header__scroll");
  } else {
    header.classList.remove("header__scroll");
  }
});

document.querySelectorAll(".burger__list li").forEach((burgerLink) => {
  burgerLink.addEventListener("click", () => {
    toggleBurger();
  });
});

const MAIN_FORM_BTN = document.querySelector("#main-form");

const MAIN_FORM_BRAND = document.querySelector("#brand");
const MAIN_FORM_MODEL = document.querySelector("#model");
const MAIN_FORM_YEAR = document.querySelector("#year");
const MAIN_FORM_LOCATION = document.querySelector("#location");
const MAIN_FORM_NAME = document.querySelector("#name");
const MAIN_FORM_TELL = document.querySelector("#tell");

let maskOptions = {
  mask: "+38(000)000-00-00",
  lazy: false,
  placeholderChar: "_",
};

const FOOTER_INPUT = document.querySelector('#footer-form');

const CONSULTATION_INPUT = document.querySelector('#consultation-form');

var mask = IMask(MAIN_FORM_TELL, maskOptions);

var footerMask = IMask(FOOTER_INPUT, maskOptions);

var consultationMask = IMask(CONSULTATION_INPUT, maskOptions);

if (mask.masked.isComplete) {
  MAIN_FORM_TELL.style.opacity = "1";
}

MAIN_FORM_TELL.addEventListener("input", () => {
  if (mask.masked.isComplete) {
    MAIN_FORM_TELL.style.color = "#000";
  } else {
    MAIN_FORM_TELL.style.color = "rgba(0, 0, 0, 0.318)";
  }
});

MAIN_FORM_BTN.addEventListener("click", () => {
  if (mask.masked.isComplete) {
    MAIN_FORM_TELL.style.border = "1px solid #BDBDBD";
  } else {
    MAIN_FORM_TELL.style.border = "1px solid red";
  }

  let validArray = [
    MAIN_FORM_BRAND,
    MAIN_FORM_MODEL,
    MAIN_FORM_LOCATION,
    MAIN_FORM_NAME,
  ];

  validArray.forEach((el) => {
    if (el.value.length >= 3) {
      el.style.border = "1px solid #BDBDBD";
    } else {
      el.style.border = "1px solid red";
    }
  });

  if (MAIN_FORM_YEAR.value.length >= 4) {
    MAIN_FORM_YEAR.style.border = "1px solid #BDBDBD";
  } else {
    MAIN_FORM_YEAR.style.border = "1px solid red";
  }




let expression = mask.masked.isComplete && MAIN_FORM_YEAR.value.length >= 4 && MAIN_FORM_BRAND.value.length >= 3 &&
MAIN_FORM_MODEL.value.length >= 3 && MAIN_FORM_LOCATION.value.length >= 3 && MAIN_FORM_NAME.value.length >= 3;


if (expression) {


  MAIN_FORM_BTN.setAttribute("disabled", true);

  async function postMail() {
    let res = await fetch("send.php", {
      method: "POST",
      body: JSON.stringify({
        name: MAIN_FORM_NAME.value,
        tell: MAIN_FORM_TELL.value,
        brand: MAIN_FORM_BRAND.value,
        model: MAIN_FORM_MODEL.value,
        year: MAIN_FORM_YEAR.value,
        location: MAIN_FORM_LOCATION.value,
      }),
    });

    if (res.ok) {

		document.querySelector('.main-form-success').style.opacity = '1';

      MAIN_FORM_BRAND.value = '';
      MAIN_FORM_MODEL.value = '';
      MAIN_FORM_YEAR.value = '';
      MAIN_FORM_LOCATION.value = '';
      MAIN_FORM_NAME.value = '';
      MAIN_FORM_TELL.value = '';

      MAIN_FORM_BTN.removeAttribute("disabled");
    } else {
      alert("error send messange");
    }
  }

  postMail();
}
});

document.querySelector('.header__btn').addEventListener('click', ()=>{
	
	document.querySelector('.initial__form-body').classList.add('active');


	function delay(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	 };
	
	  delay(1050).then(() =>{
			document.querySelector('.initial__form-body').classList.remove('active');
	 });		
		
});

const FOOTER_BUTTON = document.querySelector('#footer-send-form');



FOOTER_BUTTON.addEventListener('click', ()=>{

  if (footerMask.masked.isComplete) {


      FOOTER_INPUT.style.border = "1px solid #BDBDBD";
      FOOTER_BUTTON.setAttribute("disabled", true);

      async function postFooterMessage() {
        let res = await fetch("send.php", {
          method: "POST",
          body: JSON.stringify({
          
            tell: FOOTER_INPUT.value,
          
          }),
        });
    
        if (res.ok) {
    
        document.querySelector('.footer-form-success').style.opacity = '1';
    
        
        FOOTER_BUTTON.removeAttribute("disabled");

        } else {
          alert("error send messange");
        }
      }
    
      postFooterMessage();


    } else {
      FOOTER_INPUT.style.border = "1px solid red";
    }
  
  
});



const CONSULTATION_BUTTON = document.querySelector('#consultation-button');

CONSULTATION_BUTTON.addEventListener('click', ()=>{
  if (consultationMask.masked.isComplete) {


    CONSULTATION_INPUT.style.border = "1px solid #BDBDBD";
    CONSULTATION_BUTTON.setAttribute("disabled", true);

    async function postConsultationMessage() {
      let res = await fetch("send.php", {
        method: "POST",
        body: JSON.stringify({
        
          tell: CONSULTATION_INPUT.value,
          consultation: 'flag',
        }),
      });
  
      if (res.ok) {
  
      document.querySelector('.footer-form-success').style.opacity = '1';
  
     
       CONSULTATION_BUTTON.removeAttribute("disabled");

      } else {
        alert("error send messange");
      }
    }
  
    postConsultationMessage();


  } else {
    CONSULTATION_INPUT.style.border = "1px solid red";
  }
});


document.querySelector('.consultation__button').addEventListener('click', ()=>{
    document.querySelector('.consultation__body').classList.toggle('active');
});