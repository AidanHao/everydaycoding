let clientHight = window.innerHeight;

function lazyLoad(){
  let imgs = document.querySelectorAll('img[data-original]');
  Array.from(imgs).forEach((el)=>{
    let rect = el.getBoundingClientRect();
    if(rect.top < clientHight){
      let image = new Image();
      image.src = el.dataset.original;
      image.onload(()=>{
        el.src = image.src;
      })
      el.removeAttribute('data-original');
    }
  });
}

lazyLoad();

document.addEventListener('scroll', lazyLoad);