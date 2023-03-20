import React, { useState, useEffect } from "react";

import { Card, FormField, Loader } from "../components";

// Create a Function to Render Cards for Images from Search Results
const RenderCards = ({ data, title }) => {
  if (data?.length > 0)
    // This (post) is the element of every single post from allPosts
    return data.map((post) => <Card key={post._id} {...post} />);

  return (
    <h2 className="mt-5 font-bold text-[#6449ff] text-xl uppercase">{title}</h2>
  );
};

const Home = () => {
  // * Create States for Updating Page Content
  const [loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState(null);

  const [searchText, setSearchText] = useState("");
  const [searchedResults, setSearchedResults] = useState(null);
  // ? What are these searchTimeout() and setSearchTimeout() for ... ?
  const [searchTimeout, setSearchTimeout] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);

      try {
        const response = await fetch(
          // "http://localhost:8080/api/v1/post",
          "https://lfc-ai-gallery.onrender.com/api/v1/post",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const result = await response.json();

          console.log("Getting Posts from Backend postRoutes and MongoDB");
          // console.log(result);

          setAllPosts(result.data.reverse());
        }
      } catch (error) {
        console.log(
          "This error is from Home.jsx useEffect() for Getting all Posts"
        );
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleSearchChange = (e) => {
    // ? What are these clearTimeout() and setSearchTimeout() for ... ?
    clearTimeout(searchTimeout);

    setSearchText(e.target.value);

    setSearchTimeout(
      // * Only Getting the Search Results after 500 ms for Every Keystroke
      setTimeout(() => {
        const searchedResults = allPosts.filter(
          (item) =>
            item.name.toLowerCase().includes(searchText.toLowerCase()) ||
            item.prompt.toLowerCase().includes(searchText.toLowerCase())
        );

        setSearchedResults(searchedResults);
      }, 500)
    );
  };

  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[#222328] text-[32px]">
          The Community Showcase
        </h1>
        <p className="mt-2 text-[#666e75] text-[16px] max-w[500px]">
          Browse through a collection of imaginative and visually stunning
          images generated by DALL-E AI
        </p>
      </div>

      <div className="mt-16">
        <FormField
          labelName="Search posts"
          type="text"
          name="text"
          placeholder="Search posts"
          value={searchText}
          handleChange={handleSearchChange}
        />
      </div>

      <div className="mt-10">
        {/* Show Loading Status Image when Loading the Images */}
        {loading ? (
          <div className="flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <>
            {/* Show All Search Results after Loading All the Images */}
            {searchText && (
              <h2 className="font-medium text-[#666e75] text-lg mb-6">
                Showing results for
                <span className="text-[#222328]"> "{searchText}"</span>
              </h2>
            )}
            <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
              {searchText ? (
                <RenderCards
                  data={searchedResults}
                  title="No search results found"
                />
              ) : (
                <RenderCards data={allPosts} title="No posts found" />
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Home;
