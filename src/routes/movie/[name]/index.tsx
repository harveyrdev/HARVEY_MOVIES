import { component$ } from "@builder.io/qwik";
import { MovieId } from "~/components/movieId/movieId";

import { useMovieLoader } from "../layout";

export default component$(() => {

  const resource = useMovieLoader();

  return (
    <>
      
          <MovieId  media={resource.value} title="Cast" collection={resource.value.credits?.cast||[]}/>
    
    </>
  );
});
