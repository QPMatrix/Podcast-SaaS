"use client";
import { AudioContext } from "@/provider/audio-provider";
import { useContext } from "react";
export const useAudio = () => {
  const ctx = useContext(AudioContext);
  if (!ctx) throw new Error("useAudio must be used within AudioProvider");
  return ctx;
};
