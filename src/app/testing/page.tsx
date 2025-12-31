"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function TestingPage() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: "", location: "" });
  const [submitted, setSubmitted] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; location?: string }>(
    {}
  );
  const [showErrors, setShowErrors] = useState<{
    name?: boolean;
    location?: boolean;
  }>({});

  const namePattern = /^[A-Za-zÀ-ÖØ-öø-ÿ'-\s]+$/;

  function validateField(field: "name" | "location", value: string) {
    if (!value) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
      return;
    }

    if (!namePattern.test(value)) {
      setErrors((prev) => ({
        ...prev,
        [field]: `Please enter a valid ${field} without numbers or special characters`,
      }));
    } else {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    validateField(name as "name" | "location", value);
    if (namePattern.test(value))
      setShowErrors((prev) => ({ ...prev, [name]: false }));
  }

  function handleNextStep() {
    if (step === 1) {
      if (!form.name.trim()) return;
      validateField("name", form.name);
      if (!namePattern.test(form.name)) {
        setShowErrors((prev) => ({ ...prev, name: true }));
        return;
      }
      setShowErrors((prev) => ({ ...prev, name: false }));
      setStep(2);
    } else if (step === 2) {
      handleSubmit(new Event("submit") as any);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      handleNextStep();
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.location.trim()) return;
    validateField("location", form.location);
    if (!namePattern.test(form.location)) {
      setShowErrors((prev) => ({ ...prev, location: true }));
      return;
    }
    setShowErrors((prev) => ({ ...prev, location: false }));
    setProcessing(true);

    (async () => {
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
          const text = await res.text();
          console.error("POST failed", res.status, text);
          return;
        }

        const data = await res.json();
        console.log("POST success", data);
        setSubmitted(true);
      } catch (err) {
        console.error("POST error", err);
      } finally {
        setProcessing(false);
      }
    })();
  }

  return (
    <div className="relative mb-18.75 min-h-[calc(100vh-150px)] flex flex-col items-center justify-center bg-white text-center">
      <div className="absolute top-0 left-5 uppercase font-bold text-xs">
        to start analysis
      </div>
      <form onSubmit={handleSubmit} className="relative z-10">
        {processing ? (
          <div className="py-8 flex flex-col items-center gap-3">
            <div
              className="flex items-center gap-2"
              role="status"
              aria-live="polite"
              aria-label="Processing"
            >
              <span
                className="w-4 h-4 bg-gray-500 rounded-full inline-block animate-loadingBounce"
                style={{ animationDelay: "0s" }}
              />
              <span
                className="w-4 h-4 bg-gray-500 rounded-full inline-block animate-loadingBounce"
                style={{ animationDelay: "0.12s" }}
              />
              <span
                className="w-4 h-4 bg-gray-500 rounded-full inline-block animate-loadingBounce"
                style={{ animationDelay: "0.24s" }}
              />
            </div>
            <p className="text-lg font-medium">Processing your submission…</p>
            <p className="text-sm text-[#6b7280]">This may take a moment.</p>
          </div>
        ) : submitted ? (
          <div className="py-8">
            <p className="text-2xl font-semibold">Thank you!</p>
            <p className="mt-2 text-sm text-[#6b7280]">
              Proceed for the next Step
            </p>
          </div>
        ) : (
          <div className="border-b relative flex flex-col">
            <p className="text-sm text-[#a0a4ab] tracking-wider mb-1">
              CLICK TO TYPE
            </p>
            <div>
              {step === 1 && (
                <>
                  {showErrors.name && errors.name && (
                    <div className="absolute w-full mb-3 inline-block bg-red-100 text-red-800 border border-red-200 px-3 py-1 rounded text-sm">
                      {errors.name}
                    </div>
                  )}
                  <input
                    autoFocus
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Introduce yourself"
                    className="text-center text-5xl sm:text-6xl focus:outline-none w-125"
                  />
                </>
              )}
              {step === 2 && (
                <>
                  {showErrors.location && errors.location && (
                    <div className="absolute w-full mb-3 inline-block bg-red-100 text-red-800 border border-red-200 px-3 py-1 rounded text-sm">
                      {errors.location}
                    </div>
                  )}
                  <input
                    autoFocus
                    type="text"
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Your city name"
                    className="text-center text-5xl sm:text-6xl focus:outline-none w-125 mt-5"
                  />
                </>
              )}
            </div>
          </div>
        )}
      </form>

      <div className="absolute rotate-45 w-100 h-100 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-dotted border-[#a0a4ab] animate-[spin_90s_linear_infinite]"></div>
      <div className="absolute rotate-45 w-125 h-125 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-dotted border-[#a0a4ab77] animate-[spin_70s_linear_infinite]"></div>
      <div className="absolute rotate-45 w-150 h-150 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-dotted border-[#a0a4ab33] animate-[spin_50s_linear_infinite]"></div>

      <Link
        href={"/"}
        className="absolute group flex gap-4 items-center -bottom-10 left-10 z-20 cursor-pointer"
      >
        <Image
          width={50}
          height={50}
          alt="back button"
          src={"/left-btn.png"}
          className="group-hover:scale-109 transition duration-200 "
        />
        <p className="uppercase font-semibold">back</p>
      </Link>

      {submitted && (
        <Link
          href={"/results"}
          className="absolute group flex gap-4 items-center -bottom-10 right-10 z-20 cursor-pointer animate-proceed"
          aria-label="Go to results"
        >
          <p className="uppercase font-semibold">proceed</p>
          <Image
            width={50}
            height={50}
            alt="proceed button"
            src={"/right-btn.png"}
            className="group-hover:scale-109 transition duration-200 "
          />
        </Link>
      )}
    </div>
  );
}
