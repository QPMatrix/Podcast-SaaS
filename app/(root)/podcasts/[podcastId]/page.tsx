"use client";
import EmptyState from "@/components/empty-state";
import PodcastCard from "@/components/podcast-card";
import PodcastDetailsPlayer from "@/components/podcast-detail-player";
import LoaderSpinner from "@/components/spinner";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import Image from "next/image";
import React from "react";

const Page = ({
  params: { podcastId },
}: {
  params: { podcastId: Id<"podcasts"> };
}) => {
  const { user } = useUser();
  const podcast = useQuery(api.podcast.getPodcastById, { podcastId });
  const similarPodcast = useQuery(api.podcast.getPodcastByVoiceType, {
    podcastId,
  });
  if (!similarPodcast || !podcast) return <LoaderSpinner />;
  const isOwner = user?.id === podcast?.authorId;
  return (
    <section className="flex w-full flex-col">
      <header className="mt-9 flex items-center justify-between">
        <h1 className="text-12 font-bold text-white-1">Currently Playing</h1>
        <figure className="flex gap-3 ">
          <Image
            src="/icons/headphone.svg"
            width={24}
            height={24}
            alt="headphone"
          />
          <h2 className="text-16 font-bold text-white-1">{podcast?.views}</h2>
        </figure>
      </header>
      <PodcastDetailsPlayer
        isOwner={isOwner!}
        podcastId={podcast._id!}
        {...podcast!}
      />
      <p className="text-white-2 text-16 pb-8 pt-[45px] font-medium max-md:text-center">
        {podcast?.podcastDescription}
      </p>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4 ">
          <h1 className="font-bold text-white-1 text-18">Transcription</h1>
          <p className="text-16 font-medium text-white-2">
            {podcast?.voicePrompt}
          </p>
        </div>
        <div className="flex flex-col gap-4 ">
          <h1 className="font-bold text-white-1 text-18">Thumbnail Prompt</h1>
          <p className="text-16 font-medium text-white-2">
            {podcast?.imagePrompt}
          </p>
        </div>
      </div>
      <section className="mt-8 flex flex-col gap-5">
        <h1 className="text-20 font-bold text-white-1">Similar Podcast</h1>
        {similarPodcast && similarPodcast.length > 0 ? (
          <div>
            {similarPodcast?.map(
              ({ _id, imageUrl, podcastTitle, podcastDescription }) => (
                <PodcastCard
                  key={_id}
                  imgUrl={imageUrl!}
                  title={podcastTitle}
                  description={podcastDescription}
                  podcastId={_id}
                />
              )
            )}
          </div>
        ) : (
          <EmptyState
            title="No Similar podcast found"
            buttonLink="/discover"
            buttonText="Discover more podcasts "
          />
        )}
      </section>
    </section>
  );
};

export default Page;
