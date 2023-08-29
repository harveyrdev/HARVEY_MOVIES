import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { getProfile, getProfileSet } from "~/services/images";
import type { PersonMedia } from "~/services/types";
import { paths } from "~/utils/paths";
type PersonCarouselItemProps = {
    media: PersonMedia;
  };
const PersonCarouselItem = component$((props: PersonCarouselItemProps) => {
    return (
      <Link href={paths.media("person", props.media.id)} class="w-48">
        <div class="transition-scale scale-95 duration-300 ease-in-out hover:scale-100">
          <picture>
            <img
              alt={props.media.name}
              class="max-w-full  object-cover "
              height={270}
              src={getProfile(props.media, "w45")}
              srcSet={getProfileSet(props.media)}
              width={185}
            />
          </picture>
        </div>
        <span>{props.media.name}</span>
      </Link>
    );
  });
  




  type Props = {
    collection: PersonMedia[];
    title: string;
  };


  export const PersonCarousel = component$((props: Props) => {
    return (
      <section>
        <div class="flex flex-row items-center px-12 py-2">
          <h2 class="text-2xl text-white">{props.title}</h2>
          <div class="flex-auto" />
        </div>
        <div class="relative">
          <div class="overflow-y-auto px-8 py-4">
            <div class="carousel flex w-max flex-row gap-2">
              {props.collection.map((media) => (
                <div class="carousel-item" key={media.id}>
                  <PersonCarouselItem media={media} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  });
  
