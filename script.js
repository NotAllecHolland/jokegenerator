// JokeDisplay Component - Displays the joke content
const JokeDisplay = ({ joke, isLoading, error }) => {
  if (isLoading) {
    return /*#__PURE__*/(
      React.createElement("div", { className: "loading-spinner" }, /*#__PURE__*/
      React.createElement("i", { className: "fas fa-spinner" })));


  }

  if (error) {
    return /*#__PURE__*/(
      React.createElement("div", { className: "error-message" }, /*#__PURE__*/
      React.createElement("p", null, error)));


  }

  if (!joke) {
    return /*#__PURE__*/(
      React.createElement("div", { className: "joke-container" }, /*#__PURE__*/
      React.createElement("p", { className: "joke-text" }, "Click the button to get a joke!")));


  }

  return /*#__PURE__*/(
    React.createElement("div", { className: "joke-container" },
    joke.type === "single" ? /*#__PURE__*/
    React.createElement("p", { className: "joke-text" }, joke.joke) : /*#__PURE__*/

    React.createElement(React.Fragment, null, /*#__PURE__*/
    React.createElement("p", { className: "joke-setup" }, joke.setup), /*#__PURE__*/
    React.createElement("p", { className: "joke-punchline" }, joke.delivery))));




};

// CategorySelector Component - Allows selection of joke categories
const CategorySelector = ({ categories, selectedCategory, onCategoryChange }) => {
  return /*#__PURE__*/(
    React.createElement("select", {
      className: "category-selector",
      value: selectedCategory,
      onChange: e => onCategoryChange(e.target.value) },

    categories.map((category) => /*#__PURE__*/
    React.createElement("option", { key: category, value: category },
    category))));




};

// Main App Component
const App = () => {
  const [joke, setJoke] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [categories] = React.useState([
  "Any",
  "Programming",
  "Misc",

  "Pun",
  "Spooky",
  "Christmas"]);

  const [selectedCategory, setSelectedCategory] = React.useState("Any");

  const fetchJoke = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
      `https://v2.jokeapi.dev/joke/${selectedCategory}?safe-mode=false`);


      if (!response.ok) {
        throw new Error(`Failed to fetch joke: ${response.statusText}`);
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(data.message || "Failed to get joke");
      }

      setJoke(data);
    } catch (err) {
      setError(`Something went wrong: ${err.message}`);
      setJoke(null);
    } finally {
      setIsLoading(false);
    }
  };

  return /*#__PURE__*/(
    React.createElement("div", { className: "app-container" }, /*#__PURE__*/
    React.createElement("header", { className: "app-header" }, /*#__PURE__*/
    React.createElement("h1", { className: "app-title" }, /*#__PURE__*/
    React.createElement("i", { className: "fas fa-laugh-squint" }), " Random Joke Generator"), /*#__PURE__*/

    React.createElement("p", { className: "app-subtitle" }, "Need a laugh? We've got you covered!")), /*#__PURE__*/


    React.createElement("div", { className: "controls" }, /*#__PURE__*/
    React.createElement(CategorySelector, {
      categories: categories,
      selectedCategory: selectedCategory,
      onCategoryChange: setSelectedCategory }), /*#__PURE__*/

    React.createElement("button", {
      className: "get-joke-btn",
      onClick: fetchJoke,
      disabled: isLoading },

    isLoading ? "Loading..." : "Get Joke")), /*#__PURE__*/



    React.createElement(JokeDisplay, {
      joke: joke,
      isLoading: isLoading,
      error: error })));



};

// Render the App
ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.getElementById("root"));