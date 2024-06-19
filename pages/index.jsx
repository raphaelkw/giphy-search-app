// Importing necessary modules
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// The Giphy API key
const giphyApiKey = process.env.NEXT_PUBLIC_GIPHY_API_KEY;

// The Home component which is the default export of this module
export default function Home(initialData) {
  // State for form inputs
  const [formInputs, setFormInputs] = useState({});

  // State for search results
  const [searchResults, setSearchResults] = useState([]);

  // State for search term
  const [searchTerm, setSearchTerm] = useState("cats");

  // useEffect hook to log the catGiphys prop when the component mounts
  useEffect(() => {
    setSearchResults(initialData.catGiphys.data);
  }, []);

  // Function to handle input changes and update the formInputs state
  const handleInputs = (event) => {
    let { name, value } = event.target;
    setFormInputs({ ...formInputs, [name]: value }); // formInputs = {searchTerm: "value"}
  };

  // Function to handle form submission
  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    // Fetching new gifs from the Giphy API
    const res = await fetch(
      `https://api.giphy.com/v1/gifs/search?q=${formInputs.searchTerm}&api_key=${giphyApiKey}&limit=6`
    );
    const giphys = await res.json();

    console.log(giphys);

    // Updating the search results state
    setSearchResults(giphys.data);
    // Updating the search term state
    setSearchTerm(formInputs.searchTerm);
  };

  // The component's return statement
  return (
    <div className="container">
      <Header initialData={initialData} />

      <form className="m-5" onSubmit={handleSearchSubmit}>
        <input name="searchTerm" onChange={handleInputs} type="text" required />
        <button>Search</button>
      </form>

      <h1>Search results for: {searchTerm}</h1>
      <p className="m-5">
        Share this search with others:{" "}
        <Link
          className="text-blue-600 visited:text-purple-600"
          href="/search/[pid]"
          as={`/search/${searchTerm}`}
        >
          http://localhost:3000/search/{searchTerm}
        </Link>
      </p>

      <div className="place-self-center place-items-center flex-col columns-3 max-md:columns-1 max-md:flex">
        {/* Mapping over the catGiphys data and rendering each item */}
        {searchResults.map((each, index) => {
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

// Function to fetch data at build time
export async function getServerSideProps() {
  // Fetching cat gifs from the Giphy API
  const res = await fetch(
    `https://api.giphy.com/v1/gifs/search?q=cats&api_key=${giphyApiKey}&limit=6`
  );
  const catGiphys = await res.json();

  // Returning the fetched data as props
  return { props: { catGiphys } };
}
