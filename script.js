const slides = document.querySelectorAll(".slider__item");
const slider=document.querySelector(".slider__vrapp")

let current = 0;
let prev;
let next;
let prev2;
let next2;
document.addEventListener('DOMContentLoaded',()=>{
   gotoNum(current);
});

const gotoPrev = () => current > 0 && gotoNum(current - 1);

const gotoNext = () => current < slides.length - 1 && gotoNum(current + 1);

const gotoNum = number => {
   current = number;
   prev = current - 1;
   next = current + 1;
   prev2 = current - 2;
   next2 = current + 2;
   const resizeSlides = (dir) => {
      const averageSlide= slides[dir=="botton"? current+1:current-1]
      const size= slides[slides.length-1].clientHeight

      if (dir=="botton"){
         averageSlide.nextElementSibling.style.height=`${size-size/3}px`
      }else
         averageSlide.previousElementSibling.style.height=`${size-size/3}px`

      averageSlide.style.height=`${size+size/3}px`
      averageSlide.style.maxHeight=`${size+size/3}px`

   }

   for (let i =
       0; i < slides.length; i++) {
      slides[i].classList.remove("active");
      slides[i].classList.remove("prev");
      slides[i].classList.remove("next");
      slides[i].classList.remove("prev-2");
      slides[i].classList.remove("next-2");
      slides[i].style.height=""
      slides[i].style.maxHeight=""
   }

   window.removeEventListener("wheel", handleWheel)
   setTimeout(()=>{
      window.addEventListener("wheel", handleWheel)
   }, 500)

   if (current>0 && current<slides.length-1){
      console.log("step")
      slider.style.transform=`translateY(-${slides[0].clientHeight *(current-1)}px)`
   }else if (current==0){
      resizeSlides("botton")
   }else if (current==slides.length-1){
      resizeSlides("top")
   }

   slides[current].classList.add("active");
   // slides[prev].classList.add("prev");
   // slides[next].classList.add("next");
   // slides[prev2].classList.add("prev-2");
   // slides[next2].classList.add("next-2");

}


const handleWheel = (ev) => {

   if (ev.deltaY>0)
      gotoNext()
   else
      gotoPrev()
}
window.addEventListener("wheel", handleWheel)