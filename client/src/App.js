import React, { useState } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import UpdateMovie from './Movies/UpdateMovie'

const App = () => {
  const [savedList, setSavedList] = useState([]);

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };


  const [editingMovie, setEditingMovie] = useState([]);


  return (
    <>
      <SavedList list={savedList} />
      <Route exact path="/" component={MovieList} />

      <Route
        path="/movies/:id"
        render={props => {
          return <Movie {...props} addToSavedList={addToSavedList} />;
        }}
      />

      <Route exact path="/update-movie/:id" render={props => {
        return <UpdateMovie {...props} addToSavedList={addToSavedList} />;
      }}
      />

    </>
  );
};

export default App;
