import { SimpleSlider } from "./slider.js";

document.addEventListener("DOMContentLoaded", function () {
  const mySlider = new SimpleSlider("#mySlider", {
    navigation: true, // Включаем кнопки навигации
    indicators: true, // Включаем индикаторы
    indicatorsType: "highlighted",
  });
});

// activePointWideOne, activePointWideTwo, default, numbered, highlighted
