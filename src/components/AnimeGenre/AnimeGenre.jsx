
import React ,{ useState ,    useEffect  } from 'react';
import { useParams , useRouteMatch} from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom'
import { useQuery } from 'react-query';
import Skeleton from 'react-loading-skeleton';
import { Row , Col,Pagination } from 'antd';

const fetchAnimeGenres = (id ,page ) =>{
    return axios.get(`https://api.aniapi.com/v1/anime?genres=${id}&nsfw=true&page=${page}`)
}

function AnimeGenre(props) {
    const params = useParams()
    console.log(params)
    const [page,setPage]= useState( 1)

    const id = params.id.replace(/\s/g, "%20");

    const {data , isFetching,isLoading} = useQuery(['fetchAnimeYears',id,page],()=>fetchAnimeGenres(id,page),{
        refetchOnWindowFocus:false,
    })
    console.log(id)
    console.log('data-genre',data)
    
    useEffect(()=>{
        window.scrollTo(0,0)
    })
    const onChange =  (value) =>{
        setPage(value)
        // localStorage.setItem('page-years',value)
    }
    if (isFetching || isLoading ){
        return (
            <div className="anime-wr">
                <div className="anime-content mr">
                <Row className="anime-body"  gutter={[20,20]}>
                <Col xs={12} sm={3} className="anime-item-skeleton"><Skeleton style={{height:'100%'}} /></Col>
                <Col xs={12} sm={3} className="anime-item-skeleton"><Skeleton style={{height:'100%'}} /></Col>
                <Col xs={12} sm={3} className="anime-item-skeleton"><Skeleton style={{height:'100%'}} /></Col>
                <Col xs={12} sm={3} className="anime-item-skeleton"><Skeleton style={{height:'100%'}} /></Col>

                <Col xs={12} sm={3} className="anime-item-skeleton"><Skeleton style={{height:'100%'}} /></Col>
                <Col xs={12} sm={3} className="anime-item-skeleton"><Skeleton style={{height:'100%'}} /></Col>
                <Col xs={12} sm={3} className="anime-item-skeleton"><Skeleton style={{height:'100%'}} /></Col>
                <Col xs={12} sm={3} className="anime-item-skeleton"><Skeleton style={{height:'100%'}} /></Col>
                
                </Row>
                </div>
            </div>
        )
    }



    return (
        <div className="anime-wr">
            <div className="anime-content mr">
                <div className="anime-year-label">
                    ANIME  {id}
                </div>
                <Row className="anime-body" gutter={[20,20]}>
                    {
                        data &&
                        data.data.data.documents.length >0 &&
                        data.data.data.documents.map(anime =>(
                            <Col key={anime.id} xs={12} sm={8} lg={6} xl={4} xxl={4} >
                                <Link
                                 className="anime-item"  
                                 to={`/anime/${anime.id}`}
                                >
                                    <div className="anime-item-img">
                                        <img src={anime.cover_image} alt="img" />
                                    </div>
                                    <div className="anime-item-des">
                                        <p
                                        
                                         className="anime-item-name" 
                                         style={{color:anime.cover_color}}
                                        >
                                            {anime.titles.en}
                                        </p>
                                        <p className="anime-item-genre">
                                            <span style={{color:anime.cover_color}}>{anime.genres[0]}</span> 
                                            <span className="dot"></span>
                                            <span style={{color:anime.cover_color}}>{anime.genres[1]}</span>
                                            
                                        </p>
                                        <div className="emoji">
                                            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" className="w-6 h-6 text-green-300" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"></path></svg>
                                            <span className="percent">{anime.score} %</span>
                                        </div>
                                        
                                    </div>
                                </Link>
                            </Col>        
                        ))
                    }
                </Row>
                <Pagination
                 defaultCurrent={page} 
                 total={data?.data.data.last_page || 10} 
                 pageSize={1} 
                 onChange={onChange} 
                 showSizeChanger
                 className="pagination"
                />
            </div>
        </div>
        );
    
}

export default AnimeGenre;