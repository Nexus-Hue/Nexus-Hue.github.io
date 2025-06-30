"use strict";

// ----- IMAGE COMPARISON SLIDER ----- //
document.querySelectorAll(".compare").forEach(($compare) => {
    const $input = $compare.querySelector("input");
    const $mask = $compare.querySelector(".compare__mask");

    // initial mask width
    $compare.style.setProperty("--mask-width", `${$input.value}%`);
    $mask.style.width = `${$input.value}%`;

    // Update mask width on input
    $input.addEventListener("input", () => {
        $compare.style.setProperty("--mask-width", `${$input.value}%`);
        $mask.style.width = `${$input.value}%`;
    });
});

// ----- DEBUG TYPE SHIH ----- //
document.querySelectorAll(".toggle-debug").forEach(($toggleDebug) => {
    $toggleDebug.addEventListener("click", () => {
        document.body.classList.toggle("debug");
    });
});
