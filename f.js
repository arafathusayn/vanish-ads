// @ts-check

(() => {
  let i = 0;
  let rightRailAdsRemoved = false;

  const intervalId0 = setInterval(() => {
    hideAdsOnSides();
    i++;

    if (i > 100 || rightRailAdsRemoved === true) {
      clearInterval(intervalId0);
    }
  }, 50);

  function hideAds() {
    const feeds = document.querySelectorAll('[data-testid="fbfeed_story"]');

    for (const feed of feeds) {
      let links = feed.querySelectorAll("div a");
      for (const link of links) {
        if (/s.?p.?o.?n.?s.?o.?r.?e.?d/gi.test(link.textContent)) {
          let p = link.closest('[data-testid*="fbfeed_story"]');
          p.remove();
        }
      }
    }

    try {
      Array.from(document.querySelectorAll("div.userContentWrapper"))
        .filter((x) =>
          Array.from(x.querySelectorAll("div"))
            .reduce(
              (acc, curr) =>
                acc +
                (curr.innerHTML == "Suggested for You" ? curr.innerHTML : ""),
              "",
            )
            .includes("Suggested for You"),
        )
        .forEach(
          (div) =>
            div.parentElement &&
            div.parentElement.parentElement &&
            div.parentElement.parentElement.remove(),
        );
    } catch (error) {
      console.log(error);
    }
  }

  function hideAdsOnSides() {
    if (document.querySelector(".ego_section")) {
      // @ts-ignore
      document.querySelector(".ego_section").style.display = "none";
    }
    if (document.querySelector("#GroupsRHCSuggestionSection")) {
      // @ts-ignore
      document.querySelector("#GroupsRHCSuggestionSection").style.display =
        "none";
    }

    const sideAdSpans =
      document.querySelector(`[data-pagelet="RightRail"]`) &&
      document
        .querySelector(`[data-pagelet="RightRail"]`)
        .children[0].querySelectorAll("span");

    if (!sideAdSpans) {
      return;
    }

    for (const span of sideAdSpans) {
      if (span.textContent.includes("Sponsored")) {
        let target = span;

        for (let i = 0; i < 1000; i++) {
          if (target.parentElement.innerHTML.includes("facebook.com")) {
            target.parentElement.style.display = "none";

            const container = target.parentElement.parentElement;

            const observer = new MutationObserver(() => {
              hideAdsOnSides();
            });

            const config = {
              attributes: false,
              childList: true,
              subtree: true,
            };

            observer.observe(container, config);

            rightRailAdsRemoved = true;

            break;
          } else {
            target = target.parentElement;
          }
        }
      }
    }
  }

  function deferredHider(timeoutId) {
    hideAds();
    clearTimeout(timeoutId);
  }

  const MutationObserver = window.MutationObserver;
  const container = document.documentElement;

  const observer = new MutationObserver(() => {
    const timeoutId4 = setTimeout(() => {
      deferredHider(timeoutId4);
    }, 5);
  });

  const config = { attributes: false, childList: true, subtree: true };
  observer.observe(container, config);

  document.addEventListener(
    "load",
    () => {
      hideAds();
      hideAdsOnSides();
      const timeoutId = setTimeout(() => {
        deferredHider(timeoutId);
      }, 100);
    },
    { passive: true },
  );

  document.addEventListener(
    "DOMContentLoaded",
    () => {
      hideAds();
      hideAdsOnSides();
      const timeoutId2 = setTimeout(() => {
        deferredHider(timeoutId2);
      }, 100);
    },
    { passive: true },
  );

  const timeoutId3 = setTimeout(() => {
    deferredHider(timeoutId3);
  }, 1000);
})();
