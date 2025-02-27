
export default function decorate(block) {
  const slidesData = [
    {
      imgSrc: "path/to/image1.jpg",
      title: "First slide label",
      description: "Some representative placeholder content for the first slide."
    },
    {
      imgSrc: "path/to/image2.jpg",
      title: "Second slide label",
      description: "Some representative placeholder content for the second slide."
    },
    {
      imgSrc: "path/to/image3.jpg",
      title: "Third slide label",
      description: "Some representative placeholder content for the third slide."
    }
  ];

  // Create the carousel container
  const carousel = document.createElement('div');
  carousel.id = 'carouselExampleCaptions';
  carousel.classList.add('carousel', 'slide');

  // Create the carousel indicators
  const indicators = document.createElement('div');
  indicators.classList.add('carousel-indicators');

  // Loop through slidesData to create indicators dynamically
  slidesData.forEach((slide, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.setAttribute('data-bs-target', '#carouselExampleCaptions');
    button.setAttribute('data-bs-slide-to', index.toString());
    button.setAttribute('aria-label', `Slide ${index + 1}`);
    if (index === 0) button.classList.add('active');
    indicators.appendChild(button);
  });

  // Create the carousel-inner container
  const inner = document.createElement('div');
  inner.classList.add('carousel-inner');

  // Loop through slidesData to create carousel items
  slidesData.forEach((slide, index) => {
    const item = document.createElement('div');
    item.classList.add('carousel-item');
    if (index === 0) item.classList.add('active');

    const img = document.createElement('img');
    img.src = slide.imgSrc;
    img.classList.add('d-block', 'w-100');
    img.alt = `Slide ${index + 1}`;

    const caption = document.createElement('div');
    caption.classList.add('carousel-caption', 'd-none', 'd-md-block');

    const h5 = document.createElement('h5');
    h5.textContent = slide.title;

    const p = document.createElement('p');
    p.textContent = slide.description;

    caption.appendChild(h5);
    caption.appendChild(p);
    item.appendChild(img);
    item.appendChild(caption);

    inner.appendChild(item);
  });

  // Create the carousel control buttons
  const prevButton = document.createElement('button');
  prevButton.classList.add('carousel-control-prev');
  prevButton.type = 'button';
  prevButton.setAttribute('data-bs-target', '#carouselExampleCaptions');
  prevButton.setAttribute('data-bs-slide', 'prev');

  const prevIcon = document.createElement('span');
  prevIcon.classList.add('carousel-control-prev-icon');
  prevIcon.setAttribute('aria-hidden', 'true');
  const prevText = document.createElement('span');
  prevText.classList.add('visually-hidden');
  prevText.textContent = 'Previous';

  prevButton.appendChild(prevIcon);
  prevButton.appendChild(prevText);

  const nextButton = document.createElement('button');
  nextButton.classList.add('carousel-control-next');
  nextButton.type = 'button';
  nextButton.setAttribute('data-bs-target', '#carouselExampleCaptions');
  nextButton.setAttribute('data-bs-slide', 'next');

  const nextIcon = document.createElement('span');
  nextIcon.classList.add('carousel-control-next-icon');
  nextIcon.setAttribute('aria-hidden', 'true');
  const nextText = document.createElement('span');
  nextText.classList.add('visually-hidden');
  nextText.textContent = 'Next';

  nextButton.appendChild(nextIcon);
  nextButton.appendChild(nextText);

  // Append all parts to the main carousel container
  carousel.appendChild(indicators);
  carousel.appendChild(inner);
  carousel.appendChild(prevButton);
  carousel.appendChild(nextButton);

  block.append(carousel);
}
