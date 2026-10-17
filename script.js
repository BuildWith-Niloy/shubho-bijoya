
(() => {
  "use strict";

  const params = new URLSearchParams(window.location.search);
  const queryRecipient = (params.get("to") || "").trim();
  const activeRecipient = queryRecipient || "x";

  const lineEls = Array.from(
    document.querySelectorAll(".typed-line")
  );

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  function wishLines(name) {
    return [
      `Dear ${name},`,
      "— ❀ —",
      "May ma durga bless you with more than you deserve,",
      "better than you expected, and sooner than you imagined.",
      `shubho bijoya ${name}`,
      "yours outtaleague niki."
    ];
  }

  const pause = ms =>
    new Promise(resolve => window.setTimeout(resolve, ms));

  async function typeWish() {
    const lines = wishLines(activeRecipient);

    if (!lineEls.length) {
      console.error("Greeting elements were not found.");
      return;
    }

    lineEls.forEach(line => {
      const text = line.querySelector(".typed-text");
      const cursor = line.querySelector(".cursor");

      if (text) text.textContent = "";
      if (cursor) cursor.classList.add("hidden");
    });

    if (reducedMotion) {
      lineEls.forEach((line, index) => {
        const text = line.querySelector(".typed-text");
        if (text) text.textContent = lines[index] || "";
      });
      return;
    }

    for (let i = 0; i < lines.length && i < lineEls.length; i++) {
      const line = lineEls[i];
      const text = line.querySelector(".typed-text");
      const cursor = line.querySelector(".cursor");

      if (!text) continue;
      if (cursor) cursor.classList.remove("hidden");

      for (const character of lines[i]) {
        text.textContent += character;
        await pause(
          character === "," || character === "." ? 105 : 25
        );
      }

      if (cursor) cursor.classList.add("hidden");

      if (i + 1 < lines.length && i + 1 < lineEls.length) {
        const nextCursor = lineEls[i + 1].querySelector(".cursor");
        if (nextCursor) nextCursor.classList.remove("hidden");

        await pause(i === 1 ? 220 : 160);
      }
    }
  }

  // Falling flower petals
  const petalLayer = document.getElementById("petalLayer");

  if (petalLayer) {
    const flowerGlyphs = ["✿", "❀", "✽", "✾", "❁"];
    const petalColors = [
      "#a92e22", "#cd633b", "#d99a45",
      "#f4dfb8", "#ba4a31", "#e5b85f"
    ];

    const petalCount = reducedMotion
      ? 0
      : window.innerWidth < 650 ? 13 : 22;

    for (let i = 0; i < petalCount; i++) {
      const petal = document.createElement("span");

      petal.className = "petal";
      petal.setAttribute("aria-hidden", "true");

      petal.textContent =
        flowerGlyphs[Math.floor(Math.random() * flowerGlyphs.length)];

      petal.style.left = `${Math.random() * 100}%`;

      petal.style.setProperty(
        "--petal-color",
        petalColors[Math.floor(Math.random() * petalColors.length)]
      );

      petal.style.setProperty(
        "--duration",
        `${9 + Math.random() * 12}s`
      );

      petal.style.setProperty(
        "--delay",
        `${-Math.random() * 18}s`
      );

      petal.style.setProperty(
        "--drift",
        `${-80 + Math.random() * 160}px`
      );

      petal.style.setProperty(
        "--petal-opacity",
        `${0.28 + Math.random() * 0.45}`
      );

      petal.style.fontSize = `${13 + Math.random() * 17}px`;

      petalLayer.appendChild(petal);
    }
  }

  // Start the greeting animation
  typeWish();
})();
