import axios from "axios";
import { useEffect, useReducer } from "react";

export default function useFetch(url) {
  const [state, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case "INIT":
          return { ...state, isLoading: true, isError: false };
        case "SUCCESS":
          return {
            ...state,
            isLoading: false,
            isError: false,
            data: action.payload,
          };
        case "ERROR":
          return { ...state, isLoading: false, isError: true };
      }
    },
    {
      isLoading: true,
      isError: false,
      data: null,
    }
  );
  useEffect(() => {
    if (!url) {
      return;
    } else {
      const fetch = async () => {
        dispatch({ type: "INIT" });

        try {
          const result = await axios(url);
          dispatch({ type: "SUCCESS", payload: result.data.payload.users });
        } catch (_) {
          dispatch({ type: "ERROR" });
        }
      };
      fetch();
    }
  }, [url]);
  return state;
}
