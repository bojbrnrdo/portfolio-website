// Copyright (c) 2026 Job Bernardo. All rights reserved. See LICENSE for applicable third-party notices.
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextSplitter } from "../../utils/textSplitter";

interface ParaElement extends HTMLElement {
  anim?: gsap.core.Animation;
  split?: TextSplitter;
}

gsap.registerPlugin(ScrollTrigger);

export default function setSplitText() {
  ScrollTrigger.config({ ignoreMobileResize: true });
  if (window.innerWidth < 900) {
    // Touch devices need a simple native reveal rather than desktop text splitting.
    if (document.documentElement.dataset.mobileRevealsReady === "true") return;
    const targets = document.querySelectorAll<HTMLElement>(
      ".about-me .para, .career-section h2, .whatIDO .what-heading, .work-section h2, .techstack-content h2"
    );
    if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    document.documentElement.dataset.mobileRevealsReady = "true";
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const element = entry.target as HTMLElement;
        element.animate(
          [{ opacity: 0.45, transform: "translateY(18px)" }, { opacity: 1, transform: "translateY(0)" }],
          { duration: 650, easing: "ease-out" }
        );
        observer.unobserve(element);
      });
    }, { threshold: 0.1 });
    targets.forEach(element => observer.observe(element));
    return;
  }
  const paras: NodeListOf<ParaElement> = document.querySelectorAll(".para");
  const titles: NodeListOf<ParaElement> = document.querySelectorAll(".title");

  const TriggerStart = window.innerWidth <= 1024 ? "top 60%" : "20% 60%";
  const ToggleAction = "play pause resume reverse";

  paras.forEach((para: ParaElement) => {
    para.classList.add("visible");
    if (para.anim) {
      para.anim.progress(1).kill();
      para.split?.revert();
    }

    para.split = new TextSplitter(para, {
      type: "lines,words",
      linesClass: "split-line",
    });

    para.anim = gsap.fromTo(
      para.split.words,
      { autoAlpha: 0, y: 80 },
      {
        autoAlpha: 1,
        scrollTrigger: {
          trigger: para.parentElement?.parentElement,
          toggleActions: ToggleAction,
          start: TriggerStart,
        },
        duration: 1,
        ease: "power3.out",
        y: 0,
        stagger: 0.02,
      }
    );
  });
  titles.forEach((title: ParaElement) => {
    if (title.anim) {
      title.anim.progress(1).kill();
      title.split?.revert();
    }
    title.split = new TextSplitter(title, {
      type: "chars,lines",
      linesClass: "split-line",
    });
    title.anim = gsap.fromTo(
      title.split.chars,
      { autoAlpha: 0, y: 80, rotate: 10 },
      {
        autoAlpha: 1,
        scrollTrigger: {
          trigger: title.parentElement?.parentElement,
          toggleActions: ToggleAction,
          start: TriggerStart,
        },
        duration: 0.8,
        ease: "power2.inOut",
        y: 0,
        rotate: 0,
        stagger: 0.03,
      }
    );
  });

  // Avoid a recursive refresh listener that accumulates on every resize.
}
