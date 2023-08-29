import { component$, useSignal, $ } from "@builder.io/qwik";
import { useNavigate } from "@builder.io/qwik-city";

export const InputSrc = component$(() => {
  const search = useSignal("");
  const nav = useNavigate();

  const handleSumit = $(async () => {

     const  serach_value= search.value!="" ? search.value: "nothing"
    await nav(`/search/${serach_value}`);

    search.value = "";
  });

  return (
    <>
      <form preventdefault:submit onSubmit$={handleSumit}>
        <input
          name="search"
          class={"search-styles"}
          placeholder="Search movies"
          type="text"
          value={search.value}
          onInput$={(ev: any) => (search.value = ev?.target?.value)}
        />
      </form>
    </>
  );
});
