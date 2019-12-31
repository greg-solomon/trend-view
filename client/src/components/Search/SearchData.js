import React from "react";
import { useQuery } from "@apollo/react-hooks";
import timesQuery from "../../graphql/times.query";
import Loading from "../Loading";
import ErrorPage from "../ErrorPage";
import SelectController from "./SelectController";

const SearchData = () => {
  const { loading, error, data } = useQuery(timesQuery);
  return (
    <>
      {loading && <Loading message="Fetching times..." />}
      {error && <ErrorPage error={error} />}
      {data && <SelectController data={data.timestamps} />}
    </>
  );
};

export default SearchData;
