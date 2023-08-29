import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { routeLoader$ } from "@builder.io/qwik-city";
import { ListMovie } from "~/components/listMovie/listMovie";

import {
  getMovie,
  getRandomMedia,
  getTrendingMovie,
  getTrendingTv,
  getTvShow,
} from "~/services/tmdb";
import type { ProductionMedia } from "~/services/types";
import { paths } from "~/utils/paths";

import { getListItem } from "~/utils/format";

export const useContentLoader = routeLoader$(async (event) => {
  try {
    const [movies, tv] = await Promise.all([
      getTrendingMovie({ page: 1 }),
      getTrendingTv({ page: 1 }),
    ]);

    const random = getRandomMedia<ProductionMedia>({
      collections: [movies, tv],
    });

    const featuredTv =
      random.media_type === "tv" ? await getTvShow({ id: random.id }) : null;

    const featuredMovie =
      random.media_type === "movie" ? await getMovie({ id: random.id }) : null;

    return { featuredMovie, featuredTv, movies, tv };
  } catch {
    throw event.redirect(302, paths.notFound);
  }
});

export default component$(() => {
  const resource = useContentLoader();

  return (
    <>
      <ListMovie
        collection={resource.value.movies.results || []}
        title={getListItem({ query: "popular", type: "movie" })}
        viewAllHref={paths.movieCategory("popular")}
      />

      <ListMovie
        collection={resource.value.tv.results || []}
        title={getListItem({ query: "trending", type: "tv" })}
        viewAllHref={paths.tvCategory("trending")}
      />
    </>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
