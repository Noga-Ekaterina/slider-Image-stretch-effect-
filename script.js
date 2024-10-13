let slides = document.querySelectorAll(window.innerWidth<=640?".slider__item" :".slider__item.desktop");
const slider=document.querySelector(".slider__vrapp")

let current = 0;
let pause = false; // Флаг для отслеживания движения
let touchStartY=0

window.addEventListener("resize", ()=>{
   slides = document.querySelectorAll(window.innerWidth<=640?".slider__item" :".slider__item.desktop");
})
window.addEventListener("touchstart", ev => {
   touchStartY= ev.touches[0].clientY
   console.log('touch start')
})

document.addEventListener('DOMContentLoaded',()=>{
   gotoNum(current);
});

const gotoPrev = () => current > 0 && gotoNum(current - 1);

const gotoNext = () => current < slides.length - 1 && gotoNum(current + 1);

const gotoNum = number => {
   if (pause) return
   else
      current = number;
   const resizeSlides = (dir) => {
      const averageSlide= slides[dir=="botton"? current+1:current-1]
      const size= slides[slides.length-1].clientHeight

      if (dir=="botton"){
         averageSlide.nextElementSibling.classList.add("small")
      }else
         averageSlide.previousElementSibling.classList.add("small")

      averageSlide.classList.add("average")
   }

   for (let i =
       0; i < slides.length; i++) {
      slides[i].classList.remove("active");
      slides[i].classList.remove("prev");
      slides[i].classList.remove("next");
      slides[i].classList.remove("small");
      slides[i].classList.remove("average");
      slides[i].style.height=""
      slides[i].style.maxHeight=""
   }

   touchStartY=undefined
   pause=true

   // window.removeEventListener("wheel", handleWheel)
   // window.removeEventListener("touchmove", handleTouchMove)
   setTimeout(()=>{
      // window.addEventListener("wheel", handleWheel)
      // window.addEventListener("touchmove", handleTouchMove)
      pause=false
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
   console.log(pause)
   if (pause) return;

   if (ev.deltaY>0)
      gotoNext()
   else
      gotoPrev()
}
window.addEventListener("wheel", handleWheel)

const handleTouchMove = (ev) => {
  const touchMoveY= ev.touches[0].clientY

   if (touchMoveY<touchStartY)
      gotoNext()
   else if (touchMoveY>touchStartY)
      gotoPrev()
}

window.addEventListener("touchmove", handleTouchMove);
window.addEventListener("touchend", handleTouchEnd)