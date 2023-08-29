import { component$, Slot, useSignal, useTask$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { GenreList } from "~/components/genrelist/genrelist";

import { ListPopulares } from "~/components/listpopulares/ListPopulares";
import { Footer } from "~/components/shared/footer/footer";
import { Header } from "~/components/shared/header/header";
import { Navbar } from "~/components/shared/navbar/navbar";
import { getRandom, getTrendingMovie, getTrendingTv } from "~/services/tmdb";
import type { MovieMediaDetails } from "~/services/types";
import { paths } from "~/utils/paths";

export const useRoute = routeLoader$<string>(async ({ pathname }) => {
  return pathname;
});

export const useContentLoader = routeLoader$(async (event) => {
  try {
    const [movies] = await Promise.all([
      getTrendingMovie({ page: 1 }),
      getTrendingTv({ page: 1 }),
    ]);

    const random = getRandom<MovieMediaDetails>({
      collections: [movies],
    });

    return random;
  } catch {
    throw event.redirect(302, paths.notFound);
  }
});

export default component$(() => {
  const route = useRoute();

  const randon = useContentLoader();

  const state = useSignal(false);

  useTask$(async ({ track }) => {
    track(() => {
      route.value;
    });
    if (route.value == "/") state.value = true;
    else state.value = false;
  });

  return (
    <div class="bg-[#0f0c13]">
      {state.value ? <Header images={randon.value} /> : <Navbar />}
      <main>
        <div class="grid grid-cols-1 md:grid-cols-5   gap-4 max-w-full p-4 ">
          <div class="col-span-1 md:col-span-4 text-white  mt-16">
            <Slot />
          </div>

          <div class="flex flex-col gap-3 mt-16">
            <GenreList />
            <ListPopulares />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
});
