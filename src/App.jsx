import { useState, useCallback } from 'react';
import './index.css';
import ProgressBar from './components/ProgressBar';
import {
  Screen1_1, Screen1_2, Screen1_3, Screen1_4, Screen1_5,
} from './steps/Step1_Contact';
import Step2_Services from './steps/Step2_Services';
import Step3_Closing from './steps/Step3_Closing';
import Step4_Review from './steps/Step4_Review';
import Step5_Success from './steps/Step5_Success';
import IntroScreen from './steps/IntroScreen';
import { SERVICE_QUESTIONS } from './data/flowConfig';

const PHASE_META = {
  contact:     { label: 'פרטים',  color: '#7a8a9a' },
  consulting:  { label: 'ייעוץ',  color: '#E8931A' },
  supervision: { label: 'פיקוח', color: '#E8931A' },
  management:  { label: 'ניהול',  color: '#E8931A' },
  bim:         { label: 'BIM',    color: '#E8931A' },
  closing:     { label: 'סיכום', color: '#0D1B2A' },
};

function buildScreenList(selectedServices) {
  const screens = [
    { type: 'step1_1', phaseId: 'contact' },
    { type: 'step1_2', phaseId: 'contact' },
    { type: 'step1_3', phaseId: 'contact' },
    { type: 'step1_4', phaseId: 'contact' },
    { type: 'step1_5', phaseId: 'contact' },
  ];
  if (selectedServices?.length) {
    for (const svc of selectedServices) {
      const qs = SERVICE_QUESTIONS[svc] || [];
      qs.forEach((_, qi) => {
        screens.push({ type: 'step2', serviceId: svc, questionIndex: qi, phaseId: svc });
      });
    }
  }
  screens.push({ type: 'step3', phaseId: 'closing' });
  screens.push({ type: 'step4', phaseId: 'closing' });
  return screens;
}

function getPhaseList(screens) {
  const seen = new Set();
  const phases = [];
  for (const s of screens) {
    if (!seen.has(s.phaseId)) {
      seen.add(s.phaseId);
      phases.push(s.phaseId);
    }
  }
  return phases;
}

function getPhaseProgress(screens, screenIndex) {
  const currentPhaseId = screens[screenIndex]?.phaseId;
  if (!currentPhaseId) return { current: 1, total: 1 };
  const phaseIndices = screens
    .map((s, i) => (s.phaseId === currentPhaseId ? i : -1))
    .filter(i => i >= 0);
  const pos = phaseIndices.indexOf(screenIndex);
  return { current: pos + 1, total: phaseIndices.length };
}

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [formData, setFormData] = useState({});
  const [screenIndex, setScreenIndex] = useState(0);
  const [direction, setDirection] = useState('forward');
  const [showSuccess, setShowSuccess] = useState(false);

  const screens = buildScreenList(formData.selectedServices);
  const current = screens[screenIndex];
  const total = screens.length;

  const goNext = useCallback(() => {
    setDirection('forward');
    setScreenIndex((i) => Math.min(i + 1, screens.length - 1));
  }, [screens.length]);

  const goBack = useCallback(() => {
    setDirection('backward');
    setScreenIndex((i) => Math.max(i - 1, 0));
  }, []);

  const goToSection = useCallback((target) => {
    setDirection('backward');
    if (target.type === 'general') {
      setScreenIndex(0);
    } else if (target.type === 'services') {
      setScreenIndex(4);
    } else if (target.type === 'service') {
      const idx = screens.findIndex((s) => s.type === 'step2' && s.serviceId === target.serviceId);
      if (idx >= 0) setScreenIndex(idx);
    }
  }, [screens]);

  const handleGenerate = () => setShowSuccess(true);

  const handleReset = () => {
    setFormData({});
    setScreenIndex(0);
    setDirection('forward');
    setShowSuccess(false);
    setShowIntro(true);
  };

  if (showIntro) {
    return <IntroScreen onStart={() => setShowIntro(false)} />;
  }

  if (showSuccess) {
    return (
      <div className="flex flex-col flex-1">
        <Header />
        <div className="flex-1 flex flex-col">
          <Step5_Success />
        </div>
      </div>
    );
  }

  const props = {
    data: formData,
    setData: setFormData,
    onNext: goNext,
    onBack: goBack,
    direction,
  };

  const renderScreen = () => {
    switch (current?.type) {
      case 'step1_1': return <Screen1_1 {...props} />;
      case 'step1_2': return <Screen1_2 {...props} />;
      case 'step1_3': return <Screen1_3 {...props} />;
      case 'step1_4': return <Screen1_4 {...props} />;
      case 'step1_5': return <Screen1_5 {...props} />;
      case 'step2':   return (
        <Step2_Services
          {...props}
          serviceId={current.serviceId}
          questionIndex={current.questionIndex}
        />
      );
      case 'step3': return <Step3_Closing {...props} />;
      case 'step4': return (
        <Step4_Review {...props} onBack={goBack} onGenerate={handleGenerate} onNavigateTo={goToSection} />
      );
      default: return null;
    }
  };

  return (
    <div className="flex flex-col flex-1">
      <Header />
      <ProgressBar
        phases={getPhaseList(screens)}
        currentPhaseId={current?.phaseId}
        phaseProgress={getPhaseProgress(screens, screenIndex)}
        phaseMeta={PHASE_META}
      />
      <main className="flex-1 px-4 py-5 overflow-y-auto">
        {renderScreen()}
      </main>
    </div>
  );
}

function Header() {
  return (
    <header
      className="flex items-center justify-between px-5 py-3.5 shrink-0"
      style={{ backgroundColor: '#0D1B2A' }}
    >
      {/* Syncro logo mark */}
      <svg width="36" height="36" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" rx="16" fill="#0D1B2A" />
        <g fill="none" stroke="#E8931A" strokeWidth="6" strokeLinecap="round">
          <circle cx="50" cy="50" r="22" strokeDasharray="110.6 27.6" transform="rotate(180 50 50)" />
          <circle cx="50" cy="50" r="14.5" strokeDasharray="54.6 36.4" transform="rotate(180 50 50)" />
          <circle cx="50" cy="50" r="7" strokeDasharray="18.2 27.3" transform="rotate(180 50 50)" />
        </g>
      </svg>
      <div className="flex flex-col items-end gap-0.5">
        <span className="text-sm font-bold tracking-wide text-white">SYNCRO</span>
        <span
          className="text-[9px] tracking-widest uppercase"
          style={{ color: '#9ca3af' }}
        >
          Engineering Intelligence
        </span>
      </div>
    </header>
  );
}
