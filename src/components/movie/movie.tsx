import {
  component$,
  useComputed$,
  useSignal,
  useTask$,
} from "@builder.io/qwik";
import { ImageLoaderIcon } from "~/assets/icons/image-loader-icon";
import { getPoster, getPosterSet } from "~/services/images";
import type { ProductionMedia } from "~/services/types";
import { getHeading, getMediaType } from "./MediaCard.utils";
import { Link } from "@builder.io/qwik-city";
import { paths } from "~/utils/paths";

import { formatDateYear } from "~/utils/format";
type Props = {
  media: ProductionMedia;
};
export const Movie = component$((props: Props) => {
  const mediaType = useComputed$(() => {
    return getMediaType(props.media);
  });

  const heading = useComputed$(() => {
    return getHeading(props.media);
  });

  const imageLoaded = useSignal(false);
  useTask$(({ track }) => {
    track(() => props.media);
    imageLoaded.value = false;
  });

  return (
    <>
      {" "}
      <Link href={paths.media(mediaType.value, props.media.id)}>
        <div class="flex  flex-col ">
          <div class="overflow-hidden cursor-pointer rounded-md relative group m-2">
            <div class="z-50 opacity-0 w-full h-60 group-hover:opacity-100  transition duration-300 ease-in-out absolute from-blue-600 to-transparent bg-gradient-to-t inset-x-0 -bottom-0 pt-72 text-white ">
              <div>
                <div
                  class="p-2 pb-10   group-hover:opacity-100   transform transition duration-300 ease-in-out 
                 "
                ></div>
              </div>
            </div>

            <div class="relative items-center block">
              <div
                role="status"
                class=" object-cover animate-pulse justify-center flex items-center"
              >
                <div
                  class={[
                    {
                      hidden: imageLoaded.value,
                    },
                    " flex  items-center justify-center object-cover w-full  h-80 rounded  bg-gray-700",
                  ]}
                >
                  <ImageLoaderIcon style="h-12 w-12" />
                </div>
              </div>

              <div>
                <img
                  onLoad$={() => (imageLoaded.value = true)}
                  width={185}
                  height={278}
                  alt=""
                  class={[
                    {
                      hidden: !imageLoaded.value,
                    },
                    "object-cover  w-full h-auto  group-hover:scale-110 transition duration-300 ease-in-out",
                  ]}
                  src={getPoster(props.media, "92")}
                  srcSet={getPosterSet(props.media, "185")}
                />

                <span class="tabular-nums absolute top-0 m-2  text-[10px] font-bold mr-2 px-2.5 py-0.5 rounded-full bg-sky-600 text-white">
                  {formatDateYear(props.media.release_date)}
                </span>

                <span class="  absolute bottom-0 inline-flex items-center font-medium justify-center p-2 px-3 text-sm m-2 text-white rounded-lg   bg-black backdrop-blur-sm">
                  <svg
                    class="h-4 w-4 rounded-md text-center"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    id="flag-icon-css-it"
                    viewBox="0 0 512 512"
                  >
                    <g fill-rule="evenodd" stroke-width="1pt">
                      <path fill="#fff" d="M0 0h512v512H0z" />
                      <path fill="#009246" d="M0 0h170.7v512H0z" />
                      <path fill="#ce2b37" d="M341.3 0H512v512H341.3z" />
                    </g>
                  </svg>
                </span>
              </div>
            </div>
          </div>

          <h2 class="text-center text-xs line-clamp-1 font-bold text-white ">
            {heading.value}

            {/* {title} */}
          </h2>
        </div>
      </Link>
    </>
  );
});
