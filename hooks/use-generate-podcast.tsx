"use client";
import { useToast } from "@/components/ui/use-toast";
import { api } from "@/convex/_generated/api";
import { GeneratePodcastProps } from "@/types";
import { useUploadFiles } from "@xixixao/uploadstuff/react";
import { useAction, useMutation } from "convex/react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const useGeneratePodcast = ({
  setAudio,
  voiceType,
  voicePrompt,
  setAudioStorageId,
}: GeneratePodcastProps) => {
  const { toast } = useToast();
  const generateUploadUrl = useMutation(api.file.generateUploadUrl);
  const getPodcastAudio = useAction(api.openai.generateAudioAction);
  const getAudioUrl = useMutation(api.podcast.getUrl);
  const [isGenerating, setIsGenerating] = useState(false);
  const { startUpload } = useUploadFiles(generateUploadUrl);

  const generatePodcast = async () => {
    setIsGenerating(true);
    setAudio("");
    if (!voicePrompt) {
      toast({
        title: "Please provide a voice type to generate a podcast",
      });
      return setIsGenerating(false);
    }
    try {
      const res = await getPodcastAudio({
        voice: voiceType,
        input: voicePrompt,
      });
      const blob = new Blob([res], { type: "audio/mpeg" });
      const fileName = `podcast-${uuidv4()}.mp3`;
      const file = new File([blob], fileName, { type: "audio/mpeg" });
      const uploaded = await startUpload([file]);
      const storageId = (uploaded[0].response as any).storageId;
      setAudioStorageId(storageId);
      const audioUrl = await getAudioUrl({ storageId });
      setAudio(audioUrl!);
      toast({
        title: "Podcast generated successfully",
      });
    } catch (error) {
      console.log("error generating podcast", error);
      toast({
        title: "Error creating a podcast. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };
  return {
    isGenerating,
    generatePodcast,
  };
};
export default useGeneratePodcast;
