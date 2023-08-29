import { component$ } from "@builder.io/qwik";
import { routeLoader$, z } from "@builder.io/qwik-city";
import { MediaGrid } from "~/components/MediaGrid/MediaGrid";

import { Person } from "~/components/person/person";
import { getPerson } from "~/services/tmdb";
import { paths } from "~/utils/paths";



export const usePersonLoader = routeLoader$(async (event) => {
  const parseResult = z
    .object({ name: z.coerce.number().min(0).step(1) })
    .safeParse(event.params);

  if (!parseResult.success) {
    throw event.redirect(302, paths.notFound);
  }

  try {
    const person = await getPerson({ id: parseResult.data.name });
    return person;
  } catch {
    throw event.redirect(302, paths.notFound);
  }
});

export default component$(() => {
  const resource = usePersonLoader();
  return (
    <>

<div style="max-h-screen overflow-y-scroll flex flex-col">
<Person person={resource.value} />
<MediaGrid
        collection={[
          ...(resource.value.combined_credits?.cast || []),
          ...(resource.value.combined_credits?.crew || []),
        ]}
        currentPage={1}
        pageCount={1}
      />


</div>
      
    </>
  );
});
