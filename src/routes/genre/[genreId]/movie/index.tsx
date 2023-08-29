import { component$, useSignal, useTask$ } from "@builder.io/qwik";
import {
  type DocumentHead,
  routeLoader$,
  server$,
  z,
} from "@builder.io/qwik-city";
import { MediaGrid } from "~/components/MediaGrid/MediaGrid";
import { getMediaByGenre } from "~/services/tmdb";
import type { ProductionMedia } from "~/services/types";
import { paths } from "~/utils/paths";

export const useGenreMovies = routeLoader$((event) => {
  const parseResult = z
    .object({ genreId: z.coerce.number().min(0).step(1) })
    .safeParse(event.params);

  if (!parseResult.success) {
    throw event.redirect(302, paths.notFound);
  }

  return getMediaByGenre({
    genre: parseResult.data.genreId,
    media: "movie",
    page: 1,
  });
});

export const getMore = server$(function (page: number) {
  const parseResult = z
    .object({
      genreId: z.coerce.number().min(0).step(1),
      page: z.coerce.number().int().min(1).default(1),
    })
    .parse({ genreId: this.params.genreId, page });

  return getMediaByGenre({
    genre: parseResult.genreId,
    media: "movie",
    page: parseResult.page,
  });
});

export default component$(() => {
  const containerRef = useSignal<Element | null>(null);

  const movies = useGenreMovies();

  const movietab = useSignal<ProductionMedia[]>(movies.value.results);
  useTask$(async ({ track }) => {
    track(() => movies.value.genre);

    if (movies.value.genre) {
      const moviese = await getMediaByGenre({
        genre: movies.value.genre.id,
        media: "movie",
        page: 1,
      });

      movietab.value = moviese.results;
    }
  });

  const currentPage = useSignal(1);

  return (
    <div
      class="flex max-h-screen flex-col overflow-y-scroll"
      ref={(e) => (containerRef.value = e)}
    >
      <h1 class="px-8 pt-4 text-4xl">{`Movie Genre: ${
        movies.value.genre?.name || "Not defined"
      }`}</h1>
      <MediaGrid
        collection={movietab.value}
        currentPage={currentPage.value}
        pageCount={movies.value.total_pages || 1}
        parentContainer={containerRef.value}
        onMore$={async () => {
          const data = await getMore(currentPage.value + 1);
          const newMedia = data.results;
          movietab.value = [...movietab.value, ...newMedia];
          currentPage.value += 1;
        }}
      />
    </div>
  );
});

export const head: DocumentHead = (event) => {
  const data = event.resolveValue(useGenreMovies);
  return data.genre ? { title: `${data.genre.name}  Pelis Harvey` } : {};
};
