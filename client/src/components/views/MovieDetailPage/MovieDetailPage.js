import React, {useEffect, useState} from 'react';
import {API_KEY, API_URL, IMAGE_URL} from "../../Config";
import MainImage from "../LandingPage/Sections/MainImage";
import {Descriptions, Button, Row} from "antd";
import GridCard from "../LandingPage/Sections/GridCard";
import Favorite from "./Sections/Favorite";

function MovieDetailPage(props) {

    const [Movie, setMovie] = useState([]);
    const [Crews, setCrews] = useState([]);
    const [ActorToggle, setActorToggle] = useState(false);
    const movieId = props.match.params.movieId;

    useEffect(()=>{
        fetch(`${API_URL}movie/${movieId}?api_key=${API_KEY}&language=en-US`)
        .then(response => response.json())
            .then(response => {
                console.log(response);
                setMovie(response);
                fetch(`${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`)
                    .then(response => response.json())
                    .then(response => {
                        console.log(response);
                        setCrews(response.cast);
                    })

            })
    },[]);

    const handleClick =() => {
        setActorToggle(!ActorToggle)
    }

    return (

        <div>
            {/*Main Image*/}
            {Movie && /*Movies[0]를 가져오는게 보장된 후에 MainImage파트를 렌더링하는 것*/
            <MainImage image={`${IMAGE_URL}w1280${Movie.backdrop_path && Movie.backdrop_path}`}
                       title={`${Movie.original_title}`}
                       text={`${Movie.overview}`}/> /*three props*/
            }

            <div styles={{width:'85%', margin: '1rem auto'}}>
                <div style = {{display:'flex', justifyContent:'flex-end'}}>
                    {/*<Button>Add to Favorite</Button>*/}
                    <Favorite
                    userFrom={localStorage.getItem('userId')}
                    movieId= {movieId}
                    movieInfo={Movie}
                    />
                </div>
                {/*    Movie info table*/}
                <Descriptions title = "Movie Info" bordered>
                    <Descriptions.Item label="Title">{Movie.original_title}</Descriptions.Item>
                    <Descriptions.Item label="relese_date">{Movie.release_date}</Descriptions.Item>
                    <Descriptions.Item label="revenue">{Movie.revenue}</Descriptions.Item>
                    <Descriptions.Item label="runtime">{Movie.runtime}</Descriptions.Item>
                    <Descriptions.Item label="vote_average" span={2}>{Movie.vote_average}</Descriptions.Item>
                    <Descriptions.Item label="vote_count">{Movie.vote_count}</Descriptions.Item>
                    <Descriptions.Item label="status">{Movie.status}</Descriptions.Item>
                    <Descriptions.Item label="popularity">{Movie.popularity}</Descriptions.Item>
                </Descriptions>

                <br/>
                <br/>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <Button onClick={handleClick}>Toggle Actor View</Button>
                </div>

            {/*    Grid card for Crews*/}
                {ActorToggle &&

                <Row gutter={[16,16]}>
                    {Crews && Crews.map((crew, index)=>(
                        <React.Fragment key={index}>
                            {crew.profile_path &&
                            <GridCard
                                actor
                                image={`${IMAGE_URL}w500${crew.profile_path}`}
                            />

                            }
                        </React.Fragment>
                    ))}

                </Row>
                }

            </div>

        </div>
    )
}

export default MovieDetailPage
