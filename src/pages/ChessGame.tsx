// Copyright (c) 2026 Job Bernardo. All rights reserved. See LICENSE for applicable third-party notices.
import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Chess, type Square } from 'chess.js';
import './ChessGame.css';

const GLYPHS: Record<string,string>={wk:'♔',wq:'♕',wr:'♖',wb:'♗',wn:'♘',wp:'♙',bk:'♚',bq:'♛',br:'♜',bb:'♝',bn:'♞',bp:'♟︎'};
const FILES='abcdefgh';
const VALUE: Record<string,number>={p:100,n:320,b:330,r:500,q:900,k:0};

export default function ChessGame({embedded=false}:{embedded?:boolean}){
 const [fen,setFen]=useState(new Chess().fen());
 const [selected,setSelected]=useState<Square|null>(null);
 const [history,setHistory]=useState<string[]>([]);
 const [pending,setPending]=useState<{from:Square,to:Square}|null>(null);
 const [difficulty,setDifficulty]=useState<'easy'|'medium'>('medium');
 const timer=useRef<ReturnType<typeof setTimeout>|null>(null);
 const game=useMemo(()=>new Chess(fen),[fen]);
 const legalTargets=selected?game.moves({square:selected,verbose:true}).map(m=>m.to):[];
 const status=game.isCheckmate()?(game.turn()==='w'?'Checkmate — Computer wins':'Checkmate — You win!')
  :game.isStalemate()?'Draw — stalemate'
  :game.isThreefoldRepetition()?'Draw — threefold repetition'
  :game.isInsufficientMaterial()?'Draw — insufficient material'
  :game.isDraw()?'Draw'
  :game.turn()==='w'?(game.isCheck()?'Your move · Check':'Your move — White')
  :(game.isCheck()?'Computer thinking · Check':'Computer thinking — Black');
 const stop=()=>{if(timer.current){clearTimeout(timer.current);timer.current=null;}};
 const move=(from:Square,to:Square,promotion='q')=>{
   const next=new Chess(fen);
   try{
    next.move({from,to,promotion});
    setHistory(prev=>[...prev,fen]);
    setFen(next.fen());
    setSelected(null);
    setPending(null);
   }catch{setSelected(null);}
 };
 const choose=(square:Square)=>{
  if(game.turn()!=='w'||game.isGameOver()||pending)return;
  const p=game.get(square);
  if(selected&&legalTargets.includes(square)){
    const choices=game.moves({square:selected,verbose:true}).filter(m=>m.to===square);
    if(choices.some(m=>m.isPromotion()))setPending({from:selected,to:square});
    else move(selected,square);
    return;
  }
  setSelected(p?.color==='w'?(selected===square?null:square):null);
 };
 useEffect(()=>{
  if(game.turn()!=='b'||game.isGameOver())return;
  timer.current=setTimeout(()=>{
   const current=new Chess(fen);
   const moves=current.moves({verbose:true});
   if(!moves.length)return;
   const scored=moves.map(m=>{
    const copy=new Chess(fen);copy.move(m);
    let score=(m.captured?VALUE[m.captured]||0:0)-(m.captured?VALUE[m.piece]*.08:0);
    if(copy.isCheckmate())score+=100000;
    else if(copy.isCheck())score+=35;
    if(m.promotion)score+=VALUE[m.promotion]||0;
    const file=FILES.indexOf(m.to[0]);const rank=Number(m.to[1]);
    score+=12-(Math.abs(file-3.5)+Math.abs(rank-4.5))*3;
    return {m,score:score+Math.random()*(difficulty==='easy'?300:45)};
   }).sort((a,b)=>b.score-a.score);
   const picked=scored[0]?.m;
   if(picked){
    current.move(picked);
    setHistory(prev=>[...prev,fen]);
    setFen(current.fen());
   }
   timer.current=null;
  },450);
  return stop;
 },[fen,difficulty]);
 const restart=()=>{stop();setFen(new Chess().fen());setSelected(null);setHistory([]);setPending(null);};
 const undo=()=>{
  stop();
  if(!history.length)return;
  const movesBack=game.turn()==='w'?2:1;
  const at=Math.max(0,history.length-movesBack);
  setFen(history[at]);setHistory(history.slice(0,at));setSelected(null);setPending(null);
 };
 return <main className={"job-chess-page"+(embedded?" job-chess-embedded":"")}>
  <div className="job-chess-top">{!embedded&&<Link to="/" className="job-chess-back">← Back to Portfolio</Link>}<span>JOB BERNARDO / PLAY WITH ME</span></div>
  <header className="job-chess-heading"><span className="job-chess-kicker">YOUR NEXT MOVE</span><h1>Let's play <em>Chess.</em></h1><p>Challenge the computer. You play White — select a piece, then a highlighted square.</p></header>
  <div className="job-chess-layout">
   <section className="job-chess-panel" aria-label="Chess game">
    <div className="job-chess-player"><span className="job-chess-player-icon">♚</span> COMPUTER <span className="job-chess-color">BLACK</span></div>
    <div className="job-chess-board" role="grid" aria-label="Chess board, White at bottom">
     {Array.from({length:64},(_,i)=>{
      const row=Math.floor(i/8),col=i%8,square=(FILES[col]+(8-row)) as Square;
      const piece=game.get(square);
      const dark=(row+col)%2===0;
      const active=selected===square;
      const legal=legalTargets.includes(square);
      return <button key={square} type="button" role="gridcell" aria-label={square+(piece?' '+(piece.color==='w'?'White':'Black')+' '+piece.type:'')} onClick={()=>choose(square)}
       className={['job-chess-square',dark?'is-dark':'is-light',active?'is-selected':'',legal?'is-legal':''].filter(Boolean).join(' ')}>
        {col===0&&<small className="job-chess-rank">{8-row}</small>}
        {piece&&<span className={'job-chess-piece is-'+piece.color}>{GLYPHS[piece.color+piece.type]}</span>}
        {legal&&<span className={piece?'job-chess-capture':'job-chess-dot'}/>}
        {row===7&&<small className="job-chess-file">{FILES[col]}</small>}
       </button>;
     })}
    </div>
    <div className="job-chess-player"><span className="job-chess-player-icon">♔</span> YOU <span className="job-chess-color">WHITE</span></div>
   </section>
   <aside className="job-chess-sidebar">
    <div className="job-chess-info"><span className="job-chess-label">GAME STATUS</span><h2>{status}</h2><span>{game.history().length} moves played</span></div>
    <div className="job-chess-info"><label className="job-chess-label" htmlFor="chess-difficulty">DIFFICULTY</label><select id="chess-difficulty" value={difficulty} onChange={e=>setDifficulty(e.target.value as 'easy'|'medium')}><option value="easy">Easy</option><option value="medium">Medium</option></select></div>
    <div className="job-chess-buttons"><button onClick={restart}>↻ New Game</button><button onClick={undo} disabled={!history.length}>↶ Undo Turn</button></div>
    <div className="job-chess-info job-chess-tip"><span className="job-chess-label">HOW TO PLAY</span><p>Tap a white piece to see its available moves. Standard chess rules apply, including castling, en passant, and promotion.</p></div>
   </aside>
  </div>
  {pending&&<div className="job-chess-modal" role="dialog" aria-modal="true" aria-label="Choose promotion"><div><h2>Promote your pawn</h2><div className="job-chess-promotions">{(['q','r','b','n'] as const).map(p=><button key={p} onClick={()=>move(pending.from,pending.to,p)}>{GLYPHS['w'+p]}</button>)}</div><button className="job-chess-cancel" onClick={()=>setPending(null)}>Cancel</button></div></div>}
  <div className="job-chess-footer">Made to play · Built by Job Bernardo</div>
 </main>;
}
