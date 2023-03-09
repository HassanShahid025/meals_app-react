import { useState } from "react";
import { useGlobalContext } from "./Context";

export const Searh = () => {
  const { setSearchTerm, fetchRandomMeal, home } = useGlobalContext()!;
  const [text, setText] = useState("");

  const handleChange = (e: any) => {
    setText(e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (text) {
      setSearchTerm(text);
    }
  };

  const handleRandomMeal = () => {
    setSearchTerm("");
    setText("");
    fetchRandomMeal();
  };

  return (
    <header className="search-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={handleChange}
          value={text}
          placeholder="type favorite meal"
          className="form-input"
        />
        <button type="submit" className="btn">
          search
        </button>
        <button
          type="button"
          onClick={handleRandomMeal}
          className="btn btn-hipster"
        >
          suprise me!
        </button>
        <button className="btn home-btn" onClick={home}>Home</button>
      </form>
    </header>
  );
};
