"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Calculator, Clock, DollarSign, TrendingUp, Calendar } from "lucide-react";

function AnimatedNumber({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}) {
  const [display, setDisplay] = useState(value);
  const prevValue = useRef(value);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const start = prevValue.current;
    const end = value;
    const diff = end - start;
    if (diff === 0) return;

    const duration = 400; // ms
    const startTime = performance.now();

    function animate(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(start + diff * eased);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        prevValue.current = end;
      }
    }

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [value]);

  const formatted =
    decimals > 0
      ? display.toFixed(decimals)
      : Math.round(display).toLocaleString();

  return (
    <span>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}

export default function ROICalculatorSection() {
  const [piecesPerWeek, setPiecesPerWeek] = useState(5);
  const [hoursPerPiece, setHoursPerPiece] = useState(4);
  const [hourlyRate, setHourlyRate] = useState(50);

  const calculations = useMemo(() => {
    const currentHoursWeek = piecesPerWeek * hoursPerPiece;
    const withAIHoursWeek = Math.round(currentHoursWeek * 0.4 * 10) / 10; // 60% reduction
    const timeSavedWeek = currentHoursWeek - withAIHoursWeek;
    const moneySavedWeek = timeSavedWeek * hourlyRate;
    const moneySavedMonth = moneySavedWeek * 4.33;
    const moneySavedYear = moneySavedWeek * 52;
    const extraWorkDays = Math.round((timeSavedWeek * 52) / 8);

    return {
      currentHoursWeek,
      withAIHoursWeek,
      timeSavedWeek,
      moneySavedWeek,
      moneySavedMonth,
      moneySavedYear,
      extraWorkDays,
    };
  }, [piecesPerWeek, hoursPerPiece, hourlyRate]);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4"
          >
            <Calculator className="w-4 h-4" />
            ROI Calculator
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-4"
          >
            How Much Time{" "}
            <span className="gradient-text">Will You Save?</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Use the calculator below to see how much time and money Content.ai
            can save you every week.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="max-w-5xl mx-auto"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Inputs */}
            <div className="bg-white rounded-2xl border border-primary/10 shadow-sm p-6 sm:p-8 space-y-8">
              <h3 className="font-display text-lg font-semibold text-foreground">
                Your Current Workflow
              </h3>

              {/* Pieces per week */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-medium text-foreground">
                    Content pieces per week
                  </label>
                  <span className="text-sm font-bold text-secondary">
                    {piecesPerWeek}
                  </span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={20}
                  value={piecesPerWeek}
                  onChange={(e) => setPiecesPerWeek(Number(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer bg-primary/10 accent-secondary"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>1</span>
                  <span>10</span>
                  <span>20</span>
                </div>
              </div>

              {/* Hours per piece */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-medium text-foreground">
                    Hours per piece currently
                  </label>
                  <span className="text-sm font-bold text-secondary">
                    {hoursPerPiece}h
                  </span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={8}
                  value={hoursPerPiece}
                  onChange={(e) => setHoursPerPiece(Number(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer bg-primary/10 accent-secondary"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>1h</span>
                  <span>4h</span>
                  <span>8h</span>
                </div>
              </div>

              {/* Hourly rate */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-medium text-foreground">
                    Your hourly rate
                  </label>
                  <span className="text-sm font-bold text-secondary">
                    ${hourlyRate}
                  </span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={200}
                  step={5}
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(Number(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer bg-primary/10 accent-secondary"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>$10</span>
                  <span>$100</span>
                  <span>$200</span>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="bg-gradient-to-br from-primary via-primary-600 to-primary-800 rounded-2xl p-6 sm:p-8 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-secondary/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent/10 rounded-full blur-3xl" />

              <div className="relative space-y-6">
                <h3 className="font-display text-lg font-semibold text-white/90">
                  Your Savings
                </h3>

                {/* Time comparison */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-white/60" />
                      <span className="text-sm text-white/70">
                        Current time spent
                      </span>
                    </div>
                    <span className="text-sm font-semibold text-white/90">
                      <AnimatedNumber
                        value={calculations.currentHoursWeek}
                        suffix=" hrs/week"
                      />
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-green-400" />
                      <span className="text-sm text-white/70">
                        With Content AI
                      </span>
                    </div>
                    <span className="text-sm font-semibold text-green-400">
                      <AnimatedNumber
                        value={calculations.withAIHoursWeek}
                        suffix=" hrs/week"
                        decimals={1}
                      />
                    </span>
                  </div>
                  <div className="h-px bg-white/10" />
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-accent-300">
                      Time saved
                    </span>
                    <span className="text-lg font-bold text-accent-300">
                      <AnimatedNumber
                        value={calculations.timeSavedWeek}
                        suffix=" hrs/week"
                        decimals={1}
                      />
                    </span>
                  </div>
                </div>

                {/* Money saved */}
                <div className="bg-white/10 rounded-xl p-4 space-y-3">
                  <div className="flex items-center gap-2 mb-1">
                    <DollarSign className="w-4 h-4 text-accent-300" />
                    <span className="text-sm font-medium text-white/90">
                      Money saved
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="text-center">
                      <div className="text-lg font-bold text-white">
                        <AnimatedNumber
                          value={calculations.moneySavedWeek}
                          prefix="$"
                        />
                      </div>
                      <div className="text-[10px] text-white/50 uppercase tracking-wider">
                        Per Week
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-white">
                        <AnimatedNumber
                          value={calculations.moneySavedMonth}
                          prefix="$"
                        />
                      </div>
                      <div className="text-[10px] text-white/50 uppercase tracking-wider">
                        Per Month
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-accent-300">
                        <AnimatedNumber
                          value={calculations.moneySavedYear}
                          prefix="$"
                        />
                      </div>
                      <div className="text-[10px] text-white/50 uppercase tracking-wider">
                        Per Year
                      </div>
                    </div>
                  </div>
                </div>

                {/* Extra work days callout */}
                <div className="flex items-center gap-3 bg-accent/20 rounded-xl p-4">
                  <Calendar className="w-8 h-8 text-accent-300 shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-white">
                      That&apos;s like getting{" "}
                      <span className="text-accent-300">
                        <AnimatedNumber
                          value={calculations.extraWorkDays}
                        />
                      </span>{" "}
                      extra work days per year
                    </p>
                    <p className="text-xs text-white/60 mt-0.5">
                      Imagine what you could create with all that extra time
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
