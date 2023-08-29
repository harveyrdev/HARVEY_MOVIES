/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { component$, useSignal, useTask$ } from "@builder.io/qwik";
import { Badge } from "../badge/badge";
import { Link } from "@builder.io/qwik-city";

import { type Genre } from "~/services/types";
import { getGenre } from "~/services/tmdb";

export const GenreList = component$(() => {
  const genre = useSignal<Genre[]>([]);
  useTask$(async () => {
    const resp = (await getGenre()) as Genre[];

    genre.value = resp.map(({ id, name }) => {
      return {
        id,
        name,
      };
    });
  });

  return (
    <>
      <div class="flex flex-col my-3 rounded-md h-auto  bg-[#120f18] ">
        <div class="border-l-4 border-l-blue-600 w-1/2 text-white m-3 p-2.5 tracking-normal font-semibold">
          CATEGORIAS
        </div>

        <div class=" overflow-y-auto overflow-x-hidden my-3 h-auto grid  grid-cols-2 px-3  md:grid-cols-1 lg:grid-cols-2 ">
          {genre.value
            ? genre.value.map(({ id, name }) => (
                <Link href={`/genre/${id}/movie/`} key={id}>
                  <Badge name={name} />
                </Link>
              ))
            : null}
        </div>
      </div>
    </>
  );
});
