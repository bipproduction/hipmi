import { Suspense } from "react";
import LoadDataContoh from "./LoadDataContoh";

const listMenu = [
  {
    name: "Dashboard",
    url: "/dashboard",
    icon: "dashboard",
  },
  {
    name: "Event",
    url: "/event",
    icon: "event",
  },
  {
    name: "Donasi",
    url: "/donasi",
    icon: "donasi",
  },
];

const fether = async (url: string) =>
  fetch("https://jsonplaceholder.typicode.com" + url, {
    next: {
      revalidate: 2,
    },
  }).then(async (res) => {
    const data = await res.json();
    // console.log(data);
    return data;
  });

export default async function Page() {
  const data = await fether("/posts/1");
  
  return (
    <div>
      {listMenu.map((item) => {
        return (
          <div key={item.name}>
            <a href={item.url}>{item.name}</a>
          </div>
        );
      })}
      {/* <LoadDataContoh /> */}
      <Suspense fallback={<div>Loading...</div>}>
        {JSON.stringify(data, null, 2)}
      </Suspense>
    </div>
  );
}
