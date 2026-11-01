// Copyright (c) 2026 Job Bernardo. All rights reserved. See LICENSE for applicable third-party notices.
import "./styles/Work.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

const Work = () => {
  useEffect(() => {
    // Native vertical mobile layout; explicitly manage playback on iOS/Android.
    if (window.matchMedia("(max-width: 768px)").matches) {
      const cards = Array.from(document.querySelectorAll<HTMLElement>(".work-video-box"));
      const videos = cards.map(card => card.querySelector("video")).filter((v): v is HTMLVideoElement => Boolean(v));
      const reveal = (card: HTMLElement) => card.classList.add("work-mobile-visible");
      const play = (video: HTMLVideoElement) => {
        video.muted = true;
        video.defaultMuted = true;
        video.playsInline = true;
        if (video.readyState < HTMLMediaElement.HAVE_CURRENT_DATA) video.load();
        const attempt = video.play();
        if (attempt) attempt.catch(() => {
          video.closest(".work-video-box")?.classList.add("work-needs-tap");
        });
      };
      videos.forEach(video => {
        video.setAttribute("playsinline", "");
        video.setAttribute("webkit-playsinline", "");
        video.setAttribute("muted", "");
        video.preload = "metadata";
        video.controls = true; // Native controls remain usable when autoplay is blocked.
      });
      if (!("IntersectionObserver" in window)) {
        cards.forEach(reveal);
        videos.forEach(play);
        return;
      }
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          const card = entry.target as HTMLElement;
          const video = card.querySelector("video");
          if (entry.isIntersecting) {
            reveal(card);
            if (video) play(video);
          } else if (video) {
            video.pause();
          }
        });
      }, { threshold: 0.05, rootMargin: "80px 0px" });
      cards.forEach(card => { card.classList.add("work-mobile-ready"); observer.observe(card); });
      return () => { observer.disconnect(); videos.forEach(video => video.pause()); };
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
              <div className="work-video-container" style={{ backgroundImage: `url(/portfolio-posters/project-${index + 1}.jpg)` }}>
                <video
                  src={window.matchMedia("(max-width: 768px)").matches
                    ? `/portfolio-videos/mobile-project-${index + 1}.mp4`
                    : `/portfolio-videos/project-${index + 1}.mp4`}
                  autoPlay muted loop playsInline preload="metadata"
                  poster={`/portfolio-posters/project-${index + 1}.jpg`}
                  aria-label={`Portfolio video ${index + 1}`}
                  onPlay={(event) => event.currentTarget.closest(".work-video-box")?.classList.add("work-is-playing")}
                  onLoadedData={(event) => { if (window.matchMedia("(max-width: 768px)").matches) event.currentTarget.play().catch(() => {}); }}
                  onPause={(event) => event.currentTarget.closest(".work-video-box")?.classList.remove("work-is-playing")}
                />
                <button type="button" className="work-mobile-play" aria-label={`Play portfolio video ${index + 1}`}
                  onClick={(event) => {
                    const video = event.currentTarget.parentElement?.querySelector("video");
                    if (!video) return;
                    video.muted = true;
                    video.controls = true;
                    video.play().catch(() => { video.controls = true; });
                  }}>▶ <span>Play video</span></button>
              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default Work;
