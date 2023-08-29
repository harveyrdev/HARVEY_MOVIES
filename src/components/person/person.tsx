import { component$ } from "@builder.io/qwik";
import { getProfile, getProfileSet } from "~/services/images";
import type { PersonMediaDetails } from "~/services/types";
import { formatDate } from "~/utils/format";
import { ExternalLinks } from "../ExternalLinks/ExternalLinks";

export const calculateAge = (birthday: string, deathday?: string) => {
  const cutoffDate = deathday ? Number(new Date(deathday)) : Date.now();
  const ageDifMs = cutoffDate - Number(new Date(birthday));
  const ageDate = new Date(ageDifMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};

type Props = {
  person: PersonMediaDetails;
};

export const Person = component$((props: Props) => {
  return (
    <>
      <div class="flex items-center justify-center">
        {props.person.profile_path ? (
          <img
            width="185"
            height="277"
            alt={props.person.name}
            class="w-80 hidden md:block"
            src={getProfile(props.person, "w45")}
            srcSet={getProfileSet(props.person)}
          />
        ) : null}

        <div class="flex flex-col mx-4">
          <h1 class="text-2xl font-bold text-white "> {props.person.name}</h1>

          {props.person.biography ? (
            <div>
              {props.person.biography
                .split("\n")
                .filter((section) => section !== "")
                .map((section) => (
                  <p key={section} class="text-sm my-3 text-slate-300">
                    {section}
                  </p>
                ))}
            </div>
          ) : null}

          <div class="grid grid-cols-[max-content_1fr] items-center gap-3 text-sm opacity-80 lg:grid-cols-[max-content_1fr_max-content_1fr]">
            {props.person.known_for_department ? (
              <>
                <div>Known For</div>
                <div>{props.person.known_for_department}</div>
              </>
            ) : null}
            {props.person.birthday ? (
              <>
                <div>Born</div>
                <div>
                  {formatDate(props.person.birthday)}{" "}
                  {!props.person.deathday ? (
                    <span>(age {calculateAge(props.person.birthday)})</span>
                  ) : null}
                </div>
              </>
            ) : null}

            {props.person.place_of_birth ? (
              <>
                <div>Place of Birth</div>
                <div>{props.person.place_of_birth}</div>
              </>
            ) : null}

            {props.person.deathday ? (
              <>
                <div>Died</div>
                <div>
                  {formatDate(props.person.deathday)}{" "}
                  {props.person.birthday ? (
                    <span>
                      age{" "}
                      {calculateAge(
                        props.person.birthday,
                        props.person.deathday
                      )}
                    </span>
                  ) : null}
                </div>
              </>
            ) : null}
          </div>

          <div class="flex my-3.5 gap-2">
            <ExternalLinks
              media="person"
              links={{
                ...props.person.external_ids,
                homepage: props.person.homepage,
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
});
