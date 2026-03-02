"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mic } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { getBrandVoice, hasBrandVoice } from "@/lib/ai-memory";
import BrandVoiceTrainer from "@/components/features/brand-voice-trainer";
import { BrandVoice } from "@/types";

export default function BrandVoiceIndicator() {
  const [voice, setVoice] = useState<BrandVoice | null>(null);
  const [isSetup, setIsSetup] = useState(false);
  const [showTrainer, setShowTrainer] = useState(false);

  useEffect(() => {
    if (hasBrandVoice()) {
      setVoice(getBrandVoice());
      setIsSetup(true);
    }
  }, []);

  const handleComplete = () => {
    setVoice(getBrandVoice());
    setIsSetup(true);
    setShowTrainer(false);
  };

  return (
    <>
      {isSetup && voice ? (
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={() => setShowTrainer(true)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-50 border border-green-200 hover:bg-green-100 transition-colors"
        >
          <Mic className="w-3 h-3 text-green-600" />
          <span className="text-xs font-medium text-green-700">{voice.brandName}</span>
          <Badge variant="outline" className="text-[10px] text-green-600 border-green-200 capitalize">
            {voice.tone}
          </Badge>
        </motion.button>
      ) : (
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowTrainer(true)}
          className="text-xs"
        >
          <Mic className="w-3 h-3 mr-1" />
          Set Up Brand Voice
        </Button>
      )}

      <Dialog open={showTrainer} onOpenChange={setShowTrainer}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-0 border-0 bg-transparent shadow-none">
          <BrandVoiceTrainer onComplete={handleComplete} />
        </DialogContent>
      </Dialog>
    </>
  );
}
