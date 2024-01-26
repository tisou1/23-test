import { useEffect , useRef} from "react";

function useInterval(callback, delay) {
  const savedCallback = useRef();
  console.log('....useInterval');
  useEffect(() => {
    savedCallback.current = callback;
  });
 
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}


export default useInterval