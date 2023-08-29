import { component$ } from "@builder.io/qwik";
import {  useNavigate } from "@builder.io/qwik-city";
import type { MediaType } from "~/services/types";

type Props = {
  links: Record<string, string | undefined>;
  media?: MediaType;
};



export const ExternalLinksId = component$((props: Props) => {
  const nav= useNavigate()
  return (
    <ul class=" flex flex-row-reverse ">
      {props.links.twitter_id ? (
        <li>
          <button
            class="text-white   rounded-full p-2 bg-[#1da1f2] ml-2  "
            onClick$={async () => {
              // SPA navigate to /dashboard
              await nav(`https://twitter.com/${props.links.twitter_id}`);
            }}
          >
            <svg
              class="w-3 h-3 text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 17"
            >
              <path
                fill-rule="evenodd"
                d="M20 1.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.344 8.344 0 0 1-2.605.98A4.13 4.13 0 0 0 13.85 0a4.068 4.068 0 0 0-4.1 4.038 4 4 0 0 0 .105.919A11.705 11.705 0 0 1 1.4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 4.1 9.635a4.19 4.19 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 0 14.184 11.732 11.732 0 0 0 6.291 16 11.502 11.502 0 0 0 17.964 4.5c0-.177 0-.35-.012-.523A8.143 8.143 0 0 0 20 1.892Z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </li>
      ) : null}
      {props.links.facebook_id ? (
        <li>
          <button
            onClick$={async () => {
              // SPA navigate to /dashboard
              await nav(`https://twitter.com/${props.links.facebook_id}`);
            }}
            class="text-white   rounded-full p-2 bg-[#3b5998] ml-2 "
          >
            <svg
              class="w-3 h-3 text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 8 19"
            >
              <path
                fill-rule="evenodd"
                d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </li>
      ) : null}
    </ul>
  );
});
