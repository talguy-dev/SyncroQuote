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
import { SERVICE_QUESTIONS } from './data/flowConfig';

function buildScreenList(selectedServices) {
  const screens = [
    { type: 'step1_1' },
    { type: 'step1_2' },
    { type: 'step1_3' },
    { type: 'step1_4' },
    { type: 'step1_5' },
  ];
  if (selectedServices?.length) {
    for (const svc of selectedServices) {
      const qs = SERVICE_QUESTIONS[svc] || [];
      qs.forEach((_, qi) => {
        screens.push({ type: 'step2', serviceId: svc, questionIndex: qi });
      });
    }
  }
  screens.push({ type: 'step3' });
  screens.push({ type: 'step4' });
  return screens;
}

function getScreenLabel(screen) {
  const labels = {
    step1_1: 'פרטים אישיים',
    step1_2: 'פרטי התקשרות',
    step1_3: 'פרטי פרויקט',
    step1_4: 'שלב הפרויקט',
    step1_5: 'בחירת שירותים',
    step2: 'שאלות שירות',
    step3: 'שאלות סגירה',
    step4: 'סיכום ואישור',
  };
  return labels[screen?.type] || '';
}

export default function App() {
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

  const handleGenerate = () => setShowSuccess(true);

  if (showSuccess) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="max-w-2xl mx-auto px-4 py-8">
          <Step5_Success data={formData} />
        </main>
      </div>
    );
  }

  const renderScreen = () => {
    const props = {
      data: formData,
      setData: setFormData,
      onNext: goNext,
      onBack: goBack,
      direction,
    };
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
        <Step4_Review {...props} onBack={goBack} onGenerate={handleGenerate} />
      );
      default: return null;
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      <div className="max-w-2xl mx-auto">
        <ProgressBar
          current={screenIndex + 1}
          total={total}
          label={getScreenLabel(current)}
        />
        <main className="px-4 py-6">
          {renderScreen()}
        </main>
      </div>
    </div>
  );
}

function Header() {
  return (
    <header style={{ backgroundColor: '#101218' }} className="text-white px-6 py-4">
      <div className="max-w-2xl mx-auto flex items-center justify-between">
        <div className="flex flex-col items-end gap-0.5">
          <span className="text-base font-bold tracking-wide">SYNCRO</span>
          <span className="text-[10px] tracking-widest uppercase" style={{ color: '#9ca3af' }}>
            Engineering Intelligence
          </span>
        </div>
        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#4175fc' }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <rect x="2" y="2" width="5" height="5" rx="1" fill="white" />
            <rect x="9" y="2" width="5" height="5" rx="1" fill="white" opacity="0.6" />
            <rect x="2" y="9" width="5" height="5" rx="1" fill="white" opacity="0.6" />
            <rect x="9" y="9" width="5" height="5" rx="1" fill="white" />
          </svg>
        </div>
      </div>
    </header>
  );
}
