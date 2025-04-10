import { useState } from "react";
import { FaSearch } from "react-icons/fa";


const SearchHeader = () => {
  const [isSearchVisible, setSearchVisible] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [error, setError] = useState("");

  const handleSearchToggle = () => {
    setSearchVisible((prev) => !prev);
    setError(""); // Reset error message when toggling
    console.log(isSearchVisible)
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);

    // Show error if input length is less than 2 characters
    if (value.length > 0 && value.length < 3) {
      setError("Hledaný výraz musí mít více jak 2 znaky.");
    } else {
      setError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchValue.length < 3) {
      setError("Hledaný výraz musí mít více jak 2 znaky.");
      return;
    }
    // Replace with your search submission logic
    console.log("Search submitted:", searchValue);
  };

  return (
    <div className="cHeader__component cHeader__search">
      <div className="fulltext-wrapper fulltext-wrapper--fullscreen">
        <a
          className="cftSearchBtn"
          href="#search"
          onClick={(e) => {
            e.preventDefault();
            handleSearchToggle();
          }}
        >
          <FaSearch className="cHeader__search__icon icon-search" />
        </a>
        {isSearchVisible && (
          <div className="cftSearch cftSearch--onClick cftSearchOnClick js__searchWrapper">
            <form
              className="js__searchForm"
              role="search"
              action="//www.abovalve.com/vyhledavani"
              method="POST"
              onSubmit={handleSubmit}
            >
              <fieldset>
                <legend className="visuallyhidden">Vyhledávání</legend>
                <div className="cftSearch__input">
                  <label
                    className="cftSearch__label"
                    style={{ cursor: "text" }}
                    htmlFor="searchField"
                  >
                    Vyhledávání
                  </label>
                  <input
                    type="search"
                    id="searchField"
                    placeholder="Zadejte hledaný výraz"
                    name="fulltextsearch"
                    autoComplete="off"
                    className="field cftSearch__field"
                    value={searchValue}
                    onChange={handleInputChange}
                  />
                  <button
                    type="submit"
                    className="cftSearch__submit"
                    disabled={searchValue.length < 3}
                  >
                    <span className="visuallyhidden">Hledat</span>
                    <FaSearch className="icon-search" />
                    <span
                      className={`loader loader--small loader--dark ${searchValue.length < 3 ? "visuallyhidden" : ""
                        }`}
                    ></span>
                  </button>
                </div>
              </fieldset>
            </form>
            {error && (
              <div className="cftSearch__autocomplete cftSearch__autocomplete__minChar">
                {error}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchHeader;
