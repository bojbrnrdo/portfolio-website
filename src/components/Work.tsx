// Copyright (c) 2026 Job Bernardo. All rights reserved. See LICENSE for applicable third-party notices.
import "./styles/Work.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

const Work = () => {
  useEffect(() => {
    // Disable pinning on mobile to allow scrolling
    if (window.innerWidth <= 768) {
      const cards = document.querySelectorAll<HTMLElement>(".work-video-box");
      if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) entry.target.classList.add("work-mobile-visible");
          else entry.target.classList.remove("work-mobile-visible");
        });
      }, { threshold: 0.1 });
      cards.forEach(card => { card.classList.add("work-mobile-ready"); observer.observe(card); });
      return () => observer.disconnect();

    }

    const track = document.querySelector<HTMLElement>(".work-flex");
    const viewport = document.querySelector<HTMLElement>(".work-container");
    if (!track || !viewport) return;
    // Measure the actual end of the last card, not decorative pseudo-elements.
    const distance = () => {
      const lastCard = track.lastElementChild as HTMLElement | null;
      if (!lastCard) return 0;
      return Math.max(0, lastCard.offsetLeft + lastCard.offsetWidth - viewport.clientWidth);
    };
    const tween = gsap.to(track, {
      x: () => -distance(),
      ease: "none",
      scrollTrigger: {
        trigger: ".work-section",
        start: "top top",
        end: () => "+=" + Math.max(distance(), 1),
        scrub: 0.7,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        id: "work",
      },
    });
    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);
    ScrollTrigger.refresh();
    return () => {
      window.removeEventListener("resize", onResize);
      tween.scrollTrigger?.kill();
      tween.kill();
      gsap.set(track, { clearProps: "transform" });
    };

  }, []);
  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-flex">
          {Array.from({ length: 8 }, (_, index) => (
            <div className="work-box work-video-box" key={`project-video-${index + 1}`}>
              <div className="work-video-container">
                <video
                  src={`/portfolio-videos/project-${index + 1}.mp4`}
                  autoPlay muted loop playsInline preload="auto"
                  aria-label={`Portfolio video ${index + 1}`}
                />
              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default Work;
