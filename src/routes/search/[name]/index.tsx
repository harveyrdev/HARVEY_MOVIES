import { component$, useSignal, useTask$ } from "@builder.io/qwik";
import {
  routeLoader$,
  server$,
  z,
  type DocumentHead,
} from "@builder.io/qwik-city";
import { MediaGrid } from "~/components/MediaGrid/MediaGrid";
import { search } from "~/services/tmdb";
import type { ProductionMedia } from "~/services/types";
import { paths } from "~/utils/paths";

export const useSearchLoader = routeLoader$(async (event) => {
  const query = event.params.name;

  if (!query || query == "") {
    throw event.redirect(302, paths.notFound);
  }

  const result = await search({ page: 1, query });

  return { query, ...result };
});

export const getMore = server$(async function (page: number) {
  const parseResult = z
    .object({
      page: z.coerce.number().min(1).int().default(1),
      query: z.string().optional().default(""),
    })
    .parse({ page, query: this.params.name });

  const result = await search(parseResult);

  return { query: parseResult.query, ...result };
});

export default component$(() => {
  const containerRef = useSignal<Element | null>(null);

  const resource = useSearchLoader();

  const movietab = useSignal<ProductionMedia[]>(resource.value.results || []);
  useTask$(async ({ track }) => {
    track(() => resource.value);

    const moviese = await search({ page: 1, query: resource.value.query });

    movietab.value = moviese.results ?? [];
  });

  console.log(resource.value);

  const currentPage = useSignal(1);

  return (
    <div
      class="flex max-h-screen flex-col overflow-y-scroll"
      ref={(e) => (containerRef.value = e)}
    >
      {resource.value.results ? (
        <>
          {resource.value.results.length > 0 ? (
            <MediaGrid
              collection={movietab.value}
              currentPage={currentPage.value}
              pageCount={resource.value.total_pages || 1}
              parentContainer={containerRef.value}
              onMore$={async () => {
                const data = await getMore(currentPage.value + 1);
                const newMedia = data.results || [];
                movietab.value = [...movietab.value, ...newMedia];
                currentPage.value += 1;
              }}
            />
          ) : (
            <span class="w-full py-40 text-center text-4xl opacity-80">
              Type something to search...
            </span>
          )}
        </>
      ) : null}
    </div>
  );
});

export const head: DocumentHead = {
  title: "Search - Qwik City Movies",
};
