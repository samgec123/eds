export default function decorate(block) {
    const carousel = document.createElement('div');
    carousel.id = 'carouselExampleCaptions';
    carousel.className = 'carousel slide';
    carousel.setAttribute('data-bs-ride', 'carousel');

    const indicators = document.createElement('div');
    indicators.className = 'carousel-indicators';

    const inner = document.createElement('div');
    inner.className = 'carousel-inner';

    const slides = [...block.children];
    slides.forEach((slide, index) => {
        const indicator = document.createElement('button');
        indicator.type = 'button';
        indicator.setAttribute('data-bs-target', '#carouselExampleCaptions');
        indicator.setAttribute('data-bs-slide-to', index);
        indicator.setAttribute('aria-label', `Slide ${index + 1}`);
        if (index === 0) {
            indicator.className = 'active';
            indicator.setAttribute('aria-current', 'true');
        }
        indicators.appendChild(indicator);

        const item = document.createElement('div');
        item.className = `carousel-item${index === 0 ? ' active' : ''}`;

        const img = slide.querySelector('img');
        if (img) {
            img.className = 'd-block w-100';
            item.appendChild(img);
        }

        const caption = document.createElement('div');
        caption.className = 'carousel-caption d-none d-md-block';

        const title = slide.querySelector('div > p');
        if (title) {
            const h5 = document.createElement('h5');
            h5.textContent = title.textContent;
            caption.appendChild(h5);
        }

        const descriptions = slide.querySelectorAll('div:nth-child(2) > p');
        descriptions.forEach((desc) => {
            const p = document.createElement('p');
            p.textContent = desc.textContent;
            caption.appendChild(p);
        });

        item.appendChild(caption);
        inner.appendChild(item);
    });

    carousel.appendChild(indicators);
    carousel.appendChild(inner);

    const prevButton = document.createElement('button');
    prevButton.className = 'carousel-control-prev';
    prevButton.type = 'button';
    prevButton.setAttribute('data-bs-target', '#carouselExampleCaptions');
    prevButton.setAttribute('data-bs-slide', 'prev');
    prevButton.innerHTML = `
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
    `;
    carousel.appendChild(prevButton);

    const nextButton = document.createElement('button');
    nextButton.className = 'carousel-control-next';
    nextButton.type = 'button';
    nextButton.setAttribute('data-bs-target', '#carouselExampleCaptions');
    nextButton.setAttribute('data-bs-slide', 'next');
    nextButton.innerHTML = `
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
    `;
    carousel.appendChild(nextButton);

    block.textContent = '';
    block.appendChild(carousel);
}