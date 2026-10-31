// Copyright (c) 2026 Job Bernardo. All rights reserved. See LICENSE for applicable third-party notices.
import type { ComponentType, CSSProperties } from 'react';
declare const CircularCarousel: ComponentType<{
items?: { src: string; alt?: string; title?: string; subtitle?: string }[];
preset?: string; intro?: string; cardWidth?: number; aspectRatio?: number; gap?: number; curve?: number; tilt?: number; perspective?: number; depthFade?: number; innerShade?: number;
autoplay?: string | boolean; speed?: number; interval?: number; direction?: string;
captions?: boolean; onChange?: (index: number) => void;
onItemClick?: (item: {src:string;title?:string}, index:number) => void;
className?: string; style?: CSSProperties;
}>;
export default CircularCarousel;
