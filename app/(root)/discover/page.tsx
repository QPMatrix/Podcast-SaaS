"use client";
import EmptyState from "@/components/empty-state";
import PodcastCard from "@/components/podcast-card";
import SearchBar from "@/components/search-bar";
import LoaderSpinner from "@/components/spinner";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import React from "react";

const Page = ({
  searchParams: { search },
}: {
  searchParams: { search: string };
}) => {
  const podcastData = useQuery(api.podcast.getPodcastBySearch, {
    search: search || "",
  });
  return (
    <div className="flex flex-col gap-9">
      <SearchBar />
      <div className="flex flex-col gap-9">
        <h1 className="text-20 font-bold text-white-1">Discover</h1>
        {podcastData ? (
          <>
            {podcastData.length > 0 ? (
              <div className="podcast_grid">
                {podcastData.map(
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
              <EmptyState title="No results found" />
            )}
          </>
        ) : (
          <LoaderSpinner />
        )}
      </div>
    </div>
  );
};

export default Page;
