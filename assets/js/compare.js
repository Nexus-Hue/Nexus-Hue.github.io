"use strict";
// ----- IMAGE COMPARISON SLIDER ----- //
const $compare = document.querySelector(".compare");
const $input = document.querySelector(".compare input");
$input.addEventListener("input", () => {
    $compare.style.setProperty("--mask-width", `${$input.value}%`);
});
$compare.style.setProperty("--mask-width", `${$input.value}%`);
// ----- DEBUG STUFF ----- //
const $toggleDebug = document.querySelector(".toggle-debug");
const removeOverflow = () => {
    $compare.style.removeProperty("overflow");
};
$toggleDebug.addEventListener("click", () => {
    document.body.classList.toggle("debug");
});