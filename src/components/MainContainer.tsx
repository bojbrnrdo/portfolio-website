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
    // Mobile-only cinematic choreography. Never alter desktop ScrollTriggers.
    const mobile = window.matchMedia("(max-width: 768px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!mobile.matches || reduced.matches || !("IntersectionObserver" in window)) return;
    const groups = [
      ".about-me", ".whatIDO .what-box", ".career-container > h2",
      ".career-info-box", ".work-container > h2", ".work-video-box",
      ".techstack-content > h2", ".techstack-row", ".cta-section",
      ".certificate-heading h2", ".bernardo-footer-intro",
      ".bernardo-footer-column", ".bernardo-footer-wordmark"
    ];
    const targets = Array.from(document.querySelectorAll<HTMLElement>(groups.join(",")));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target as HTMLElement;
        el.classList.add("mobile-cinema-visible");
        observer.unobserve(el);
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -7% 0px" });
    const frame = requestAnimationFrame(() => {
      targets.forEach((el, index) => {
        el.style.setProperty("--cinema-order", String(index % 3));
        if (el.getBoundingClientRect().top < window.innerHeight * 0.82) return;
        el.classList.add("mobile-cinema-enter");
        observer.observe(el);
      });
    });
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      targets.forEach(el => {
        el.classList.remove("mobile-cinema-enter", "mobile-cinema-visible");
        el.style.removeProperty("--cinema-order");
      });
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
