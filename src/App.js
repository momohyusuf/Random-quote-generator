import DisplayQuotes from './displayQuotes';
import { useEffect, useState } from 'react';
import { AiFillTwitterSquare } from 'react-icons/ai';

function App() {
  const [quotes, setQuotes] = useState([]);
  const [value, setValue] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  // **********************************
  const url = 'https://type.fit/api/quotes';
  const getQuotes = async () => {
    const response = await fetch(url);
    const data = await response.json();
    setQuotes(data);
    setIsLoading(false);
  };
  // **************************************
  useEffect(() => {
    try {
      getQuotes();
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }, []);

  // *********************************************

  const randomQuotes = () => {
    let randomNumbers = Math.ceil(Math.random() * quotes.length);
    console.log(randomNumbers);
    setValue((prevlue) => randomNumbers);
  };
  // ************************************
  useEffect(() => {
    let autoQuote = setInterval(() => {
      let randomNumbers = Math.ceil(Math.random() * quotes.length);
      setValue((prevlue) => randomNumbers);
    }, 4000);
    return () => {
      clearInterval(autoQuote);
    };
  }, [value]);
  // *************************************************************************

  if (isLoading) {
    return (
      <div>
        <h1>getting quotes...</h1>
      </div>
    );
  }

  return (
    <main>
      <section id="quote-box">
        <article>
          <h1 id="text">"{quotes[value].text}"</h1>
          <p id="author">{quotes[value].author}</p>
        </article>
        <button id="new-quote" onClick={randomQuotes}>
          New Quote
        </button>
        <div>
          <a
            href={`http://twitter.com/intent/tweet?text="${quotes[value].text}" ${quotes[value].author}`}
            target="_blank"
            rel="noopener noreferrer"
            title="share on twitter"
          >
            <AiFillTwitterSquare id="tweet-quote" />
          </a>
        </div>
      </section>
    </main>
  );
}

export default App;
