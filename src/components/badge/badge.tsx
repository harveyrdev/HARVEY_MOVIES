import { component$ } from "@builder.io/qwik";
interface Props {
  id?: number | string;
  name: string;
}
export const Badge = component$(({ name }: Props) => {
  return (
    <div class="mt-2  ">
      <span
        class=" 
       pl-2
       pr-6
       flex 
       mr-2
       cursor-pointer
        text-right
       text-xs font-bold   py-1  rounded-full bg-[#1e1829] text-gray-300 hover:text-sky-500  "
      >
      <p class=' text-ellipsis w-40 overflow-hidden
      text-left
       '>
         {name}
        
        </p> 
      </span>
    </div>
  );
});
