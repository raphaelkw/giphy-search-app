import Head from "next/head";
import { useRouter } from "next/router";

const Header = (initialData) => {
  const router = useRouter();
  return (
    <div>
      <Head>
        <title>Giphy Search App</title>
        <title>Search results for: {router.query.searchTerm}</title>
        <meta
          name="description"
          content={
            initialData !== undefined && initialData.giphys !== undefined
              ? initialData.giphys.map((each) => each.title + " ")
              : "Love giphys? We do too. Use our advanced giphy search to find the perfect giphy for any occation"
          }
        ></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1
        className="text-2xl hover:cursor-pointer"
        onClick={() => (window.location.href = "/")}
      >
        Giphy Search App
      </h1>
    </div>
  );
};

export default Header;
