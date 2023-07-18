import { FaSearch } from "react-icons/fa";
import "./weather.css";
import { useState } from "react";

interface Props {
  setSearchbarResults: React.Dispatch<React.SetStateAction<any[]>>;
  handleKeyPress: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  cityInput2: (inputValue: string) => void;
}

export const SearchBar = ({
  setSearchbarResults,
  handleKeyPress,
  cityInput2,
}: Props) => {
  const [input, setInput] = useState("");

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "4ff2dd3d59mshd99e20ba1f97cd6p1e25aejsn0569aebb7dcc",
      "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
    },
  };

  let debounceTimer: ReturnType<typeof setTimeout>;

  const fetchData = (value: any) => {
    //this is asycnhronous since theres then
    clearTimeout(debounceTimer);
    debounceTimer = window.setTimeout(() => {
      fetch(
        `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?minPopulation=100000&namePrefix=${value}`,
        options
      )
        .then((response) => response.json())
        .then((json) => {
          setSearchbarResults(json.data ?? []);
        })
        //   .then((json) => {
        //     const results = json.data.filter((user: any) => {
        //       return (
        //         value &&
        //         user &&
        //         user.name &&
        //         user.name.toLowerCase().includes(value)
        //       );
        //     });
        //     console.log(results);
        //     setSearchbarResults(results);
        //   })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setSearchbarResults([]); // Set an empty array in case of an error
        });
    }, 1000);
  };

  const handleChange = (value: any) => {
    setInput(value);
    fetchData(value);
    cityInput2(value);
  };

  return (
    <div className="input-wrapper">
      <input
        placeholder="Search for city weather"
        value={input}
        onChange={(e) => handleChange(e.target.value)}
        onKeyUp={handleKeyPress}
      />
      <FaSearch id="search-icon"></FaSearch>
    </div>
  );
};

export default SearchBar;
