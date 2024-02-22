export class SimpleSlider {
  constructor(selector, options = {}) {
    this.container = document
      .querySelector(selector)
      .querySelector(".slider-container");

    this.options = options; // options - объект с пользовательскими настройками
    this.options.typeSlider = options.typeSlider || "default";

    this.currentIndex = 0; // currentIndex - индекс активного слайда.
    this.init();
  }

  init() {
    this.slides = Array.from(this.container.children); // Все слайды внутри контейнера

    this.createNavigationButtons();
    this.createIndicators();

    this.updateActiveSlide();
  }

  updateActiveSlide() {
    this.slides.forEach((slide) => slide.classList.remove("active")); // Деактивируем все слайды
    this.slides[this.currentIndex].classList.add("active"); // Активируем текущий слайд

    if (this.options.typeSlider !== "type9") {
      this.updateIndicators();
    }
  }

  // КНОПКИ ПЕРЕХОДА <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
  createNavigationButtons() {
    switch (this.options.typeSlider) {
      case "type1":
        // КНОПКА "НАЗАД". <-
        this.prevButton = document.createElement("button");
        this.prevButton.classList.add("prev");
        // КНОПКА "ВПЕРЕД". ->
        this.nextButton = document.createElement("button");
        this.nextButton.classList.add("next");
        break;
      case "type8":
        this.prevButton = document.createElement("button");
        this.prevButton.classList.add("prev-bottom");

        this.nextButton = document.createElement("button");
        this.nextButton.classList.add("next-bottom");
        break;

      case "type9":
        this.buttonsWrapper = document.createElement("div");
        this.buttonsWrapper.classList.add("buttons-wrapper");

        this.prevButton = document.createElement("button");
        this.prevButton.classList.add("prev-center");
        // КНОПКА "НАЗАД". <-
        this.nextButton = document.createElement("button");
        this.nextButton.classList.add("next-center");

        this.buttonsWrapper.appendChild(this.prevButton);
        this.buttonsWrapper.appendChild(this.nextButton);

        this.container.appendChild(this.buttonsWrapper);
        break;
      default:
        return;
    }

    this.prevButton.addEventListener("click", () => this.prev());
    this.nextButton.addEventListener("click", () => this.next());

    if (this.options.typeSlider !== "type9") {
      this.container.appendChild(this.prevButton);
      this.container.appendChild(this.nextButton);
    }
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
    if (this.options.typeSlider && this.options.typeSlider !== "type9") {
      this.indicatorsContainer =
        this.container.querySelector(".slider-indicators") ||
        this.createIndicatorsContainer();

      this.indicatorsContainer.innerHTML = "";

      this.slides.forEach((_, index) => {
        const indicator = document.createElement("div");
        indicator.className = "indicator";

        if (this.options.typeSlider === "type2") {
          indicator.classList.add("indicator-numbered");
        }

        if (this.options.typeSlider === "type3") {
          this.indicatorsContainer.classList.add(
            "slider-indicators-highlighted"
          );
          indicator.classList.add("indicator-highlighted");
        }

        if (this.options.typeSlider === "type4") {
          indicator.classList.add("indicator-active-point-wide");
        }

        if (this.options.typeSlider === "type5") {
          this.indicatorsContainer.classList.add(
            "slider-indicators-active-point-wide"
          );
          indicator.classList.add("indicator-active-point-wide");
        }

        if (this.options.typeSlider === "type6") {
          this.indicatorsContainer.classList.add("slider-indicators-linear");
          indicator.classList.add("indicator-linear");
        }

        if (this.options.typeSlider === "type7") {
          this.indicatorsContainer.classList.add("slider-indicators-linear");
          indicator.classList.add("indicator-active-linear-wide");
        }

        if (this.options.typeSlider === "type8") {
          indicator.classList.add("indicator-small-points");
        }

        indicator.addEventListener("click", () => this.goToSlide(index));

        this.indicatorsContainer.appendChild(indicator);

        this.updateIndicators();
      });
    }
  }

  updateIndicators() {
    const indicators = this.indicatorsContainer.querySelectorAll(".indicator");
    indicators.forEach((indicator, index) => {
      indicator.textContent = "";
      indicator.classList.toggle("active", index === this.currentIndex);

      if (this.options.typeSlider === "type2" && index === this.currentIndex) {
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
