const dialog=document.querySelector('#image-dialog');
fetch('https://api.github.com/repos/tujiaw/ntscreenshot',{signal:AbortSignal.timeout(6500)}).then(response=>{if(!response.ok)throw Error('GitHub unavailable');return response.json()}).then(repo=>{if(!Number.isSafeInteger(repo.stargazers_count)||repo.stargazers_count<0)return;document.querySelectorAll('.star-count').forEach(count=>{count.textContent=new Intl.NumberFormat('en-US').format(repo.stargazers_count);count.hidden=false;count.setAttribute('aria-label',`${repo.stargazers_count} stars`)});}).catch(()=>{});
const story=document.querySelector('.product-story');
const slideButtons=[...document.querySelectorAll('[data-slide]')];
const prev=document.querySelector('#slide-prev'),next=document.querySelector('#slide-next');
let activeSlide=0;
function reflectSlide(index){activeSlide=index;slideButtons.forEach((button,i)=>button.setAttribute('aria-pressed',String(i===index)));prev.disabled=false;next.disabled=false;document.querySelector('#slide-count').textContent=`${String(index+1).padStart(2,'0')} / 04`;}
function goToSlide(index){index=(index+slideButtons.length)%slideButtons.length;const wrapping=activeSlide===slideButtons.length-1&&index===0;reflectSlide(index);story.scrollTo({left:index*story.clientWidth,behavior:wrapping||matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});scheduleRotation();}
slideButtons.forEach((button,index)=>button.addEventListener('click',()=>goToSlide(index)));
prev.addEventListener('click',()=>goToSlide(activeSlide-1));next.addEventListener('click',()=>goToSlide(activeSlide+1));
let scrollTimer;
story.addEventListener('scroll',()=>{clearTimeout(scrollTimer);scrollTimer=setTimeout(()=>reflectSlide(Math.max(0,Math.min(slideButtons.length-1,Math.round(story.scrollLeft/story.clientWidth)))),150);},{passive:true});
window.addEventListener('resize',()=>{story.scrollTo({left:activeSlide*story.clientWidth,behavior:'instant'});});
const rotationButton=document.querySelector('#slide-rotation');
const motionPreference=matchMedia('(prefers-reduced-motion: reduce)');
let rotationPaused=motionPreference.matches,keyboardPaused=false,inView=false,rotationTimer;
function scheduleRotation(){clearTimeout(rotationTimer);if(rotationPaused||keyboardPaused||!inView||document.hidden||dialog.open)return;rotationTimer=setTimeout(()=>goToSlide(activeSlide+1),3000);}
function updateRotationButton(){rotationButton.textContent=rotationPaused?'播放':'暂停';rotationButton.setAttribute('aria-label',rotationPaused?'开始自动切换产品界面':'暂停自动切换产品界面');rotationButton.setAttribute('aria-pressed',String(!rotationPaused));scheduleRotation();}
rotationButton.addEventListener('click',()=>{rotationPaused=!rotationPaused;updateRotationButton();});
const showcase=document.querySelector('.features');
showcase.addEventListener('focusin',event=>{keyboardPaused=event.target.matches(':focus-visible');scheduleRotation();});
showcase.addEventListener('focusout',event=>{if(!showcase.contains(event.relatedTarget)){keyboardPaused=false;scheduleRotation();}});
new IntersectionObserver(entries=>{inView=entries[0].isIntersecting;scheduleRotation();},{threshold:.15}).observe(story);
document.addEventListener('visibilitychange',scheduleRotation);
dialog.addEventListener('close',scheduleRotation);
motionPreference.addEventListener('change',event=>{rotationPaused=event.matches;updateRotationButton();});
reflectSlide(activeSlide);updateRotationButton();
document.querySelectorAll('[data-image-open]').forEach(button=>button.addEventListener('click',()=>{const source=button.querySelector('img');document.querySelector('#dialog-image').src=source.src;document.querySelector('#dialog-image').alt=source.alt;document.querySelector('#dialog-caption').textContent=button.dataset.caption||source.alt;dialog.showModal();scheduleRotation()}));
document.querySelector('#dialog-close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close()}});
