import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  [...block.children].forEach((row) => {
    const containerDiv = document.createElement('div');
    moveInstrumentation(row, containerDiv);
    while (row.firstElementChild) containerDiv.append(row.firstElementChild);
    [...containerDiv.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) {
        const pictureDiv = document.createElement('div');
        pictureDiv.append(div.querySelector('picture'));
        div.className = 'quote-image';
        div.append(pictureDiv);
      } else {
        const textDiv = document.createElement('div');
        textDiv.append(div);
        div.className = 'quote-body';
        div.append(textDiv);
      }
    });
    block.append(containerDiv);
  });
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}