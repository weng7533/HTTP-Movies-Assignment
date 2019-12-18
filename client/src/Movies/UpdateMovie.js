import React, { useState, useEffect } from "react";

import axios from 'axios';


const initialMovie = {
    id: '',
    title: '',
    director: '',
    metascore: '',
    stars: [],
};

const UpdateMovie = props => {


    const [movie, setMovie] = useState(initialMovie);

    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/movies/${props.match.params.id}`)
            .then(res => {
                setMovie({
                    id: res.data.id,
                    title: res.data.title,
                    director: res.data.director,
                    metascore: res.data.metascore,
                    stars: res.data.stars,
                });

            })
            .catch(err => console.log(err.response));


    }, [props.match.params.id])

    const changeHandler = ev => {
        ev.persist();

        if (ev.target.name === 'stars') {
            const newMovieStars = movie.stars.slice();
            newMovieStars[Number(ev.target.id)] = ev.target.value;
            setMovie({
                ...movie,
                'stars': newMovieStars

                // 'stars': movie.stars.map((star, index) => {
                //     if (index.toString() === ev.target.id) {
                //         return star = ev.target.value
                //     }
                // })

            });
        }

        setMovie({
            ...movie,
            [ev.target.name]: ev.target.value
        });
    };



    const handleSubmit = e => {
        e.preventDefault();
        // make a PUT request to edit the item
        axios
            .put(`http://localhost:5000/api/movies/${props.match.params.id}`, movie)
            .then(res => {
                // res.data ==> full array with updated item
                // usually APIs return just the updated item, or just the id of the update item - you need to make a new array with all the old items, and replace the updated item with the updated item
                // const newItemsArr = props.items.map
                setMovie(initialMovie);
                props.history.push(`/movies/${props.match.params.id}`);
            })
            .catch(err => console.log(err));
    };


    console.log('movie outside', movie);
    return (
        <div>

            <h2>Update Movie</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    onChange={changeHandler}
                    placeholder="title"
                    value={movie.title}
                />
                <div className="baseline" />

                <input
                    type="text"
                    name="director"
                    onChange={changeHandler}
                    placeholder="director"
                    value={movie.director}
                />
                <div className="baseline" />

                <input
                    type="string"
                    name="metascore"
                    onChange={changeHandler}
                    placeholder="metascore"
                    value={movie.metascore}
                />
                <div className="baseline" />

                <input
                    type="string"
                    name="stars"
                    id='1'
                    onChange={changeHandler}
                    placeholder="stars 1"
                    value={movie.stars[0]}
                />
                <div className="baseline" />

                <input
                    type="string"
                    name="stars"
                    id='2'
                    onChange={changeHandler}
                    placeholder="stars 2"
                    value={movie.stars[1]}
                />
                <div className="baseline" />

                <input
                    type="string"
                    name="stars"
                    id='3'
                    onChange={changeHandler}
                    placeholder="stars 2"
                    value={movie.stars[2]}
                />
                <div className="baseline" />

                <button className="md-button form-button">Update</button>
            </form>
        </div>
    )



}




export default UpdateMovie;