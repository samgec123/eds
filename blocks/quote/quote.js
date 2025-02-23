import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const containerDiv = document.createElement('div');
  containerDiv.className = 'container text-center';

  const rowDiv = document.createElement('div');
  rowDiv.className = 'row';

  const imageColDiv = document.createElement('div');
  imageColDiv.className = 'col';

  const textColDiv = document.createElement('div');
  textColDiv.className = 'col';

  const { children } = block;
  const image = children[0];
  const text = children[1];

  if (image) {
    const pictureDiv = document.createElement('div');
    pictureDiv.append(image.querySelector('picture'));
    imageColDiv.append(pictureDiv);
  }

  if (text) {
    const textDiv = document.createElement('div');
    textDiv.append(text.querySelector('p'));
    textColDiv.append(textDiv);
  }

  rowDiv.append(imageColDiv);
  rowDiv.append(textColDiv);
  containerDiv.append(rowDiv);

  block.textContent = '';
  block.append(containerDiv);

  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}