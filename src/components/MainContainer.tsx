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
    // Section-to-section cinematic reveals on phones only. Never pre-hide content:
    // if an observer cannot run, the page stays completely visible.
    if (!window.matchMedia("(max-width: 768px)").matches ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
        !("IntersectionObserver" in window)) return;
    const selectors = [
      ".about-section", ".whatIDO", ".career-section", ".work-section",
      ".techstack-new", ".cta-section", ".certificates-section", ".bernardo-footer"
    ];
    const sections = selectors.map(selector => document.querySelector<HTMLElement>(selector))
      .filter((section): section is HTMLElement => Boolean(section));
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const section = entry.target as HTMLElement;
        observer.unobserve(section);
        // Moving the entire section conflicts with pinned WebGL/ScrollTrigger content.
        // Animate a heading or content group instead, without altering layout.
        const subject = section.querySelector<HTMLElement>(
          ".about-me, .what-box:first-child, .career-container > h2, .work-container > h2, .techstack-content > h2, .cta-content, .certificate-heading > h2, .bernardo-footer-intro"
        );
        if (subject && typeof subject.animate === "function") {
          subject.animate([
            { opacity: 0.25, transform: "translate3d(0,28px,0)", filter: "blur(5px)" },
            { opacity: 1, transform: "translate3d(0,0,0)", filter: "blur(0)" }
          ], { duration: 850, easing: "cubic-bezier(.22,1,.36,1)", fill: "none" });
        }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -7% 0px" });
    sections.forEach(section => observer.observe(section));
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
