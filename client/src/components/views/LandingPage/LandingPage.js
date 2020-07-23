import React, {useEffect, useState} from 'react';
// import { FaCode } from "react-icons/fa";
import {API_URL, API_KEY, IMAGE_URL} from "../../Config";
import {Typography, Row, Button} from "antd";
import MainImage from "./Sections/MainImage";
import GridCard from "./Sections/GridCard";
const { Title } = Typography;

function LandingPage() {

    const [Movies, setMovies] = useState([]);
    const [CurrentPage, setCurrentPage] = useState(0);

    console.log("current page", CurrentPage);
    useEffect(()=> {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
        fetchMovies(endpoint);
    },[]);

    const fetchMovies = (path) => {
        //`${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`
        fetch(path)
            .then(response=> response.json())
            .then(response=> {
                console.log(response);
                console.log("...movies", [...Movies]);
                //spreader로 앞에 영화정보까지 가져오기
                // setMovies(response.results);
                setMovies([...Movies, ...response.results]); //Put all fetched data into state
                setCurrentPage(response.page);
            })

    };
    const handleClick = () => {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${CurrentPage + 1}`;
        fetchMovies(endpoint);
    };

    return (
        <div style={{width: '100%', margin: 0}}>
            {/*movie main image*/}

            {/*이 밑에를 안쓰면 backdrop_path 가져오는 속도가 여기 랜딩페이지 가져오는 속도보다
            느려서 undefined error가 나옴*/}
            {Movies[0] && /*Movies[0]를 가져오는게 보장된 후에 MainImage파트를 렌더링하는 것*/
            <MainImage image={`${IMAGE_URL}w1280${Movies[0].backdrop_path && Movies[0].backdrop_path}`}
                       title={`${Movies[0].original_title}`}
                       text={`${Movies[0].overview}`}/> /*three props*/
            }


            {/*Body*/}
            <div style={{width: '85%', margin: '1rem auto'}}>
                <Title level={2}>Movies by latest</Title>
                <hr/>
                {/*Grid Cards*/}
                <Row gutter={[16,16]}>
                    {Movies && Movies.map((movie, index)=>(
                        <React.Fragment key={index}>
                            <GridCard
                                image = {movie.poster_path && `${IMAGE_URL}w500${movie.poster_path}`}
                                movieId = {movie.id}
                            />
                        </React.Fragment>
                    ))}

                </Row>

                {/*Load more button*/}
                <br />
                <div style={{display: 'flex', justifyContent:' center'}}>
                    <Button onClick={handleClick}>Load More</Button>

                </div>
            </div>
        </div>

    )
}

export default LandingPage
