import { component$ } from "@builder.io/qwik";
import { type DocumentHead, routeLoader$, z } from "@builder.io/qwik-city";
import { MovieId } from "~/components/movieId/movieId";

import { getTvShow } from "~/services/tmdb";
import { paths } from "~/utils/paths";

export const useTvShowLoader = routeLoader$(async (event) => {
  const parseResult = z
    .object({ tvId: z.coerce.number().min(0).step(1) })
    .safeParse(event.params);

  if (!parseResult.success) {
    throw event.redirect(302, paths.notFound);
  }

  try {
    const tvShow = await getTvShow({ id: parseResult.data.tvId });
    return tvShow;
  } catch {
    throw event.redirect(302, paths.notFound);
  }
});

export default component$(() => {
  const resource = useTvShowLoader();

  return (
  
    <>


   
     <MovieId  media={resource.value} title="Cast" collection={resource.value.credits?.cast||[]}/>
    </>
  );
});

export const head: DocumentHead = {
  title: "Qwik City Movies",
};
