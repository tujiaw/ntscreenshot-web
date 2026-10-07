const dialog=document.querySelector('#image-dialog');
const story=document.querySelector('.product-story');
const slideButtons=[...document.querySelectorAll('[data-slide]')];
const prev=document.querySelector('#slide-prev'),next=document.querySelector('#slide-next');
let activeSlide=0;
function reflectSlide(index){activeSlide=index;slideButtons.forEach((button,i)=>button.setAttribute('aria-pressed',String(i===index)));prev.disabled=index===0;next.disabled=index===slideButtons.length-1;document.querySelector('#slide-count').textContent=`${String(index+1).padStart(2,'0')} / 04`;}
function goToSlide(index){index=Math.max(0,Math.min(slideButtons.length-1,index));reflectSlide(index);story.scrollTo({left:index*story.clientWidth,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});}
slideButtons.forEach((button,index)=>button.addEventListener('click',()=>goToSlide(index)));
prev.addEventListener('click',()=>goToSlide(activeSlide-1));next.addEventListener('click',()=>goToSlide(activeSlide+1));
let scrollTimer;
story.addEventListener('scroll',()=>{clearTimeout(scrollTimer);scrollTimer=setTimeout(()=>reflectSlide(Math.max(0,Math.min(slideButtons.length-1,Math.round(story.scrollLeft/story.clientWidth)))),150);},{passive:true});
window.addEventListener('resize',()=>{story.scrollTo({left:activeSlide*story.clientWidth,behavior:'instant'});});
document.querySelectorAll('[data-image-open]').forEach(button=>button.addEventListener('click',()=>{const source=button.querySelector('img');document.querySelector('#dialog-image').src=source.src;document.querySelector('#dialog-image').alt=source.alt;document.querySelector('#dialog-caption').textContent=button.dataset.caption||source.alt;dialog.showModal()}));
document.querySelector('#dialog-close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close()}});
