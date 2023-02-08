import { useState, useEffect } from "react";
const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, SetError] = useState(null);

  //run every render
  useEffect(() => {
    const abortCont = new AbortController();
    setTimeout(() => {
      fetch(url)
        .then((res) => {
          console.log(res);
          if (!res.ok) {
            throw Error("Could not fetch the data for that resource");
          }
          return res.json();
        })
        .then((data) => {
          console.log(data);
          setData(data);
          setIsPending(false);
          SetError(null);
        })
        .catch((err) => {
          if ((err.name = "AbortError")) {
            console.log("Fetch Aborted");
          } else {
            setIsPending(false);
            SetError(err.message);
          }
        });
    }, 1000);
    return () => abortCont.abort();
  }, [url]);
  return { data, isPending, error };
};

export default useFetch;
