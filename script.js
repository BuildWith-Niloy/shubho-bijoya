(() => {
  "use strict";

  const params = new URLSearchParams(window.location.search);
  const queryRecipient = (params.get("to") || "").trim();
  const recipientName = document.getElementById("recipientName");
  const createLinkButton = document.getElementById("createLink");
  const copyWishButton = document.getElementById("copyWish");
  const statusMessage = document.getElementById("statusMessage");
  const lineEls = Array.from(document.querySelectorAll(".typed-line"));
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let activeRecipient = queryRecipient || "x";
  if (queryRecipient) recipientName.value = queryRecipient;

  function wishLines(name) {
    return [
      `Dear ${name},`,
      "— ❀ —",
      "May ma durga bless you with more than you deserve,",
      "better than you expected, and sooner than you imagined.",
      `shubho bijoya ${name}`,
      "your's outtaleague niki."
    ];
  }

  function fullWish(name) {
    return wishLines(name).join("\n");
  }

  const pause = (ms) => new Promise(resolve => window.setTimeout(resolve, ms));

  async function typeWish() {
    const lines = wishLines(activeRecipient);
    lineEls.forEach(line => {
      line.querySelector(".typed-text").textContent = "";
      line.querySelector(".cursor").classList.remove("hidden");
    });
    if (reducedMotion) {
      lineEls.forEach((line, index) => {
        line.querySelector(".typed-text").textContent = lines[index];
        line.querySelector(".cursor").classList.add("hidden");
      });
      return;
    }

    for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
      const lineEl = lineEls[lineIndex];
      const textEl = lineEl.querySelector(".typed-text");
      const cursorEl = lineEl.querySelector(".cursor");
      for (const character of lines[lineIndex]) {
        textEl.textContent += character;
        await pause(character === "," || character === "." ? 105 : 25);
      }
      cursorEl.classList.add("hidden");
      if (lineIndex + 1 < lineEls.length) {
        lineEls[lineIndex + 1].querySelector(".cursor").classList.remove("hidden");
        await pause(lineIndex === 1 ? 220 : 160);
      }
    }
  }

  async function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return;
    }
    const helper = document.createElement("textarea");
    helper.value = text;
    helper.setAttribute("readonly", "");
    helper.style.position = "fixed";
    helper.style.opacity = "0";
    document.body.appendChild(helper);
    helper.select();
    const ok = document.execCommand("copy");
    helper.remove();
    if (!ok) throw new Error("Clipboard access is unavailable in this browser.");
  }

  function showStatus(message, link = "") {
    statusMessage.replaceChildren();
    if (link) {
      statusMessage.append(document.createTextNode(message + " "));
      const anchor = document.createElement("a");
      anchor.href = link;
      anchor.textContent = link;
      anchor.target = "_blank";
      anchor.rel = "noopener noreferrer";
      statusMessage.append(anchor);
    } else {
      statusMessage.textContent = message;
    }
  }

  createLinkButton.addEventListener("click", async () => {
    const name = recipientName.value.trim();
    if (!name) {
      showStatus("Enter a recipient name first.");
      recipientName.focus();
      return;
    }
    const url = new URL(window.location.href);
    url.search = "";
    url.searchParams.set("to", name);
    const personalUrl = url.toString();
    try {
      await copyText(personalUrl);
      showStatus("Personal link created and copied:", personalUrl);
    } catch (error) {
      showStatus("Personal link created — copy this link:", personalUrl);
    }
  });

  copyWishButton.addEventListener("click", async () => {
    try {
      await copyText(fullWish(activeRecipient));
      showStatus("Your personalized wish has been copied. ♡");
    } catch (error) {
      showStatus("Copy was blocked by the browser. Try opening this page on a hosted site.");
    }
  });

  // Create lightweight, randomized drifting flower petals without any external library.
  const petalLayer = document.getElementById("petalLayer");
  const flowerGlyphs = ["✿", "❀", "✽", "✾", "❁"];
  const petalColors = ["#a92e22", "#cd633b", "#d99a45", "#f4dfb8", "#ba4a31", "#e5b85f"];
  const petalCount = reducedMotion ? 0 : (window.innerWidth < 650 ? 13 : 22);
  for (let i = 0; i < petalCount; i++) {
    const petal = document.createElement("span");
    petal.className = "petal";
    petal.setAttribute("aria-hidden", "true");
    petal.textContent = flowerGlyphs[Math.floor(Math.random() * flowerGlyphs.length)];
    petal.style.left = `${Math.random() * 100}%`;
    petal.style.setProperty("--petal-color", petalColors[Math.floor(Math.random() * petalColors.length)]);
    petal.style.setProperty("--duration", `${9 + Math.random() * 12}s`);
    petal.style.setProperty("--delay", `${-Math.random() * 18}s`);
    petal.style.setProperty("--drift", `${-80 + Math.random() * 160}px`);
    petal.style.setProperty("--petal-opacity", `${0.28 + Math.random() * 0.45}`);
    petal.style.fontSize = `${13 + Math.random() * 17}px`;
    petalLayer.appendChild(petal);
  }

  typeWish();
})();
