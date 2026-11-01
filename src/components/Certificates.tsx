// Copyright (c) 2026 Job Bernardo. All rights reserved. See LICENSE for applicable third-party notices.
import './styles/Certificates.css';
const items=[{"title": "Working with Computers and Devices", "url": "https://drive.google.com/file/d/1xuDUBPQxVEx9mx1DaaEXy10iLS7_XioO/view?usp=drivesdk"}, {"title": "PowerPoint Essential Training Office 365Microsoft 365 2020", "url": "https://drive.google.com/file/d/1N55om8FIGy3A2lL4u-_bVSbJlCykuHUw/view?usp=drivesdk"}, {"title": "PowerPoint Tips and Tricks 2019", "url": "https://drive.google.com/file/d/1KJe7qOLYIdIzmtVukM0oR_VPcRS1lDLl/view?usp=drivesdk"}, {"title": "Word Tips and Tricks", "url": "https://drive.google.com/file/d/1lba3UPGtR_Ocxvy85RwgjZq7KF3vL2dP/view?usp=drivesdk"}, {"title": "Excel Tips and Tricks 2018", "url": "https://drive.google.com/file/d/1BZXwmq5xTu2LyBCi88gbNVXOovHHOrvA/view?usp=drivesdk"}, {"title": "Planning a Microsoft Azure Solution", "url": "https://drive.google.com/file/d/1LSnMW36pDbBO4qARmztXCebWBRFmsu5l/view?usp=drivesdk"}, {"title": "IoT Foundations Fundamentals", "url": "https://drive.google.com/file/d/1KW4-cvZqEGtsCcMHrjRM1qUFArJM6fe7/view?usp=drivesdk"}, {"title": "AI in Connected Products AIOT", "url": "https://drive.google.com/file/d/1slNi350iHhvtzyIEWQK_qAVQguIwTKUM/view?usp=drivesdk"}, {"title": "IoT Foundations Operating Systems Fundamentals 2018", "url": "https://drive.google.com/file/d/1DBqbmgYXrXMNcv7dq71Co-iux11OaZb9/view?usp=drivesdk"}, {"title": "Microsoft Azure Networking Concepts 2021", "url": "https://drive.google.com/file/d/1I5UJkCiLGpm6SmOSBHx3IkYpSV1gXiJo/view?usp=drivesdk"}, {"title": "Cloud Storage Concepts Services Cost Control and Security", "url": "https://drive.google.com/file/d/1auWRbNWeCWoDuBKvlhmlCFWXQtTGyTrw/view?usp=drivesdk"}, {"title": "Azure Storage Essential Training 2021", "url": "https://drive.google.com/file/d/1T7t1uhpn6dMVSyC85smiVoz0Cvhp9lZu/view?usp=drivesdk"}, {"title": "Leadership Skills for The Future 2020", "url": "https://drive.google.com/file/d/15dQVyshRGaTh8IJmVRFJMvFyyZWqbNq9/view?usp=drivesdk"}, {"title": "Leading with a Growth Mindset", "url": "https://drive.google.com/file/d/1ED-0gqfbg6NA8r29Bicrzekwy-kgf0Ga/view?usp=drivesdk"}, {"title": "Understanding Manual Testing", "url": "https://drive.google.com/file/d/1OcGyWsROMulu5_CJHaktEBMpOIc8kVbU/view?usp=drivesdk"}, {"title": "Programming Foundations Software TestingQA", "url": "https://drive.google.com/file/d/17bdPgojbEP368IRN3wgl5tBmfD9F5bbR/view?usp=drivesdk"}, {"title": "Getting Started with Professional Scrum", "url": "https://drive.google.com/file/d/1IeDnlwkxeyfPItR81kkf6NPM12wADyph/view?usp=drivesdk"}, {"title": "Diversity Inclusion and Belonging", "url": "https://drive.google.com/file/d/15FBVYJjc5U5zeL8bXSQINGrqlz_RS58P/view?usp=drivesdk"}, {"title": "Introducing Postman", "url": "https://drive.google.com/file/d/1VXSTv7a3wMI-EfCToAJnFot-AS7W7eOl/view?usp=drivesdk"}, {"title": "Postman Essential Training", "url": "https://drive.google.com/file/d/1Y5sqo04RkLPbKhzQSXAJgVd17iahID5z/view?usp=drivesdk"}, {"title": "Prompt Engineering with ChatGPT", "url": "https://drive.google.com/file/d/1OFeFNShLm7kk4yLlCCEGJyglEtNv1WWX/view?usp=drivesdk"}, {"title": "Prompt Engineering How to Talk to the AIs 2023", "url": "https://drive.google.com/file/d/1_cLBwsBHle0gI710BB-aRaPE871HOvF0/view?usp=drivesdk"}, {"title": "Holding Yourself Accountable 2017", "url": "https://drive.google.com/file/d/1EbH7VluEBzZrT5gjGxOwB89uk_4Cmrs9/view?usp=drivesdk"}, {"title": "Developing Emotional Intelligence to Further Diversity Equity and Inclusion", "url": "https://drive.google.com/file/d/1w7lWcPTXPThlKyelu7x0OaIKHlmFlLu-/view?usp=drivesdk"}, {"title": "AI in Risk Management and Fraud Detection", "url": "https://drive.google.com/file/d/14vmB9nt9F8gQdjUbjUEjU7wFZgEGZkLW/view?usp=drivesdk"}, {"title": "Agentforce Unlocked Learning the Salesforce AI Service Platform", "url": "https://drive.google.com/file/d/1zfAJU7moN_Qf-6m6WjdaEirl_9wMVMZS/view?usp=drivesdk"}];

const extraCertificates = [
  {title:'auto', image:'/certificate-images/extra-01.png'},
  {title:'slb', image:'/certificate-images/extra-02.png'},
  {title:'oss', image:'/certificate-images/extra-03.png'},
  {title:'apsara', image:'/certificate-images/extra-04.png'},
  {title:'ECS', image:'/certificate-images/extra-05.png'},
  {title:'alibaba', image:'/certificate-images/extra-06.png'},
  {title:'cisco', image:'/certificate-images/extra-07.jpeg'},
  {title:'google', image:'/certificate-images/extra-08.jpeg'},
  {title:'FCA', image:'/certificate-images/extra-09.jpeg'},
  {title:'PICSPRO', image:'/certificate-images/extra-10.jpeg'}
];
const certificateList = [
  ...items.map((item,index)=>({...item,image:'/certificate-images/'+String(index+1).padStart(2,'0')+'.jpg'})),
  ...extraCertificates.map((item,index)=>({...item,url:'https://drive.google.com/drive/folders/11xhne_kchl0extHNa9xVYACO0TA_Ol0Z',title:item.title+' certificate',index}))
];
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const COUNT = certificateList.length;
export default function Certificates() {
 const sectionRef=useRef<HTMLElement>(null);
 const canvasRef=useRef<HTMLDivElement>(null);
 const [active,setActive]=useState(0);

 useEffect(()=>{
  const section=sectionRef.current,host=canvasRef.current;
  if(!section||!host)return;
  const scene=new THREE.Scene();
  const group=new THREE.Group();
  scene.add(group);
  // Mechay geometry: the card surface itself is curved around a cylinder.
  const mobile=()=>host.clientWidth<768;
  const radius=mobile()?2.6:3.1;
  const pitch=mobile()?.62:.6;
  const perTurn=7;
  const angleStep=Math.PI*2/perTurn;
  const cardWidth=mobile()?2.1:2.35;
  const cardHeight=cardWidth/1.45;
  const camera=new THREE.PerspectiveCamera(34,1,.1,60);
  const renderer=new THREE.WebGLRenderer({alpha:true,antialias:true,powerPreference:'high-performance'});
  renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,mobile()?1:1.5));
  renderer.outputColorSpace=THREE.SRGBColorSpace;
  renderer.domElement.setAttribute('aria-hidden','true');
  renderer.domElement.style.cssText='width:100%;height:100%;display:block';
  host.appendChild(renderer.domElement);
  const geometry=new THREE.PlaneGeometry(cardWidth,cardHeight,40,12);
  const pos=geometry.attributes.position as THREE.BufferAttribute;
  for(let j=0;j<pos.count;j++){
    const a=pos.getX(j)/radius;
    pos.setXYZ(j,Math.sin(a)*radius,pos.getY(j),Math.cos(a)*radius);
  }
  pos.needsUpdate=true;
  geometry.computeVertexNormals();
  const meshes:THREE.Mesh[]=[];
  const materials:THREE.MeshBasicMaterial[]=[];
  const loader=new THREE.TextureLoader();
  let disposed=false,frame=0,lastShown=-1,current=0,target=0,visible=true;
  for(let i=0;i<COUNT;i++){
    const mat=new THREE.MeshBasicMaterial({color:0xffffff,side:THREE.DoubleSide,transparent:true,opacity:1,depthWrite:true});
    materials.push(mat);
    const mesh=new THREE.Mesh(geometry,mat);
    mesh.rotation.y=i*angleStep;
    mesh.position.y=-i*pitch;
    mesh.userData.certificateIndex=i;
    group.add(mesh);
    meshes.push(mesh);
    loader.load(certificateList[i].image,texture=>{
      if(disposed){texture.dispose();return;}
      texture.colorSpace=THREE.SRGBColorSpace;
      texture.anisotropy=Math.min(4,renderer.capabilities.getMaxAnisotropy());
      mat.map=texture;mat.needsUpdate=true;
    });
  }
  group.rotation.z=.1;
  const resize=()=>{
    const w=Math.max(host.clientWidth,1),h=Math.max(host.clientHeight,1);
    renderer.setSize(w,h,false);
    camera.aspect=w/h;
    camera.position.set(0,0,radius+(w/h<.8?9.5:6.4));
    camera.updateProjectionMatrix();
  };
  const raycaster=new THREE.Raycaster();
  const pointer=new THREE.Vector2();
  const onClick=(event:MouseEvent)=>{
    const rect=renderer.domElement.getBoundingClientRect();
    pointer.set((event.clientX-rect.left)/rect.width*2-1,-(event.clientY-rect.top)/rect.height*2+1);
    raycaster.setFromCamera(pointer,camera);
    const hits=raycaster.intersectObjects(meshes,false);
    if(hits.length){
      const i=hits[0].object.userData.certificateIndex as number;
      window.open(certificateList[i].url,'_blank','noopener,noreferrer');
    }
  };
  renderer.domElement.addEventListener('click',onClick);
  const tick=()=>{
    if(disposed || !visible) {frame=0;return;}
    current+=(target-current)*.075;
    group.rotation.y=-current*angleStep;
    group.position.y=current*pitch;
    camera.lookAt(0,0,0);
    const index=Math.min(COUNT-1,Math.max(0,Math.round(current)));
    if(index!==lastShown){lastShown=index;setActive(index);}
    renderer.render(scene,camera);
    frame=requestAnimationFrame(tick);
  };
  resize();
  const visibilityObserver=new IntersectionObserver(entries=>{
    visible=entries[0]?.isIntersecting??false;
    if(visible && !frame) frame=requestAnimationFrame(tick);
  },{rootMargin:'120px 0px'});
  visibilityObserver.observe(section);
  frame=requestAnimationFrame(tick);
  let touchX = 0;
  const onTouchStart = (e:TouchEvent) => { touchX = e.touches[0]?.clientX ?? 0; };
  const onTouchEnd = (e:TouchEvent) => {
    const delta = touchX - (e.changedTouches[0]?.clientX ?? touchX);
    if(Math.abs(delta)>35){
      const next=Math.max(0,Math.min(COUNT-1,Math.round(target)+(delta>0?1:-1)));
      const scroll=trigger;
      if(scroll && window.innerWidth<=768){
        // Swipe and vertical scrolling update the same underlying timeline.
        window.scrollTo({top:scroll.start+(next/(COUNT-1))*(scroll.end-scroll.start),behavior:'smooth'});
      } else target=next;
    }
  };
  if(window.innerWidth<=768){
    host.addEventListener('touchstart',onTouchStart,{passive:true});
    host.addEventListener('touchend',onTouchEnd,{passive:true});
  }
  const trigger=ScrollTrigger.create({
   id:'certificates-webgl',trigger:section,start:'top top',
   end:()=>'+='+Math.round(window.innerHeight*(mobile()?3.4:4.2)),
   pin:true,pinSpacing:true,scrub:.65,anticipatePin:1,
   invalidateOnRefresh:true,
   onUpdate:self=>{target=self.progress*(COUNT-1);}
  });
  const observer=new ResizeObserver(resize);observer.observe(host);
  return()=>{
    disposed=true;visibilityObserver.disconnect();trigger.kill();host.removeEventListener('touchstart',onTouchStart);host.removeEventListener('touchend',onTouchEnd);observer.disconnect();cancelAnimationFrame(frame);
    renderer.domElement.removeEventListener('click',onClick);
    for(const m of materials){m.map?.dispose();m.dispose();}
    geometry.dispose();renderer.dispose();
    if(renderer.domElement.parentElement===host)host.removeChild(renderer.domElement);
  };
 },[]);
 return <section className="certificates-section" id="certificates" ref={sectionRef}>
  <div className="certificates-inner">
   <div className="certificate-canvas" ref={canvasRef}/>
   <div className="certificate-vignette" aria-hidden="true"/>
   <header className="certificate-heading"><h2>Certificates</h2></header>
   <div className="certificate-foot">
    <div className="certificate-progress"><span style={{width:`${((active+1)/COUNT)*100}%`}}/></div>
    <a className="certificate-current-title" href={certificateList[active].url} target="_blank" rel="noopener noreferrer">{certificateList[active].title} ↗</a>
   </div>
  </div>
 </section>;
}
