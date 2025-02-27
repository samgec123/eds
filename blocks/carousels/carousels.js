import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';
/* this is carousel block */
export default function decorate(block) {
  const carouselId = 'carouselExampleCaptions';
  const carousel = document.createElement('div');
  carousel.id = carouselId;
  carousel.className = 'carousel slide';

  const indicators = document.createElement('div');
  indicators.className = 'carousel-indicators';

  const inner = document.createElement('div');
  inner.className = 'carousel-inner';

  [...block.children].forEach((slide, index) => {
    const isActive = index === 0 ? 'active' : '';

    const indicator = document.createElement('button');
    indicator.type = 'button';
    indicator.dataset.bsTarget = `#${carouselId}`;
    indicator.dataset.bsSlideTo = index;
    indicator.className = isActive;
    indicator.ariaLabel = `Slide ${index + 1}`;
    if (isActive) {
      indicator.ariaCurrent = 'true';
    }
    indicators.append(indicator);

    const item = document.createElement('div');
    item.className = `carousel-item ${isActive}`;

    const imgDiv = slide.querySelector('picture');
    if (imgDiv) {
      const img = imgDiv.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      item.append(optimizedPic);
    }

    const caption = document.createElement('div');
    caption.className = 'carousel-caption d-none d-md-block';

    const title = slide.querySelector('div > p');
    if (title) {
      const h5 = document.createElement('h5');
      h5.textContent = title.textContent;
      caption.append(h5);
    }

    const description = slide.querySelectorAll('div > p')[1];
    if (description) {
      const p = document.createElement('p');
      p.textContent = description.textContent;
      caption.append(p);
    }

    item.append(caption);
    inner.append(item);
  });

  carousel.append(indicators);
  carousel.append(inner);

  const prevButton = document.createElement('button');
  prevButton.className = 'carousel-control-prev';
  prevButton.type = 'button';
  prevButton.dataset.bsTarget = `#${carouselId}`;
  prevButton.dataset.bsSlide = 'prev';
  prevButton.innerHTML = `
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  `;
  carousel.append(prevButton);

  const nextButton = document.createElement('button');
  nextButton.className = 'carousel-control-next';
  nextButton.type = 'button';
  nextButton.dataset.bsTarget = `#${carouselId}`;
  nextButton.dataset.bsSlide = 'next';
  nextButton.innerHTML = `
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  `;
  carousel.append(nextButton);

  block.textContent = '';
  block.append(carousel);
}
