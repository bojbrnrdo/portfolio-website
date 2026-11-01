// Copyright (c) 2026 Job Bernardo. All rights reserved. See LICENSE for applicable third-party notices.
import { config } from "../config";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
import "./styles/PortfolioFooter.css";

export default function PortfolioFooter() {
  const footerRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;
    const wordmark = footer.querySelector<HTMLElement>(".bernardo-footer-wordmark");
    if (!wordmark || !window.matchMedia("(max-width: 768px)").matches) return;
    const fit = () => {
      const available = footer.clientWidth;
      const natural = wordmark.offsetWidth;
      if (natural > 0) wordmark.style.setProperty("--bernardo-fit", String(Math.min(1, (available - 4) / natural)));
    };
    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(footer);
    document.fonts?.ready.then(fit).catch(() => {});
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const footer = footerRef.current;
    if (!footer || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(max-width: 768px)").matches) {
      const sections = footer.querySelectorAll<HTMLElement>(".bernardo-footer-intro, .bernardo-footer-column");
      if (!("IntersectionObserver" in window)) return;
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          (entry.target as HTMLElement).animate(
            [{opacity: .4, transform: "translateY(18px)"}, {opacity: 1, transform: "translateY(0)"}],
            {duration: 650, easing: "ease-out"}
          );
          observer.unobserve(entry.target);
        });
      }, {threshold:.1});
      sections.forEach(section=>observer.observe(section));
      return ()=>observer.disconnect();
    }
    const ctx = gsap.context(() => {
      gsap.from(".bernardo-footer-intro, .bernardo-footer-column", {
        y: 32, opacity: 0, duration: 0.9, stagger: 0.11, ease: "power3.out",
        scrollTrigger: { trigger: footer, start: "top 82%", toggleActions: "play reverse play reverse" }
      });
      gsap.fromTo(".bernardo-footer-wordmark",
        { yPercent: 42, opacity: 0, scaleX: 0.92 },
        { yPercent: 0, opacity: 1, scaleX: 0.99, duration: 1.35, ease: "power3.out",
          scrollTrigger: { trigger: ".bernardo-footer-wordmark", start: "top 96%", toggleActions: "play reverse play reverse" } }
      );
    }, footer);
    return () => ctx.revert();
  }, []);
  return (
    <footer ref={footerRef} className="bernardo-footer" id="contact">
      <div className="bernardo-footer-top">
        <div className="bernardo-footer-intro">
          <a className="bernardo-footer-monogram" href="#top" aria-label="Back to top">JB <span>✳</span></a>
          <p>Email: <a href="mailto:jobmatthewbernardo@gmail.com">jobmatthewbernardo@gmail.com</a></p>
        </div>
        <nav className="bernardo-footer-column" aria-label="Footer sitemap">
          <span>SITEMAP</span>
          <a href="#about">About</a>
          <a href="#work">Work</a>
          <a href="#certificates">Certificates</a>
          <a href="#contact">Contact</a>
        </nav>
        <div className="bernardo-footer-column">
          <span>CONNECT</span>
          <a href={config.contact.linkedin} target="_blank" rel="noopener noreferrer">Let's work together ↗</a>
          <a href={config.contact.github} target="_blank" rel="noopener noreferrer">Explore my code ↗</a>
          <p>Philippines · Available worldwide</p>
        </div>
        <div className="bernardo-footer-column">
          <span>SOCIALS</span>
          <a href={config.contact.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href={config.contact.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href={config.contact.github} target="_blank" rel="noopener noreferrer">GitHub</a>
        </div>
      </div>
      <div className="bernardo-footer-wordmark" aria-label="BERNARDO">BERNARDO</div>

    </footer>
  );
}
