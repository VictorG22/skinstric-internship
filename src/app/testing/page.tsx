"use client";

import React, { useState } from "react";
import BackButton from "@/components/UI/BackButton";
import ForwardButton from "@/components/UI/ForwardButton";
import LoadingDots from "@/components/UI/LoadingDots";
import BackgroundSquare from "@/components/UI/BackgroundSquare";

type Step = 1 | 2;

interface FormState {
  name: string;
  location: string;
}

interface ErrorState {
  name?: string;
  location?: string;
}

interface ShowErrorsState {
  name?: boolean;
  location?: boolean;
}

export default function TestingPage() {
  const [step, setStep] = useState<Step>(1);
  const [form, setForm] = useState<FormState>({ name: "", location: "" });
  const [errors, setErrors] = useState<ErrorState>({});
  const [showErrors, setShowErrors] = useState<ShowErrorsState>({});
  const [processing, setProcessing] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const namePattern = /^[A-Za-zÀ-ÖØ-öø-ÿ'-\s]+$/;

  /* ---------------- validation ---------------- */

  function validateField(field: keyof FormState, value: string): boolean {
    if (!value.trim()) {
      setErrors((p) => ({ ...p, [field]: undefined }));
      return false;
    }

    if (!namePattern.test(value)) {
      const message = `Please enter a valid ${field} without numbers or special characters`;
      setErrors((p) => ({ ...p, [field]: message }));
      return false;
    }

    setErrors((p) => ({ ...p, [field]: undefined }));
    return true;
  }

  /* ---------------- handlers ---------------- */

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setForm((p) => ({ ...p, [name]: value }));

    if (validateField(name as keyof FormState, value)) {
      setShowErrors((p) => ({ ...p, [name]: false }));
    }
  }

  function handleNextStep() {
    if (step === 1) {
      const valid = validateField("name", form.name);
      setShowErrors((p) => ({ ...p, name: !valid }));
      if (valid) setStep(2);
      return;
    }

    submitForm();
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      handleNextStep();
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    submitForm();
  }

  /* ---------------- submit logic ---------------- */

  async function submitForm() {
    const valid = validateField("location", form.location);
    setShowErrors((p) => ({ ...p, location: !valid }));
    if (!valid) return;

    setProcessing(true);

    try {
      const res = await fetch(
        "https://us-central1-frontend-simplified.cloudfunctions.net/skinstricPhaseOne",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );

      if (!res.ok) {
        console.error("POST failed", res.status, await res.text());
        return;
      }

      await res.json();
      setSubmitted(true);
    } catch (err) {
      console.error("POST error", err);
    } finally {
      setProcessing(false);
    }
  }

  /* ---------------- render ---------------- */

  return (
    <div className="relative min-h-[calc(100vh-150px)] flex flex-col items-center justify-center bg-white text-center">
      <div className="absolute top-0 left-10 uppercase font-bold text-xs">
        to start analysis
      </div>

      <form onSubmit={handleSubmit} className="relative z-10">
        {processing ? (
          <div className="py-8 flex flex-col items-center gap-2">
            <p className="text-xl md:text-3xl font-medium">
              Processing your submission…
            </p>
            <p className="text-sm md:text-lg text-gray-500 mb-6">
              This may take a moment.
            </p>
            <LoadingDots />
          </div>
        ) : submitted ? (
          <div className="py-8">
            <p className="text-xl md:text-4xl font-semibold">Thank you!</p>
            <p className="mt-2 text-lg md:text-2xl text-gray-500">
              Proceed for the next step
            </p>
          </div>
        ) : (
          <div className="border-b relative flex flex-col mx-auto w-[65%]">
            <p className="text-xs sm:text-sm text-gray-400 tracking-wider mb-1">
              CLICK TO TYPE
            </p>

            {step === 1 && (
              <>
                {showErrors.name && errors.name && (
                  <ErrorBanner message={errors.name} />
                )}
                <Input
                  name="name"
                  value={form.name}
                  placeholder="Introduce yourself"
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                />
              </>
            )}

            {step === 2 && (
              <>
                {showErrors.location && errors.location && (
                  <ErrorBanner message={errors.location} />
                )}
                <Input
                  name="location"
                  value={form.location}
                  placeholder="Your city name"
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                />
              </>
            )}
          </div>
        )}
      </form>

      {/* background */}
      <BackgroundSquare
        size= {60}
        bigSize= {100}
        animation="animate-[spin_90s_linear_infinite]"
        color="#a0a4ab"
      />
      <BackgroundSquare
        size={85}
        bigSize={125}
        animation="animate-[spin_70s_linear_infinite]"
        color="#a0a4ab77"
      />
      <BackgroundSquare
        size={110}
        bigSize={150}
        animation="animate-[spin_50s_linear_infinite]"
        color="#a0a4ab33"
      />

      <BackButton prevLink="/" yPosition={-40} xDirection="10" invert={false} color="" />

      {submitted && (
        <ForwardButton
          btnTxt="Proceed"
          nextLink="/results"
          yPosition={-20}
          animation="animate-proceed"
        />
      )}
    </div>
  );
}

/* ---------------- small components ---------------- */

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      autoFocus
      {...props}
      className="text-center tracking-tighter text-4xl md:text-6xl w-full focus:outline-none"
    />
  );
}

function ErrorBanner({ message }: { message: string }) {
  return (
    <div className="inline-block bg-red-100 text-red-800 border border-red-200 px-3 py-1 rounded text-sm mb-2">
      {message}
    </div>
  );
}
