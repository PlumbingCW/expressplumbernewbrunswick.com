(function () {
  "use strict";
  var root = document.documentElement;
  root.classList.remove("no-js");

  /* Mobile drawer. One breakpoint (768px) shared with the stylesheet. */
  var btn = document.getElementById("menu-btn");
  var drawer = document.getElementById("drawer");
  var shade = document.getElementById("drawer-shade");
  var closeBtn = document.getElementById("drawer-close");
  function setDrawer(open) {
    if (!drawer || !btn) return;
    drawer.classList.toggle("open", open);
    if (shade) shade.classList.toggle("open", open);
    btn.setAttribute("aria-expanded", open ? "true" : "false");
    root.style.overflow = open ? "hidden" : "";
    if (open && closeBtn) closeBtn.focus();
    if (!open) btn.focus();
  }
  if (btn && drawer) {
    btn.addEventListener("click", function () { setDrawer(!drawer.classList.contains("open")); });
    if (closeBtn) closeBtn.addEventListener("click", function () { setDrawer(false); });
    if (shade) shade.addEventListener("click", function () { setDrawer(false); });
    drawer.addEventListener("click", function (e) {
      var a = e.target.closest ? e.target.closest("a") : null;
      if (a) setDrawer(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && drawer.classList.contains("open")) setDrawer(false);
    });
    window.addEventListener("resize", function () {
      if (window.innerWidth > 768 && drawer.classList.contains("open")) setDrawer(false);
    });
  }

  /* FAQ accordion (max-height toggle). */
  var qs = document.querySelectorAll(".faq-q");
  function fit(q) {
    var a = document.getElementById(q.getAttribute("aria-controls"));
    if (a) a.style.maxHeight = q.getAttribute("aria-expanded") === "true" ? a.scrollHeight + "px" : "0px";
  }
  for (var i = 0; i < qs.length; i++) {
    qs[i].addEventListener("click", function () {
      var open = this.getAttribute("aria-expanded") === "true";
      this.setAttribute("aria-expanded", open ? "false" : "true");
      fit(this);
    });
  }
  window.addEventListener("resize", function () {
    for (var j = 0; j < qs.length; j++) if (qs[j].getAttribute("aria-expanded") === "true") fit(qs[j]);
  });

  /* Hide the floating call button while the footer is on screen. */
  var fab = document.getElementById("fab");
  var foot = document.querySelector(".site-footer");
  if (fab && foot && "IntersectionObserver" in window) {
    new IntersectionObserver(function (en) {
      fab.classList.toggle("hide", en[0].isIntersecting);
    }, { threshold: 0.05 }).observe(foot);
  }
})();
