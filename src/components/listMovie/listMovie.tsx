import { component$ } from "@builder.io/qwik";
import { Movie } from "../movie/movie";
import type { ProductionMedia } from "~/services/types";

type Props = {
  collection: ProductionMedia[];
  title: string;
  viewAllHref: string;
};

export const ListMovie = component$((props: Props) => {
  return (
    <>
      {props.title ? (
        <h1 class="text-xl md:text-2xl">
          {" "}
          Peliculas completas de {props.title}{" "}
        </h1>
      ) : (
        ""
      )}
      <div class="flex flex-col gap-1 md:gap-3 justify-center items-center">
        <div class="grid mt-3 mx-auto grid-cols-2  p-2  sm:grid-cols-3  md:grid-cols-4 xl:grid-cols-5 items-center justify-center">
          {props.collection.map((media) => (
            <div class="carousel-item" key={media.id}>
              <Movie media={media} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
});
