import "./weather.css";

interface Props {
  searchbarResults: any[];
  cityInput3: (inputValue: string) => void;
}

const SearchResultsList = ({ searchbarResults, cityInput3 }: Props) => {
  const handleClick = (results: string) => {
    cityInput3(results);
  };
  return (
    <div className="results-list">
      {searchbarResults.map((results, id) => {
        return (
          <div
            key={id}
            className="search-result"
            onClick={() => handleClick(results)}
          >
            {results.name}
          </div>
        );
      })}
    </div>
  );
};

export default SearchResultsList;
