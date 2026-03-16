const base_url = "https://api.themoviedb.org/3";

const get_discover_endpoint = (pageNumber = 1) => {
  return `/discover/movie?include_adult=false&include_video=true&language=en-US&page=${pageNumber}&sort_by=popularity.desc`;
};

const get_search_endpoint = (search_query, pageNumber = 1) => {
  const formattedQuery = encodeURIComponent(search_query.trim());
  return `/search/movie?query=${formattedQuery}&page=${pageNumber}`;
};
const query_generator = (search_query, pageNumber = 1, id) => {
  if (!id === false) {
    return `${base_url}/movie/${id}`;
  }
  if (!search_query || search_query.trim() === "") {
    return base_url + get_discover_endpoint(pageNumber);
  }

  return base_url + get_search_endpoint(search_query, pageNumber);
};

export const fetch_movies = async ({
  search_query = "",
  id = null,
  pageNumber = 1,
}) => {
  const query = query_generator(search_query, pageNumber, id);
  // console.log(query, " this is the query");

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer  ${process.env.EXPO_PUBLIC_API_ACCESS_TOKKEN}`,
    },
  };
  const res = await fetch(query, options);

  if (res) {
    const Data = await res.json();
    if (!id === false) {
      const getVideosRes = await fetch(query + "/videos", options);
      const movieTrilerVideos = await getVideosRes.json();
      Data.videos = movieTrilerVideos.results;
    }
    return Data;
  }
};
