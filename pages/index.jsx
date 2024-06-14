// Importing necessary modules
import Head from "next/head";
import { useEffect, useState } from "react";

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
  }, [initialData]);

  // Function to handle input changes and update the formInputs state
  const handleInputs = (event) => {
    let { name, value } = event.target;
    setFormInputs({ ...formInputs, [name]: value });
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
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="/styles.css" />
      </Head>

      <h1>Giphy Search App</h1>

      <form onSubmit={handleSearchSubmit}>
        <input name="searchTerm" onChange={handleInputs} type="text" required />
        <button>Search</button>
      </form>

      <h1>Search results for: {searchTerm}</h1>

      <div className="giphy-search-results-grid">
        {/* Mapping over the catGiphys data and rendering each item */}
        {searchResults.map((each, index) => {
          return (
            <div key={index}>
              <h3>{each.title}</h3>
              <img src={each.images.original.url} alt={each.title} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Function to fetch data at build time
export async function getStaticProps() {
  // Fetching cat gifs from the Giphy API
  const res = await fetch(
    `https://api.giphy.com/v1/gifs/search?q=cats&api_key=${giphyApiKey}&limit=6`
  );
  const catGiphys = await res.json();
  console.log(catGiphys);
  // Returning the fetched data as props
  return { props: { catGiphys } };
}
