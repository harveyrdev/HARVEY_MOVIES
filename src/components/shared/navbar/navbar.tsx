import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
// Components/icons
import { SearchIcon } from "~/assets/icons/search-icon";
import { InputSrc } from "~/components/inputSrc/inputSrc";

export const Navbar = component$(() => {
  return (
    <>
      <nav class=" bg-gray-900 w-full  border-0 z-20 top-0 left-0 fixed">
        <div class="max-w-screen-xl p-4 flex flex-wrap items-center justify-between md:justify-around mx-auto ">
          <div class="flex items-center ">
            <Link href="/">
              <span class="self-center text-lg md:text-2xl font-bold whitespace-nowrap text-white ">
                🎬 Pelis Harvey
              </span>
            </Link>
          </div>

          <div class="flex md:order-2">
            <div class="relative ">
              <div class="absolute inset-y-0 left-0 flex items-center pl-3  pointer-events-none">
                <SearchIcon />
              </div>
              <InputSrc />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
});
