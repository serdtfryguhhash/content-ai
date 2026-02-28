"use client";

import { useState, useCallback } from "react";
import { AIResponse } from "@/types";
import { useApp } from "@/context/AppContext";

interface UseAIGenerationOptions {
  endpoint: string;
  onSuccess?: (data: unknown) => void;
  onError?: (error: string) => void;
}

export function useAIGeneration<T>({ endpoint, onSuccess, onError }: UseAIGenerationOptions) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { addNotification, credits } = useApp();

  const generate = useCallback(
    async (params: Record<string, unknown>) => {
      setLoading(true);
      setError(null);

      if (credits <= 0) {
        const errMsg = "No credits remaining. Please upgrade your plan.";
        setError(errMsg);
        addNotification({
          id: Date.now().toString(),
          type: "error",
          title: "No Credits",
          message: errMsg,
        });
        setLoading(false);
        return null;
      }

      try {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(params),
        });

        const result: AIResponse<T> = await response.json();

        if (!result.success) {
          throw new Error(result.error || "Generation failed");
        }

        setData(result.data || null);
        onSuccess?.(result.data);
        addNotification({
          id: Date.now().toString(),
          type: "success",
          title: "Generated Successfully",
          message: `Content created. ${result.credits_remaining} credits remaining.`,
        });
        return result.data;
      } catch (err) {
        const errMsg = err instanceof Error ? err.message : "An unexpected error occurred";
        setError(errMsg);
        onError?.(errMsg);
        addNotification({
          id: Date.now().toString(),
          type: "error",
          title: "Generation Failed",
          message: errMsg,
        });
        return null;
      } finally {
        setLoading(false);
      }
    },
    [endpoint, onSuccess, onError, addNotification, credits]
  );

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  return { data, loading, error, generate, reset };
}
