import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { useQuery } from 'react-query';
import Skeleton from 'react-loading-skeleton';
import { Row , Col,Pagination } from 'antd';
import AOS from 'aos';
import 'aos/dist/aos.css';

import './style.css'

AOS.init({
    // Global settings:
    disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
    startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
    initClassName: 'aos-init', // class applied after initialization
    animatedClassName: 'aos-animate', // class applied on animation
    useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
    disableMutationObserver: false, // disables automatic mutations' detections (advanced)
    debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
    throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)
    
  
    // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
    offset: 120, // offset (in px) from the original trigger point
    delay: 0, // values from 0 to 3000, with step 50ms
    duration: 400, // values from 0 to 3000, with step 50ms
    easing: 'ease', // default easing for AOS animations
    once: false, // whether animation should happen only once - while scrolling down
    mirror: false, // whether elements should animate out while scrolling past them
    anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
  
  });
function Anime(props) {
    const [page,setPage]= useState(localStorage.getItem('page') || 1)


    const onChange =  (value) =>{
        setPage(value)
        localStorage.setItem('page',value)
    }
    const fetchAnime = async (page) =>{
        const response = await fetch('https://api.aniapi.com/v1/anime?nsfw=true&page=' + page)
        return response.json()
    
    }
    useEffect(()=>{
        window.scrollTo(0,0)
    },[page])
    const { data,status } = useQuery(['fetchanime',page],()=>fetchAnime(page))
    if (status == 'loading'){
        return (
            <div className="anime-wr">
                <div className="anime-content">
                <Row className="anime-body"  gutter={[20,20]}>
                <Col xs={12} sm={4} className="anime-item-skeleton"><Skeleton style={{height:'100%'}} /></Col>
                <Col xs={12} sm={4} className="anime-item-skeleton"><Skeleton style={{height:'100%'}} /></Col>
                <Col xs={12} sm={4} className="anime-item-skeleton"><Skeleton style={{height:'100%'}} /></Col>
                <Col xs={12} sm={4} className="anime-item-skeleton"><Skeleton style={{height:'100%'}} /></Col>

                <Col xs={12} sm={4} className="anime-item-skeleton"><Skeleton style={{height:'100%'}} /></Col>
                <Col xs={12} sm={4} className="anime-item-skeleton"><Skeleton style={{height:'100%'}} /></Col>
                <Col xs={12} sm={4} className="anime-item-skeleton"><Skeleton style={{height:'100%'}} /></Col>
                <Col xs={12} sm={4} className="anime-item-skeleton"><Skeleton style={{height:'100%'}} /></Col>
                
                </Row>
                </div>
            </div>
        )
    }
    
    
    if (status == 'success'){
        return (
        <div className="anime-wr">
            <div className="anime-content">
                <p className="title-new"> ANIME MỚI </p>
                <Row className="anime-body" gutter={[20,20]}>
                    {
                        data &&
                        data.data.documents.length >0 &&
                        data.data.documents.map(anime =>(
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
                                            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" class="w-6 h-6 text-green-300" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"></path></svg>
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
                 total={100} 
                 pageSize={1} 
                 onChange={onChange} 
                 showSizeChanger
                 className="pagination"
                />
            </div>
        </div>
        );
    }
    
}

export default Anime;