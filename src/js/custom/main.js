const topText = document.querySelector('#topText');
const bottomText = document.querySelector('#textBottom');
const file = document.querySelector('#file');

window.topText = '';
window.bottomText = '';


function fileReader(e) {
   const file = e.target.files[0];


   const reader = new FileReader();
   reader.onload = function(fileObject) {
      const data = fileObject.target.result;


      const image = new Image();
      image.onload = function() {
         window.imageSrc = this;
         drawMeme(window.imageSrc, window.topText, window.bottomText);
      };

      image.src = data;

   };

   reader.readAsDataURL(file);
}

topText.oninput = textChange;
bottomText.oninput = textChange;


document.querySelector('#file').addEventListener('change', fileReader);

function drawMeme(image, topText, bottomText) {
   const canvas = document.querySelector('#canvas');
   const ctx = canvas.getContext('2d');

   ctx.clearRect(0, 0, canvas.width, canvas.height);


   ctx.drawImage(image, 0, 0, 500, 600);

   ctx.textAlign = 'center';
   ctx.strokeStyle = 'black';
   ctx.fillStyle = 'white';
   ctx.lineWidth = 6;


   if (topText.length < 15) {
      ctx.font = '60px impact';
   } else if (topText.length < 23) {
      ctx.font = '40px impact';
   } else {
      ctx.font = '20px impact';
   }
   ctx.textBaseline = 'top';
   ctx.strokeText(topText, 250, 10);
   ctx.fillText(topText, 250, 10);

   if (bottomText.length < 15) {
      ctx.font = '60px impact';
   } else if (bottomText.length < 23) {
      ctx.font = '40px impact';
   } else {
      ctx.font = '20px impact';
   }
   ctx.textBaseline = 'bottom';
   ctx.strokeText(bottomText, 250, 530);
   ctx.fillText(bottomText, 250, 530);
}
function textChange(e) {
   const id = e.target.id;
   const text = e.target.value;


   if (id == 'topText') {
      window.topText = text;
   } else {
      window.bottomText = text;
   }
   drawMeme(window.imageSrc, window.topText, window.bottomText);
}
const saveBtn = document.querySelector('#saveBtn');
saveBtn.addEventListener('click', function() {
   window.open(document.querySelector('canvas').toDataURL());
});
