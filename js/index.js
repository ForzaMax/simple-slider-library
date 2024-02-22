import { SimpleSlider } from "./slider.js";

document.addEventListener("DOMContentLoaded", function () {
  const mySlider = new SimpleSlider("#mySlider", {
    // navigation: true, // Включаем кнопки навигации
    // // navigationType: "arrowsBottom",
    // indicators: true, // Включаем индикаторы
    // indicatorsType: "activePointWideOne",
    typeSlider: "type7",
  });
});

// ИНДИКАТОРЫ activePointWideOne, activePointWideTwo, default, numbered, highlighted, linear, activeLinearWide, smallPoints

// КНОПКИ НАВИГАЦИИ  default, arrowsBottom
