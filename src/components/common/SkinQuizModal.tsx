import React, { useState } from 'react';
import { X, Sparkles, Check, ArrowRight, ArrowLeft } from 'lucide-react';
import { UserProfile } from '../../types';

interface SkinQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdateProfile: (skinProfile: UserProfile['skinProfile']) => void;
}

export const SkinQuizModal: React.FC<SkinQuizModalProps> = ({ isOpen, onClose, onUpdateProfile }) => {
  const [step, setStep] = useState(1);
  const [skinType, setSkinType] = useState('Combination');
  const [concerns, setConcerns] = useState<string[]>(['Hydration']);
  const [focus, setFocus] = useState('Hydration & Barrier Strength');

  if (!isOpen) return null;

  const skinTypeOptions = [
    { label: 'Combination', desc: 'Oily T-zone with normal to dry cheeks' },
    { label: 'Dry', desc: 'Tight, flaky, or dull without rich moisture' },
    { label: 'Oily', desc: 'Excess shine, visible pores throughout day' },
    { label: 'Sensitive', desc: 'Prone to redness, reactive to harsh actives' },
  ];

  const concernOptions = [
    'Hydration',
    'Redness & Irritation',
    'Fine Lines & Firmness',
    'Uneven Tone & Dark Spots',
    'Blemish & Congestion',
    'Pore Refining',
  ];

  const focusOptions = [
    'Hydration & Barrier Strength',
    'Radiance & Cell Renewal',
    'Deep Calming & Redness Relief',
    'Purifying & Oil Regulation',
  ];

  const toggleConcern = (concern: string) => {
    if (concerns.includes(concern)) {
      setConcerns(concerns.filter((c) => c !== concern));
    } else {
      setConcerns([...concerns, concern]);
    }
  };

  const handleFinish = () => {
    onUpdateProfile({
      type: skinType,
      concerns: concerns.length > 0 ? concerns : ['Hydration'],
      focus: focus,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-lg rounded-2xl luxury-shadow-lg overflow-hidden border border-[#e5e1dd] animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4 bg-[#fcf9f8] border-b border-[#ece8e5] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#516050]" />
            <span className="font-serif font-semibold text-[#1c1b1b]">Botanical Skin Diagnostic</span>
          </div>
          <button
            onClick={onClose}
            className="text-[#747872] hover:text-[#1c1b1b] p-1 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="h-1 bg-[#ece8e5] w-full">
          <div
            className="h-full bg-[#516050] transition-all duration-300"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>

        {/* Quiz Steps */}
        <div className="p-6">
          {step === 1 && (
            <div className="space-y-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#516050]">Step 1 of 3</span>
              <h3 className="font-serif text-xl font-medium text-[#1c1b1b]">How would you describe your skin archetype?</h3>
              <div className="space-y-2.5 pt-2">
                {skinTypeOptions.map((opt) => (
                  <button
                    key={opt.label}
                    onClick={() => setSkinType(opt.label)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between ${
                      skinType === opt.label
                        ? 'border-[#516050] bg-[#e8ede7]/50 text-[#1c1b1b] ring-1 ring-[#516050]'
                        : 'border-[#edeae7] hover:border-[#c4c8c0] text-[#444842]'
                    }`}
                  >
                    <div>
                      <p className="font-medium text-sm text-[#1c1b1b]">{opt.label}</p>
                      <p className="text-xs text-[#747872]">{opt.desc}</p>
                    </div>
                    {skinType === opt.label && <Check className="w-4 h-4 text-[#516050]" />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#516050]">Step 2 of 3</span>
              <h3 className="font-serif text-xl font-medium text-[#1c1b1b]">What are your primary skin goals?</h3>
              <p className="text-xs text-[#747872]">Select all that apply to your current skin cycle.</p>
              <div className="grid grid-cols-2 gap-2.5 pt-2">
                {concernOptions.map((concern) => {
                  const isSelected = concerns.includes(concern);
                  return (
                    <button
                      key={concern}
                      onClick={() => toggleConcern(concern)}
                      className={`p-3 rounded-xl text-left border text-xs font-medium transition-all flex items-center justify-between ${
                        isSelected
                          ? 'border-[#516050] bg-[#e8ede7]/50 text-[#1c1b1b] ring-1 ring-[#516050]'
                          : 'border-[#edeae7] hover:border-[#c4c8c0] text-[#444842]'
                      }`}
                    >
                      <span>{concern}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-[#516050]" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#516050]">Step 3 of 3</span>
              <h3 className="font-serif text-xl font-medium text-[#1c1b1b]">Select your primary ritual focus:</h3>
              <div className="space-y-2.5 pt-2">
                {focusOptions.map((f) => (
                  <button
                    key={f}
                    onClick={() => setFocus(f)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between ${
                      focus === f
                        ? 'border-[#516050] bg-[#e8ede7]/50 text-[#1c1b1b] ring-1 ring-[#516050]'
                        : 'border-[#edeae7] hover:border-[#c4c8c0] text-[#444842]'
                    }`}
                  >
                    <span className="text-sm font-medium text-[#1c1b1b]">{f}</span>
                    {focus === f && <Check className="w-4 h-4 text-[#516050]" />}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        <div className="px-6 py-4 bg-[#fcf9f8] border-t border-[#ece8e5] flex items-center justify-between">
          {step > 1 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="flex items-center gap-1 text-xs text-[#516050] font-medium hover:underline"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          {step < 3 ? (
            <button
              onClick={() => setStep(step + 1)}
              className="px-4 py-2 bg-[#516050] text-white text-xs font-medium rounded-lg hover:bg-[#435042] transition-colors flex items-center gap-1.5"
            >
              <span>Next Step</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={handleFinish}
              className="px-5 py-2 bg-[#1c1b1b] text-white text-xs font-medium rounded-lg hover:bg-[#333] transition-colors flex items-center gap-1.5"
            >
              <span>Save & Calibrate Ritual</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
