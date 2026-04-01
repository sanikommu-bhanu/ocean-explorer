'use client';
import { memo, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useOcean }        from '../hooks/useOcean';
import { SECTIONS }        from '../lib/data';
import Cursor              from '../components/Cursor';
import Intro               from '../components/Intro';
import Nav                 from '../components/Nav';
import VideoStack          from '../components/VideoStack';
import DepthFX             from '../components/DepthFX';
import Particles           from '../components/Particles';
import SignatureMoment     from '../components/SignatureMoment';
import ContentPanel        from '../components/ContentPanel';
import Progress            from '../components/Progress';
import StatusBar           from '../components/StatusBar';
import ScrollHint          from '../components/ScrollHint';
import ModeOverlay, { OverlayMode } from '../components/ModeOverlay';
const StableVideoStack = memo(VideoStack);
export default function Page() {
  const router = useRouter();
  const { current, progress, goTo, cfg } = useOcean();
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [mode, setMode] = useState<OverlayMode>('none');

  useEffect(() => {
    const prev = document.body.style.cursor;
    document.body.style.cursor = 'none';
    const onMove = (e: MouseEvent) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', onMove);
    return () => {
      document.body.style.cursor = prev;
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  const onJourney = () => {
    goTo(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMode('none');
  };

  return (
    <>
      <Cursor />
      <Intro />
      <Nav
        onJourney={onJourney}
        onDiscover={() => setMode('discover')}
        onProject={() => setMode('project')}
        onAbout={() => setMode('about')}
        onTakeAction={() => router.push('/take-action')}
      />
      <Progress total={SECTIONS.length} current={current} progress={progress} onGo={goTo} />
      <StatusBar cfg={cfg} progress={progress} />
      <ScrollHint visible={current === 0} />
      <div className="fixed inset-0 overflow-hidden" style={{background:'#010810'}}>
        <StableVideoStack current={current} mouseX={mouse.x} mouseY={mouse.y} />
        <DepthFX cfg={cfg} idx={current} />
        <Particles active={cfg.particles} density={cfg.abyss ? 1.6 : 1} />
        <SignatureMoment show={cfg.signature} />
        <ModeOverlay mode={mode} onClose={() => setMode('none')} onJoinSuccess={() => setMode('none')} />
        <div className="absolute inset-0 z-[150] pointer-events-none">
          {SECTIONS.map(sec => (
            <ContentPanel key={sec.id} section={sec} active={sec.id === current} onTakeAction={() => router.push('/take-action')} />
          ))}
        </div>
      </div>
    </>
  );
}
