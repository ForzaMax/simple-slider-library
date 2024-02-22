import { SimpleSlider } from "./slider.js";

document.addEventListener("DOMContentLoaded", function () {
  const mySlider = new SimpleSlider("#mySlider", {
    typeSlider: "type1",
    containerWidth: "480px",
    containerHeight: "360px",

    // navigation: true, // Включаем кнопки навигации
    // // navigationType: "arrowsBottom",
    // indicators: true, // Включаем индикаторы
    // indicatorsType: "activePointWideOne",
  });

  const mySlide = new SimpleSlider("#mySlide", {
    typeSlider: "type2",
    containerWidth: "600px",
    containerHeight: "360px",
  });
});

// ИНДИКАТОРЫ activePointWideOne, activePointWideTwo, default, numbered, highlighted, linear, activeLinearWide, smallPoints
// КНОПКИ НАВИГАЦИИ  default, arrowsBottom
