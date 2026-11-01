// Copyright (c) 2026 Job Bernardo. All rights reserved. See LICENSE for applicable third-party notices.
import Certificates from './Certificates';
import { PropsWithChildren, useEffect, useState } from "react";
import About from "./About";
import Career from "./Career";
import Cursor from "./Cursor";
import Landing from "./Landing";
import Navbar from "./Navbar";
import SocialIcons from "./SocialIcons";
import WhatIDo from "./WhatIDo";
import Work from "./Work";
import TechStackNew from "./TechStackNew";
import CallToAction from "./CallToAction";
import PortfolioFooter from "./PortfolioFooter";
import setSplitText from "./utils/splitText";

const MainContainer = ({ children }: PropsWithChildren) => {
  const [isDesktopView, setIsDesktopView] = useState<boolean>(
    window.innerWidth > 1024
  );
  const [isMobile] = useState<boolean>(window.innerWidth <= 768);
  const [shouldRenderCharacter, setShouldRenderCharacter] = useState(false);
  useEffect(() => {
    if (!window.matchMedia("(max-width: 768px)").matches) return;
    const selectors = [
      ".about-me", ".whatIDO .what-box", ".career-section h2",
      ".career-info-box", ".work-section h2", ".work-video-box",
      ".techstack-content h2", ".techstack-row", ".cta-section",
      ".certificate-heading", ".bernardo-footer-top"
    ];
    const targets = Array.from(document.querySelectorAll<HTMLElement>(selectors.join(",")));
    if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("mobile-section-visible");
        observer.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.06 });
    targets.forEach(target => {
      target.classList.add("mobile-section-reveal");
      observer.observe(target);
    });
    return () => {
      observer.disconnect();
      targets.forEach(target => target.classList.remove("mobile-section-reveal", "mobile-section-visible"));
    };
  }, []);

  useEffect(() => {
    if (window.innerWidth > 768) return;
    // Start only after all lazy-loaded sections have mounted.
    let cancelled = false;
    const frame = requestAnimationFrame(() => {
      Promise.all([
        import("./utils/initialFX"),
        import("./utils/GsapScroll")
      ]).then(([{ initialFX }, { setAllTimeline }]) => {
        if (cancelled) return;
        initialFX();
        // The 3D character is not mounted on mobile, so its loader cannot set up
        // the shared Career scroll timeline. Initialize that timeline explicitly.
        setAllTimeline();
      });
    });
    return () => { cancelled = true; cancelAnimationFrame(frame); };
  }, []);


  useEffect(() => {
    // Observe the actual content, not the section container: a tall section
    // can intersect well before its heading reaches the phone viewport.
    if (!window.matchMedia("(max-width: 768px)").matches ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
        !("IntersectionObserver" in window)) return;

    const targets = document.querySelectorAll<HTMLElement>(
      ".about-me h3, .about-me p, .what-heading, .what-box-in, " +
      ".career-container h2, .career-info-box, .work-container > h2, " +
      ".work-video-box, .techstack-content > h2, .techstack-row, " +
      ".cta-btn, .certificate-heading h2, .bernardo-footer-intro, " +
      ".bernardo-footer-column, .bernardo-footer-wordmark"
    );
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        observer.unobserve(entry.target);
        const element = entry.target as HTMLElement;
        if (typeof element.animate !== "function") return;
        const wordmark = element.classList.contains("bernardo-footer-wordmark");
        element.animate(wordmark
          ? [{ opacity: .2 }, { opacity: 1 }]
          : [{ opacity: .2, translate: "0 28px" },
             { opacity: 1, translate: "0 0" }],
          { duration: 900, easing: "cubic-bezier(.22,1,.36,1)" });
      });
    }, { threshold: 0.2, rootMargin: "0px 0px -3% 0px" });
    targets.forEach(element => observer.observe(element));
    return () => observer.disconnect();
  }, []);


  useEffect(() => {
    const resizeHandler = () => {
      setSplitText();
      setIsDesktopView(window.innerWidth > 1024);
    };
    resizeHandler();
    window.addEventListener("resize", resizeHandler);
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  useEffect(() => {
    if (window.innerWidth <= 1024) return;

    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    let idleId: number | undefined;
    const win = window as Window & {
      requestIdleCallback?: (callback: IdleRequestCallback, options?: IdleRequestOptions) => number;
      cancelIdleCallback?: (handle: number) => void;
    };

    const mountCharacter = () => setShouldRenderCharacter(true);

    if (typeof win.requestIdleCallback === "function") {
      idleId = win.requestIdleCallback(mountCharacter, { timeout: 1500 });
    } else {
      timeoutId = setTimeout(mountCharacter, 1200);
    }

    return () => {
      if (idleId !== undefined && typeof win.cancelIdleCallback === "function") {
        win.cancelIdleCallback(idleId);
      }
      if (timeoutId !== undefined) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  return (
    <div className="container-main">
      <Cursor />
      <Navbar />
      <SocialIcons />
      {isDesktopView && !isMobile && shouldRenderCharacter && children}
      <div className="container-main">
        <Landing />
        <About />
        <WhatIDo />
        <Career />
        <Work />
        <TechStackNew />
        <CallToAction />
        <Certificates />
        <PortfolioFooter />
      </div>
    </div>
  );
};

export default MainContainer;
