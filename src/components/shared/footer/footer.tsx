import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { GitHubIcon } from "~/assets/icons/github-icons";
import { QwikIcon } from "~/assets/icons/qwik-icon";

export const Footer = component$(() => {
  return (
    <>
      <div class="flex flex-col gap-2 mt-4 bottom-0 p-4 self-center ">
        <Link href="/">
          <span class="text-sm md:text-lg font-semibold whitespace-nowrap text-white ">
            🎬 Pelis Harvey
          </span>{" "}
        </Link>

        <div class="flex gap-2 items-center">
          <p class="text-xs text-slate-400 ">Made with </p>
          <Link href="https://qwik.builder.io/">
            <QwikIcon />
          </Link>
        </div>
        <div class="flex gap-2 items-center ">
          <p class="text-xs text-slate-400  ">Design by </p>
          <Link href="#">
            <p class="underline text-base text-white"> Harvey.dev</p>
          </Link>
        </div>

        <div class="flex gap-2 items-center ">
          <p class="text-xs text-slate-400  ">This product uses the</p>
          <Link href="https://www.themoviedb.org/documentation/api">
            <p class="underline text-base text-white"> TMDB API </p>
          </Link>
          <p class="text-xs text-slate-400  ">
            {" "}
            but is not endorsed or certified by TMDB.{" "}
          </p>
        </div>

        <GitHubIcon />
      </div>
    </>
  );
});
