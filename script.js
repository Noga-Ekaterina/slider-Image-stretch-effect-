const slides = document.querySelectorAll(".slide");


let current = 0;
let prev;
let next;
let prev2;
let next2;
document.addEventListener('DOMContentLoaded',()=>{
   gotoNum(current);
});

const gotoPrev = () => current > 0 ? gotoNum(current - 1) : gotoNum(slides.length - 1);

const gotoNext = () => current < slides.length - 1 ? gotoNum(current + 1) : gotoNum(0);

const gotoNum = number => {
   current = number;
   prev = current - 1;
   next = current + 1;
   prev2 = current - 2;
   next2 = current + 2;

   for (let i = 0; i < slides.length; i++) {
      slides[i].classList.remove("active");
      slides[i].classList.remove("prev");
      slides[i].classList.remove("next");
      slides[i].classList.remove("prev-2");
      slides[i].classList.remove("next-2");
   }

   if (next == slides.length) {
      next = 0;
   }

   if (next2 >= slides.length -1) {
      next2 = next+1
   }

   if (prev == -1) {
      prev = slides.length - 1;
   }

   if (prev2 <= -1) {
      prev2 = prev!=0? prev-1 :slides.length-1;
   }

   console.log("p-" + prev + ", n-" + next + ", p2-" + prev2 + ", n2-" + next2);
   window.removeEventListener("wheel", handleWheel)
   setTimeout(()=>{
      window.addEventListener("wheel", handleWheel)
   }, 500)

   slides[current].classList.add("active");
   slides[prev].classList.add("prev");
   slides[next].classList.add("next");
   slides[prev2].classList.add("prev-2");
   slides[next2].classList.add("next-2");

}

const handleWheel = (ev) => {

   if (ev.deltaY>0)
      gotoNext()
   else
      gotoPrev()
}
window.addEventListener("wheel", handleWheel)