// Copyright (c) 2026 Job Bernardo. All rights reserved. See LICENSE for applicable third-party notices.
import type { ComponentType, CSSProperties } from 'react';
declare const FlyingPosters: ComponentType<{
 items: ({image:string;text?:string}|string)[];
 planeWidth?:number;planeHeight?:number;distortion?:number;scrollEase?:number;cameraFov?:number;
 cameraZ?:number;gap?:number;columns?:number;columnGap?:number;alternate?:boolean;
 radius?:number;rotation?:number;axis?:string;speed?:number;lean?:number;fade?:number;shading?:number;
 wheel?:boolean;drag?:boolean;pageScroll?:number;
 onItemClick?:(item:unknown,index:number)=>void;className?:string;style?:CSSProperties
}>;export default FlyingPosters;
