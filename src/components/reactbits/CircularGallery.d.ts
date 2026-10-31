// Copyright (c) 2026 Job Bernardo. All rights reserved. See LICENSE for applicable third-party notices.
import type { ComponentType, CSSProperties } from 'react';
declare const CircularGallery: ComponentType<{
 items?: {image:string;text?:string;alt?:string}[];
 bend?:number;scrollSpeed?:number;scrollEase?:number;itemSize?:number;itemAspect?:number;
 gap?:number;wave?:number;fadeEdges?:number;shadow?:number;grayscale?:boolean;
 showTitles?:boolean;snap?:boolean;autoScroll?:number;openOnClick?:boolean;intro?:boolean;
 onItemClick?:(item:{image:string;text?:string},index:number)=>void;
 onActiveChange?:(index:number)=>void;
 className?:string;style?:CSSProperties;
}>;
export default CircularGallery;
