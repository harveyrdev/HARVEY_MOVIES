import { component$, useSignal, useTask$ } from "@builder.io/qwik";
import { ItemPopular } from "./intemPopular";
import { Link } from "@builder.io/qwik-city";
import { getTrendingMovie } from "~/services/tmdb";
import type { MovieMediaDetails } from "~/services/types";
import { getPoster } from "~/services/images";

export const ListPopulares = component$(() => {
  const listPopular = useSignal<MovieMediaDetails[]>([]);

  useTask$(async () => {
    const populary = await getTrendingMovie({ page: 1 });
    const elementos = populary.results?.slice(0, 10);

    listPopular.value = elementos ?? [];
  });

  return (
    <>
      <div class="flex flex-col my-3 rounded-md h-auto  bg-[#120f18] ">
        <div class="border-l-4 border-l-blue-600  text-white m-3 p-2.5 tracking-normal font-semibold">
          PELICULAS POPULARES
        </div>
        <div class="  my-3 h-auto px-3  flex flex-col gap-3 ">
          {listPopular.value.map((item, index) => (
            <>
              <Link href={`/movie/${item.id}/`}>
                <ItemPopular
                  id={index + 1}
                  title={item.original_title}
                  poster_path={getPoster(item, "92")}
                  release_date="2022"
                />
              </Link>
            </>
          ))}
        </div>
      </div>
    </>
  );
});
