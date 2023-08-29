import { Slot, component$ } from "@builder.io/qwik";
import { getMovie } from "~/services/tmdb";
import { paths } from "~/utils/paths";
import { routeLoader$, z } from "@builder.io/qwik-city";

export const useMovieLoader = routeLoader$(async (event) => {
  const parseResult = z
    .object({ name: z.coerce.number().min(0).step(1) })
    .safeParse(event.params);



  if (!parseResult.success) {
    throw event.redirect(302, paths.notFound);
  }

  try {
  const movie = await getMovie({ id: parseResult.data.name });

    return movie;
  } catch {
   throw event.redirect(302, paths.notFound);
  }
});

export default component$(() => {
  return (
    <>
      <Slot />
    </>
  );
});
