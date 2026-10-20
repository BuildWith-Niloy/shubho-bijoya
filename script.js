(() => {
  "use strict";

  // Your Instagram handle and profile link
  const INSTA_HANDLE = "outtaleague_niki";
  const INSTA_URL = "https://www.instagram.com/outtaleague_niki/";

  // Read the recipient's name from ?to=username
  const params = new URLSearchParams(window.location.search);
  const recipient = (params.get("to") || "").trim() || "x";

  const lineEls = Array.from(
    document.querySelectorAll(".typed-line")
  );

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  // Keep the blinking eyes lined up with the existing background illustration.
  const eyeLayer = document.getElementById("eyeBlinkLayer");
  const greetingPage = document.querySelector(".greeting-page");

  function positionEyeLayer() {
    if (!eyeLayer || !greetingPage) return;

    const bounds = greetingPage.getBoundingClientRect();
    const styles = window.getComputedStyle(greetingPage);
    const imageWidth = 1536;
    const imageHeight = 1024;
    const backgroundSize = styles.backgroundSize.split(",").pop().trim();
    const sizeParts = backgroundSize.split(/\s+/);
    let width;
    let height;

    if (backgroundSize === "cover" || backgroundSize === "contain") {
      const scale = backgroundSize === "cover"
        ? Math.max(bounds.width / imageWidth, bounds.height / imageHeight)
        : Math.min(bounds.width / imageWidth, bounds.height / imageHeight);
      width = imageWidth * scale;
      height = imageHeight * scale;
    } else {
      const sizeValue = value => value === "auto" ? null : Number.parseFloat(value);
      const specifiedWidth = sizeValue(sizeParts[0]);
      const specifiedHeight = sizeValue(sizeParts[1]);

      if (specifiedWidth !== null && specifiedHeight !== null) {
        width = specifiedWidth;
        height = specifiedHeight;
      } else if (specifiedWidth !== null) {
        width = specifiedWidth;
        height = imageHeight * (width / imageWidth);
      } else if (specifiedHeight !== null) {
        height = specifiedHeight;
        width = imageWidth * (height / imageHeight);
      } else {
        width = imageWidth;
        height = imageHeight;
      }
    }

    const positionParts = styles.backgroundPosition.split(",").pop().trim().split(/\s+/);
    const offset = (value, freeSpace) => {
      if (value === "center") return freeSpace / 2;
      if (value === "right" || value === "bottom") return freeSpace;
      if (value === "left" || value === "top") return 0;
      return value.endsWith("%")
        ? freeSpace * (Number.parseFloat(value) / 100)
        : Number.parseFloat(value) || 0;
    };

    eyeLayer.style.left = `${offset(positionParts[0], bounds.width - width)}px`;
    eyeLayer.style.top = `${offset(positionParts[1] || "50%", bounds.height - height)}px`;
    eyeLayer.style.width = `${width}px`;
    eyeLayer.style.height = `${height}px`;
  }

  if (eyeLayer && !reducedMotion) {
    positionEyeLayer();
    window.addEventListener("resize", positionEyeLayer);

   const blink = () => {
  eyeLayer.classList.add("blinking");
  window.setTimeout(() => eyeLayer.classList.remove("blinking"), 190);

  const wait = Math.random() < 0.12
    ? 300
    : 1500 + Math.random() * 2000;

  window.setTimeout(blink, wait);
};

    window.setTimeout(blink, 2500 + Math.random() * 1800);
  }

  // Greeting text
  function wishLines(name) {
    return [
      `Dear ${name},`,
      "— ❀ —",
      "Dehi Saubhagyam, Arogyam Dehi Me Paramam Sukham,Roopam Dehi, Jayam Dehi, Yasho Dehi, Dwisho Jahi.",
      "May ma durga bless you with more than you deserve, better than you expected, and sooner than you imagined.",
    
      `shubho bijoya ${name}`,
      `yours ${INSTA_HANDLE}.`
    ];
  }

  const pause = ms =>
    new Promise(resolve => setTimeout(resolve, ms));

  async function typeWish() {
    const lines = wishLines(recipient);

    if (lineEls.length === 0) {
      console.error("Greeting elements not found in index.html");
      return;
    }

    // Clear previous text
    lineEls.forEach(line => {
      const text = line.querySelector(".typed-text");
      const cursor = line.querySelector(".cursor");

      if (text) text.textContent = "";
      if (cursor) cursor.classList.add("hidden");
    });

    // Show immediately when reduced motion is enabled
    if (reducedMotion) {
      lineEls.forEach((line, i) => {
        const text = line.querySelector(".typed-text");
        if (text) text.textContent = lines[i] || "";
      });
      return;
    }

    // Type each line
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
        const nextCursor =
          lineEls[i + 1].querySelector(".cursor");

        if (nextCursor) nextCursor.classList.remove("hidden");
        await pause(i === 1 ? 220 : 160);
      }
    }
  }

  // Turn the Instagram handle into a clickable link
  function linkifyHandle() {
    lineEls.forEach(line => {
      const text = line.querySelector(".typed-text");
      if (!text) return;

      const content = text.textContent;
      const start = content.indexOf(INSTA_HANDLE);
      if (start === -1) return;

      const before = content.slice(0, start);
      const after = content.slice(start + INSTA_HANDLE.length);

      const link = document.createElement("a");
      link.href = INSTA_URL;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = INSTA_HANDLE;

      text.textContent = "";
      text.append(before, link, after);
    });
  }

  // Falling flower petals
  const petalLayer = document.getElementById("petalLayer");

  if (petalLayer && !reducedMotion) {
    const flowers = ["✿", "❀", "✽", "✾", "❁"];
    const colors = [
      "#a92e22", "#cd633b", "#d99a45",
      "#f4dfb8", "#ba4a31", "#e5b85f"
    ];

    const count = window.innerWidth < 650 ? 13 : 22;

    for (let i = 0; i < count; i++) {
      const petal = document.createElement("span");

      petal.className = "petal";
      petal.setAttribute("aria-hidden", "true");
      petal.textContent =
        flowers[Math.floor(Math.random() * flowers.length)];

      petal.style.left = `${Math.random() * 100}%`;
      petal.style.fontSize = `${13 + Math.random() * 17}px`;

      petal.style.setProperty(
        "--petal-color",
        colors[Math.floor(Math.random() * colors.length)]
      );
      petal.style.setProperty("--duration", `${9 + Math.random() * 12}s`);
      petal.style.setProperty("--delay", `${-Math.random() * 18}s`);
      petal.style.setProperty("--drift", `${-80 + Math.random() * 160}px`);
      petal.style.setProperty("--petal-opacity", `${0.28 + Math.random() * 0.45}`);

      petalLayer.appendChild(petal);
    }
  }

  // Start the animation, then add the link
  typeWish().then(linkifyHandle);
})();