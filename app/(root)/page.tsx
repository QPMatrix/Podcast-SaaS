"use client";
import PodcastCard from "@/components/podcast-card";
import { podcastData } from "@/constants";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import React from "react";

const Home = () => {
  return (
    <div className="mt-9 flex flex-col gap-9">
      <section className="flex flex-col gap-5">
        <h1 className="text-20 font-bold text-white-1">Trending Podcast</h1>
        <div className="podcast_grid">
          {podcastData.map(({ id, imgURL, title, description }) => (
            <PodcastCard
              key={id}
              imgURL={imgURL}
              title={title}
              description={description}
              podcastId={id}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
