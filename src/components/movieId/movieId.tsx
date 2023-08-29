import { component$, useSignal } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";

// Icons
import { EyeIcon } from "~/assets/icons/eye-icon";
import { SharedIcon } from "~/assets/icons/shared-icon";
import { StarIcon } from "~/assets/icons/star-icon";
import { getPoster, getPosterSet } from "~/services/images";
import type { MovieMediaDetails, PersonMedia } from "~/services/types";
import { formatDateYear, formatRuntime } from "~/utils/format";
import { PersonCarousel } from "./PersonCarousel";
import { paths } from "~/utils/paths";
import { ExternalLinksId } from "../ExternalLinksId/ExternalLinksId";

type Props = {
  media: MovieMediaDetails;
  collection: PersonMedia[];
  title: string;
};

export const MovieId = component$((props: Props) => {
  const open = useSignal(false);



  return (
    <>
      <div class="flex flex-col col-span-2">
        <div class="grid grid-cols-4  ">
          <div class="flex flex-col ml-3 md:col-span-2 lg:col-span-1">
            <img
              width={100}
              height={100}
              class="w-full h-auto rounded-md"
              src={getPoster(props.media, "92")}
              srcSet={getPosterSet(props.media, "342")}
              alt=""
            />

            {props.media.videos?.results ? (
              <>
                {props.media.videos.results.length > 0 ? (
                  <button
                    data-modal-target="defaultModal"
                    data-modal-toggle="defaultModal"
                    onClick$={() => (open.value = true)}
                    type="button"
                    class="text-white bg-blue-500 hover:bg-blue-400/90 focus:ring-3 focus:ring-[#2557D6]/50 focus:outline-none font-semibold rounded-lg  text-[10px] md:text-sm  px-5 py-1 md:py-2 text-center inline-flex items-center   mb-2  mt-3"
                  >
                    <svg
                      class="w-10 h-3 mr-2 -ml-1 text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 14 16"
                    >
                      <path d="M0 .984v14.032a1 1 0 0 0 1.506.845l12.006-7.016a.974.974 0 0 0 0-1.69L1.506.139A1 1 0 0 0 0 .984Z" />
                    </svg>
                    VER TRAILER
                  </button>
                ) : null}
              </>
            ) : null}

            {open.value ? (
              <>
                <div
                  id="defaultModal"
                  class="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                >
                  <div class="relative w-full max-w-2xl max-h-full">
                    {/*content*/}
                    <div class="bg-white rounded-lg shadow dark:bg-gray-700">
                      {/*header*/}
                      <div class="flex items-start justify-between  rounded-t">
                        <button
                          onClick$={() => (open.value = false)}
                          type="button"
                          class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                          data-modal-hide="defaultModal"
                        >
                          <svg
                            class="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 14"
                          >
                            <path
                              stroke="currentColor"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                            />
                          </svg>
                          <span class="sr-only">Close modal</span>
                        </button>
                      </div>
                      {/*body*/}
                      <div class="relative  flex-auto">
                        {props.media.videos?.results ? (
                          <iframe
                            class="h-96 max-w-full w-full"
                            title="Youtube player"
                            sandbox="allow-same-origin allow-forms allow-popups allow-scripts allow-presentation"
                            src={`https://youtube.com/embed/${props.media.videos.results[0].key}?autoplay=1&mute=1`}
                            allow="autoplay; encrypted-media"
                            allowFullScreen
                          ></iframe>
                        ) : null}
                      </div>
                      {/*footer*/}
                    </div>
                  </div>
                </div>
                <div class="opacity-50 fixed inset-0 z-40 bg-black"></div>
              </>
            ) : null}
          </div>

          <div class="flex flex-col col-span-2 lg:col-span-3  justify-center md:justify-start">
            <div class="flex flex-wrap gap-1 mt-3 items-center   text-gray-500 ml-2.5">
              <h1 class="font-semibold text-2xl md:text-4xl text-white ">
              {props.media.title || props.media.original_title}
              </h1>

              <div class="flex  ml-0  md:ml-2 ">
                <p class="  oldstyle-nums text-gray-300">
                  {formatDateYear(props.media.release_date)}
                </p>
                <span class="  font-thin ml-3">
                  {" "}
                  {props.media.runtime ? (
                    <> {formatRuntime(props.media.runtime)}</>
                  ) : null}{" "}
                </span>
                <span class=" flex  r ml-3  font-medium">
                  <EyeIcon />
                  {props.media.vote_average}
                </span>
              </div>
            </div>
            <div class="flex flex-wrap gap-1 mt-3 items-center ml-2.5 text-gray-500 justify-between">
              <div class="flex">
                <span class="text-white bg-transparent rounded-full p-3 border-r-4 border-indigo-500  border ">
                  <p class="w-5 h-5 font-bold text-sm text-white align-bottom  text-center">
                    4
                  </p>
                </span>

                <div class="flex flex-col items-start ml-3 ">
                  <div class="flex items-center">
                    <StarIcon
                      rating={props.media.vote_average}
                      style="text-yellow-400"
                    />
                  </div>

                  <span class=" font-medium text-gray-500 text-xs">
                    {props.media.vote_count} Votos
                  </span>
                </div>
              </div>

              <div class="flex ">
                <span class="flex items-center ">
                  <SharedIcon />
                  <p class="text-sm font-bold text-slate-200 ml-2">Compartir</p>
                </span>

                <ExternalLinksId
                  links={{
                    ...props.media.external_ids,
                    homepage: props.media.homepage,
                  }}
                  media={props.media.media_type}
                />
              </div>

              <div class=" flex-col h-80 overflow-y-auto   hidden  md:flex ">
                <p class="text-gray-400">
                  <>{props.media.overview}</>
                </p>

                <span class="text-lg font-medium text-white mt-3">
                  {" "}
                  {props.media.title}
                </span>
                <div class=" flex-col  mt-5  hidden  md:flex ">
                  <h2 class="text-gray-400 font-light text-lg"> Géneros</h2>

                  <div class="flex ">
                    {props.media.media_type && props.media.genres ? (
                      <>
                        <div>
                          {props.media.genres.map(
                            (genre) =>
                              props.media.media_type && (
                                <>
                                  <Link
                                    href={paths.genre(
                                      props.media.media_type,
                                      genre.id
                                    )}
                                  >
                                    <span class="cursor-pointer text-xs font-medium mr-2 px-2.5 py-0.5 rounded bg-gray-700 text-gray-300">
                                      {genre.name}
                                    </span>
                                  </Link>
                                </>
                              )
                          )}
                        </div>
                      </>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="flex flex-col h-80 overflow-y-auto   md:hidden">
          <p class="text-gray-400">{props.media.overview}</p>

          <span class="text-lg font-medium text-white mt-3">
            {" "}
            Ver  {props.media.title || props.media.original_title}
          </span>

          <div class="flex flex-col mt-5  md:hidden">
            <h2 class="text-gray-400 font-light text-lg"> Géneros</h2>
            <div class="flex ">
            {props.media.media_type && props.media.genres ? (
                      <>
                        <div>
                          {props.media.genres.map(
                            (genre) =>
                              props.media.media_type && (
                                <>
                                  <Link
                                    href={paths.genre(
                                      props.media.media_type,
                                      genre.id
                                    )}
                                  >
                                    <span class="cursor-pointer text-xs font-medium mr-2 px-2.5 py-0.5 rounded bg-gray-700 text-gray-300">
                                      {genre.name}
                                    </span>
                                  </Link>
                                </>
                              )
                          )}
                        </div>
                      </>
                    ) : null}
            </div>
          </div>
        </div>
        <PersonCarousel
          collection={props.media.credits?.cast || []}
          title="Cast"
        />
      </div>
    </>
  );
});
