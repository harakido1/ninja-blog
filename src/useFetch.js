import { useState, useEffect } from 'react';

const useFetch = (url) => {
   const [data, setData] = useState([]);
   const [isPending, setIsPending] = useState(true);
   const [error, setError] = useState(null);

   // setTimeout is being use to simulate Loading... a request
   useEffect(() => {
      const abortController = new AbortController();

      setTimeout(() => {
         fetch(url, { signal: abortController.signal })
            .then(res => {
               if(!res.ok) {
                  throw Error('Failed to fetch data from that resource');
               }
               return res.json();
            })
            .then(data => {
               setData(data);
               setIsPending(false);
               setError(null);
            })
            .catch(err => {
               if (err.name === 'AbortError') {
                  console.log('fetch aborted');
               } else {
                  setIsPending(false);
                  setError(err.message);
               }
            })
      }, 1000);

      return () => abortController.abort();
   }, [url]);

   return { data, isPending, error };
}

export default useFetch;