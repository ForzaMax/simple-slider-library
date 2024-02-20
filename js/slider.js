export class SimpleSlider {
  constructor(selector, options = {}) {
    this.container = document
      .querySelector(selector)
      .querySelector(".slider-container");

    this.options = options; // options - объект с пользовательскими настройками
    this.options.indicatorsType = options.indicatorsType || "default";

    this.currentIndex = 0; // currentIndex - индекс активного слайда.
    this.init();
  }

  init() {
    this.slides = Array.from(this.container.children); // Все слайды внутри контейнера

    // ЕСЛИ В OPTIONS "navigation: true", ТО ПОЯВЛЯЮТСЯ КНОПКИ НАВИГАЦИИ
    if (this.options.navigation) {
      this.createNavigationButtons();
    }

    // ЕСЛИ В OPTIONS "indicators: true", ТО ПОЯВЛЯЕТСЯ ПАГИНАЦИЯ
    if (this.options.indicators) {
      this.createIndicators();
    }

    this.updateActiveSlide();
  }

  updateActiveSlide() {
    this.slides.forEach((slide) => slide.classList.remove("active")); // Деактивируем все слайды
    this.slides[this.currentIndex].classList.add("active"); // Активируем текущий слайд

    // Обновляем индикаторы
    // const indicators = this.indicatorsContainer.querySelectorAll(".indicator");
    // indicators.forEach((indicator, index) => {
    //   indicator.classList.toggle("active", index === this.currentIndex);
    // });
    this.updateIndicators();
  }

  // КНОПКИ ПЕРЕХОДА <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
  createNavigationButtons() {
    // КНОПКА "НАЗАД". <-
    this.prevButton = document.createElement("button");
    this.prevButton.classList.add("prev");
    // this.prevButton.textContent = "<";
    this.prevButton.addEventListener("click", () => this.prev());
    this.container.appendChild(this.prevButton);

    // КНОПКА "ВПЕРЕД". ->
    this.nextButton = document.createElement("button");
    this.nextButton.classList.add("next");
    // this.nextButton.textContent = ">";
    this.nextButton.addEventListener("click", () => this.next());
    this.container.appendChild(this.nextButton);
  }

  prev() {
    // "НАЗАД". <-
    if (this.currentIndex === 0) {
      this.currentIndex = this.slides.length - 1;
    } else {
      this.currentIndex--;
    }
    this.updateActiveSlide();
  }

  next() {
    // "ВПЕРЕД". ->
    this.currentIndex = (this.currentIndex + 1) % this.slides.length; // Что б возвращаться к нулевому индексу
    this.updateActiveSlide();
  }

  // ПАГИНАЦИЯ <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

  createIndicators() {
    this.indicatorsContainer =
      this.container.querySelector(".slider-indicators") ||
      this.createIndicatorsContainer();

    this.indicatorsContainer.innerHTML = "";

    this.slides.forEach((_, index) => {
      const indicator = document.createElement("div");
      indicator.className = "indicator";

      if (this.options.indicatorsType === "numbered") {
        indicator.classList.add("indicator-numbered");
      }

      if (this.options.indicatorsType === "highlighted") {
        this.indicatorsContainer.classList.add("slider-indicators-highlighted");
        indicator.classList.add("indicator-highlighted");
      }

      if (this.options.indicatorsType === "activePointWideOne") {
        indicator.classList.add("indicator-active-point-wide");
      }

      if (this.options.indicatorsType === "activePointWideTwo") {
        this.indicatorsContainer.classList.add(
          "slider-indicators-active-point-wide"
        );
        indicator.classList.add("indicator-active-point-wide");
      }

      indicator.addEventListener("click", () => this.goToSlide(index));

      this.indicatorsContainer.appendChild(indicator);
    });

    this.updateIndicators();
  }

  updateIndicators() {
    const indicators = this.indicatorsContainer.querySelectorAll(".indicator");
    indicators.forEach((indicator, index) => {
      indicator.textContent = "";
      indicator.classList.toggle("active", index === this.currentIndex);

      //ЕСЛИ ТИП "NUMBERED"
      if (
        this.options.indicatorsType === "numbered" &&
        index === this.currentIndex
      ) {
        indicator.textContent = index + 1;
      }
    });
  }

  createIndicatorsContainer() {
    const indicatorsDiv = document.createElement("div");
    indicatorsDiv.className = "slider-indicators";
    this.container.appendChild(indicatorsDiv);
    return indicatorsDiv;
  }

  goToSlide(index) {
    this.currentIndex = index;
    this.updateActiveSlide();
  }
}
