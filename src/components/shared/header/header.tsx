import {
  component$,
  useOnDocument,
  useStore,
  $,
  useVisibleTask$,
  useSignal,
} from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
//Components/icons
import { SearchIcon } from "~/assets/icons/search-icon";
import { InputSrc } from "~/components/inputSrc/inputSrc";
import { getBackdrop, getBackdropSet } from "~/services/images";
import type { MovieMediaDetails } from "~/services/types";

interface Pros {
  images: MovieMediaDetails[];
}

let slideInterval: any;
export const Header = component$(({ images }: Pros) => {
  const slideRef = useSignal<Element>();

  const scrollPage = useStore({
    class: "bg-transparent absolute",
    change: false,
  });

  useVisibleTask$(({ track }) => {
    track(() => scrollPage.change);

    if (scrollPage.change) scrollPage.class = "bg-[#0f0c13] fixed  ";
    else scrollPage.class = "bg-transparent absolute ";
  });
  useOnDocument(
    "scroll",
    $(() => {
      const currentScroll = window.scrollY;

      if (currentScroll > 100) scrollPage.change = true;
      else scrollPage.change = false;
    })
  );

  const current = useSignal(0);

  const handleOnNextClick = $(() => {
    current.value = (current.value + 1) % images.length;
  });

  const startSlider = $(() => {
    slideInterval = setInterval(() => {
      handleOnNextClick();
    }, 3000);
  });

  const pauseSlider = $(() => {
    clearInterval(slideInterval);
  });

  useVisibleTask$(({ cleanup }) => {
    // slideRef.value?.addEventListener("mouseenter", pauseSlider);
    // // slideRef.value?.addEventListener("mouseleave", startSlider);
    startSlider();

    cleanup(() => pauseSlider);
  });

  const changeCarrusel = $((index: number) => {
    current.value = index;
  });

  return (
    <>
      <div class="relative " id="relative">
        <header>
          <nav class={[scrollPage.class, "    top-0 z-50  w-full    "]}>
            <div class="max-w-screen-xl p-4  flex flex-wrap items-center justify-between  md:justify-around  mx-auto ">
              <Link href="/">
                <span class="self-center text-lg md:text-2xl font-semibold whitespace-nowrap text-white ">
                  🎬 Pelis Harvey
                </span>
              </Link>

              <div class="flex md:order-2 ">
                <div class="relative hidden md:block">
                  <div class="absolute inset-y-0 left-0 flex items-center pl-3  pointer-events-none">
                    <SearchIcon />
                  </div>
                  <InputSrc />
                </div>
              </div>

              <div class="flex md:order-1 ">
                <div class="relative block md:hidden">
                  <div class="absolute inset-y-0 left-0 flex items-center pl-3  pointer-events-none">
                    <SearchIcon />
                  </div>
                  <InputSrc />
                </div>
              </div>
            </div>
          </nav>

          <div class="relative w-full" ref={(e) => (slideRef.value = e)}>
            <div class="overflow-hidden relative  h-64 md:h-96">
              {images.map((image, index) => (
                <>
                  <div
                    class={`duration-700 ease-in-out absolute inset-0 transition-all transform translate-x-0 z-20 ${
                      index === current.value ? "block" : "hidden"
                    }`}
                  >
                    <img
                      src={getBackdrop(image, "w300")}
                      srcSet={getBackdropSet(image)}
                      height={400}
                      width={400}
                      alt={`Slide ${index}`}
                      class=" absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2  "
                    />
                    <div class="block absolute top-1/2 left-1/2 w-full h-full -translate-x-1/2 -translate-y-1/2 bg-gradient-to-b from-transparent to-[#0f0c13]"></div>

                    <div class="absolute top-1/3  md:top-1/2 md:h-1/4 md:left-32  left-5 text-white  flex flex-col  ">
                      <div class="flex flex-col md:flex-row items-start  gap-1 md:gap-3 ">
                        {" "}
                        <h1 class="font-bold  antialiased  tracking-wide text-lg md:text-3xl ">
                          {image.original_title}
                        </h1>
                        <div>
                          <span class="  text-[10px] font-light mr-2  px-2 md:px-2.5 py-0.5 rounded-full bg-yellow-500 text-black">
                            ESTRENO
                          </span>
                          <span class="  text-[10px] font-light mr-2 px-2 md:px-2.5 py-0.5 rounded-full bg-yellow-500 text-black">
                            121 min
                          </span>
                        </div>
                      </div>

                      <p class="line-clamp-2 md:line-clamp-none mt-2 tracking-tight font-thin  text-xs md:text-[15px] leading-relaxed text-gray-300 md:w-3/4  w-full">
                        {image.overview}
                      </p>
                      <Link
                        href={`/movie/${image.id}/`}
                        class="text-white bg-blue-500 hover:bg-blue-400/90 focus:ring-3 focus:ring-[#2557D6]/50 focus:outline-none font-normal rounded-lg text-xs md:text-sm  px-3 md:px-5 py-1.5  md:py-2.5 text-center inline-flex items-center  mr-2 mb-2  w-40 mt-3"
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
                        Ver ahora
                      </Link>
                    </div>
                  </div>
                </>
              ))}
            </div>

            <div class="flex absolute bottom-5 right-0 z-30 space-x-3 -translate-x-1/2">
              {images.map((images, index) => (
                <>
                  <button
                    type="button"
                    class={`w-2 h-2 rounded-full bg-blue-500 focus-within:bg-white ${
                      index === current.value ? "bg-white" : ""
                    }`}
                    aria-current="true"
                    onClick$={() => changeCarrusel(index)}
                  ></button>
                </>
              ))}
            </div>
          </div>
        </header>
      </div>
    </>
  );
});
