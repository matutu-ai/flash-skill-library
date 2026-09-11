import { useEffect, useRef, type CSSProperties, type RefObject } from 'react';
import { ArrowDown } from 'lucide-react';

const BG_IMAGE_1 =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260609_195923_b0ba8ace-1d1d-4f2c-9a28-1ab84b330680.png&w=1280&q=85';
const BG_IMAGE_2 =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260609_201152_bba90a12-bf12-459f-91f0-51f237dbaf3b.png&w=1280&q=85';

const SPOTLIGHT_R = 260;

type RevealLayerProps = {
  image: string;
  sectionRef: RefObject<HTMLElement>;
};

function RevealLayer({ image, sectionRef }: RevealLayerProps) {
  const revealRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const reveal = revealRef.current;
    if (!section || !reveal) return;

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const target = { x: -999, y: -999 };
    const smooth = { x: -999, y: -999 };
    let frame = 0;
    let hasPointer = false;
    let isVisible = true;

    const paint = () => {
      reveal.style.setProperty('--spot', `${smooth.x.toFixed(2)}px ${smooth.y.toFixed(2)}px`);
    };

    const cancelFrame = () => {
      if (!frame) return;
      cancelAnimationFrame(frame);
      frame = 0;
    };

    const animate = () => {
      frame = 0;
      if (!isVisible || document.hidden || motionQuery.matches || !hasPointer) return;

      const dx = target.x - smooth.x;
      const dy = target.y - smooth.y;
      smooth.x += dx * 0.1;
      smooth.y += dy * 0.1;

      if (Math.abs(dx) < 0.1 && Math.abs(dy) < 0.1) {
        smooth.x = target.x;
        smooth.y = target.y;
      }

      paint();
      if (smooth.x !== target.x || smooth.y !== target.y) frame = requestAnimationFrame(animate);
    };

    const schedule = () => {
      if (!frame && isVisible && !document.hidden && !motionQuery.matches) {
        frame = requestAnimationFrame(animate);
      }
    };

    const setStaticReveal = () => {
      const rect = section.getBoundingClientRect();
      smooth.x = rect.width * 0.62;
      smooth.y = rect.height * 0.56;
      paint();
    };

    const handlePointerMove = (event: PointerEvent) => {
      const rect = section.getBoundingClientRect();
      target.x = event.clientX - rect.left;
      target.y = event.clientY - rect.top;
      if (!hasPointer) {
        smooth.x = target.x;
        smooth.y = target.y;
        hasPointer = true;
      }
      schedule();
    };

    const handleMotionPreference = () => {
      cancelFrame();
      if (motionQuery.matches) setStaticReveal();
      else {
        hasPointer = false;
        smooth.x = -999;
        smooth.y = -999;
        paint();
      }
    };

    const handleVisibility = () => {
      if (document.hidden) cancelFrame();
      else schedule();
    };

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      if (!isVisible) cancelFrame();
      else schedule();
    });
    const resizeObserver = new ResizeObserver(() => {
      if (motionQuery.matches) setStaticReveal();
    });

    section.addEventListener('pointermove', handlePointerMove, { passive: true });
    document.addEventListener('visibilitychange', handleVisibility);
    motionQuery.addEventListener('change', handleMotionPreference);
    intersectionObserver.observe(section);
    resizeObserver.observe(section);
    if (motionQuery.matches) setStaticReveal();

    return () => {
      cancelFrame();
      section.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('visibilitychange', handleVisibility);
      motionQuery.removeEventListener('change', handleMotionPreference);
      intersectionObserver.disconnect();
      resizeObserver.disconnect();
    };
  }, [image, sectionRef]);

  return (
    <div
      ref={revealRef}
      aria-hidden="true"
      className="lithos-reveal absolute inset-0 z-30 bg-center bg-cover bg-no-repeat pointer-events-none"
      style={{
        backgroundImage: `url(${image})`,
        '--spot-radius': `${SPOTLIGHT_R}px`,
      } as CSSProperties}
    />
  );
}

export default function App() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      id="lithos-hero"
      aria-label="Lithos interactive geology field note"
      className="lithos-hero relative w-full overflow-hidden h-screen bg-black tracking-[-0.02em]"
      style={{
        height: '100dvh',
        fontFamily: "'Avenir Next', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif",
      }}
    >
        <div
          className="absolute inset-0 z-10 bg-center bg-cover bg-no-repeat hero-zoom"
          style={{ backgroundImage: `url(${BG_IMAGE_1})` }}
        />

        <RevealLayer image={BG_IMAGE_2} sectionRef={sectionRef} />

        <div className="absolute top-[14%] left-0 right-0 z-50 flex flex-col items-center text-center px-5 pointer-events-none">
          <p
            className="mb-5 text-[9px] font-medium uppercase text-[#f4f2ea]/65 hero-anim hero-fade"
            style={{ letterSpacing: '0.2em', animationDelay: '0.12s' }}
          >
            Lithos / Interactive Geology
          </p>
          <h1 className="text-[#f4f2ea] leading-[0.95]">
            <span
              className="block font-playfair italic font-normal text-5xl sm:text-7xl md:text-8xl hero-anim hero-reveal"
              style={{ letterSpacing: '-0.05em', animationDelay: '0.25s' }}
            >
              Layers hold
            </span>
            <span
              className="block font-normal text-5xl sm:text-7xl md:text-8xl -mt-1 hero-anim hero-reveal"
              style={{ letterSpacing: '-0.08em', animationDelay: '0.42s' }}
            >
              tales of time
            </span>
          </h1>
        </div>

        <div
          className="hidden sm:block absolute bottom-14 left-10 md:left-14 z-50 max-w-[260px] hero-anim hero-fade"
          style={{ animationDelay: '0.7s' }}
        >
          <p
            className="mb-4 text-[8px] font-medium uppercase text-[#c59756]"
            style={{ letterSpacing: '0.18em' }}
          >
            Field note 01 / Deep time
          </p>
          <p className="text-sm text-[#f4f2ea]/75 leading-relaxed">
            Every layer of sediment records a chapter of our planet, from ancient seabeds to
            drifting ash, layered across millions of years beneath us.
          </p>
        </div>

        <div
          className="absolute bottom-10 sm:bottom-24 left-5 right-5 sm:left-auto sm:right-10 md:right-14 z-50 max-w-full sm:max-w-[260px] flex flex-col items-start gap-4 sm:gap-5 hero-anim hero-fade"
          style={{ animationDelay: '0.85s' }}
        >
          <p className="text-xs sm:text-sm text-[#f4f2ea]/75 leading-relaxed">
            Our interactive maps let you peel back the crust to trace how stones, fossils, and
            deep time combine to shape the ground beneath your feet.
          </p>
          <a
            href="#story"
            className="inline-flex items-center gap-5 rounded-[5px] bg-[#c59756] px-5 py-3.5 text-xs font-semibold text-[#253e33] transition-all hover:scale-[1.03] hover:bg-[#d0a76d] hover:shadow-lg hover:shadow-black/25 active:scale-95"
          >
            Start Digging
            <ArrowDown aria-hidden="true" size={15} strokeWidth={1.8} />
          </a>
        </div>
    </section>
  );
}
