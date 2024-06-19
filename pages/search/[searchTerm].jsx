import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useRouter } from "next/router";

// The Giphy API key
const giphyApiKey = process.env.NEXT_PUBLIC_GIPHY_API_KEY;

export default function Search(initialData) {
  const router = useRouter();
  return (
    <div className="container">
      <Header initialData={initialData} />

      <p className="mt-10">
        Go{" "}
        <Link className="text-blue-600 visited:text-purple-600" href="/">
          home
        </Link>
      </p>
      <h1 className="m-5">Search results for: {router.query.searchTerm}</h1>

      <div className="place-self-center place-items-center flex-col columns-3 max-md:columns-1 max-md:flex mt-10">
        {initialData.giphys.map((each, index) => {
          return (
            <div
              key={index}
              className="m-2 place-self-center place-items-center"
            >
              <h3 className="text-pretty text-sm">{each.title}</h3>
              <Image
                className="h-[300px] max-w-[500px] place-self-center max-md:max-w-[300px]"
                src={each.images.downsized_medium.url}
                alt={each.title}
                width={each.images.downsized_medium.width}
                height={each.images.downsized_medium.height}
                priority={true}
              />
            </div>
          );
        })}
      </div>
      <div className="mt-20">
        <Footer />
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const searchTerm = context.query.searchTerm;
  let giphys = await fetch(
    `https://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=${giphyApiKey}&limit=6`
  );
  giphys = await giphys.json();
  return { props: { giphys: giphys.data } };
}
