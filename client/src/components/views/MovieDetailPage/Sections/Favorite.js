import React, {useEffect,useState} from "react";
import {Button} from "antd";
import axios from 'axios';

function Favorite(props) {

    const [FavoriteNumber, setFavoriteNumber] = useState(0);
    const [Favorited, setFavorited] = useState(false);
    const variable = {
        userFrom: props.userFrom,
        movieId: props.movieId,
        movieTitle: props.movieInfo.original_title,
        movieImage: props.movieInfo.backdrop_path,
        movieRunTime: props.movieInfo.runtime
    }

    useEffect(()=>{

        axios.post('/api/favorite/favoriteNumber', variable)
            .then(response => {
                if(response.data.success){
                    // response.data.favoriteNumber
                    setFavoriteNumber(response.data.favoriteNumber)
                }else{
                    alert("Failed to get favorite number")
                }
            })

        axios.post('/api/favorite/favorited', variable)
            .then(response => {
                if(response.data.success){
                    setFavorited(response.data.favorited)
                }else{
                    alert("Failed to get Favorite Info")
                }
            })
    },[]);

    const onClickFavorite = () => {
        if(Favorited) {
            //when already added
            axios.post('/api/favorite/removeFromFavorite', variable)
                .then(response => {
                    if(response.data.success){
                        setFavoriteNumber(FavoriteNumber - 1)
                        setFavorited(!Favorited)
                    }else{
                        alert('Failed to remove from Favorites')
                    }
                })
        }else {
            //When not adding yet
            axios.post('/api/favorite/addToFavorite', variable)
                .then(response => {
                    console.log("response", response);
                    if(response.data.success){
                        setFavoriteNumber(FavoriteNumber + 1)
                        setFavorited(!Favorited)
                    }else{
                        alert('Failed to add to Favorites')
                    }
                })
        }

    }

    return(
        <div>
            <Button onClick={onClickFavorite}>{Favorited ? "remove from Favorite list ": "Add to Favorite "}{FavoriteNumber}</Button>
        </div>
    )
}

export default Favorite
