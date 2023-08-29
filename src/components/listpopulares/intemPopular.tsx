import { component$ } from "@builder.io/qwik";
interface Props {
  poster_path?: string;
  title?: string;
  release_date?: string;
  i?: number;
  id?: string | number;
}
export const ItemPopular = component$(
  ({ poster_path, title, release_date, id }: Props) => {
    return (
      <>
        <div class="w-full flex items-center justify-start mt-3 group ">
          <span class=" border-4 border-blue-950  bg-gray-800 text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-md p-2 text-center inline-flex items-center ">
            <p
              class="w-5 h-5 text-md
             font-semibold  ordinal slashed-zero tabular-nums"
            >
              {id}
            </p>
          </span>
          <img
            width={50}
            height={50}
            class="mx-3  rounded-md cursor-pointer  md:max-w-none"
            src={poster_path}
            alt=""
          />
          <div class="flex flex-col group-hover:text-blue-800">
            <h2 class="text-xl font-bold text-white md:text-sm md:font-semibold group-hover:text-blue-600 group-hover:font-bold  ">
              {title}
            </h2>
            <p class="text-gray-400 text-md md:text-xs ">{release_date}</p>
          </div>{" "}
        </div>
      </>
    );
  }
);
