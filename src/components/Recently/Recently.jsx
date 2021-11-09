import React from 'react';
import { Link } from 'react-router-dom'
import { Row , Col } from 'antd';

function Recently(props) {
    const recentlyList = JSON.parse(localStorage.getItem('recently')) || []
    const arr = []
   
    function unique(arr) {
        var newArr = []
        for (var i = 0; i < arr.length; i++) {
            if(i==0){
                newArr.push(arr[i])
            }
            if(i!=0){
                if (!newArr.includes(arr[i])) {
                    let cloneArr = arr[i] //clone ra arr mới để so sánh
                    let a = false // biến thử xem có bằng nhau k?
                    for(let i= 0 ;i<newArr.length;i++){
                        if(newArr[i].data.id == cloneArr.data.id ){
                            a =true;
                            break;
                        }
                        else{
                            a = false;
                        }
                    }
                    if(!a){
                        newArr.push(cloneArr)
                    }
                }
            }
        }
        return newArr
    }
    const animeList = unique(recentlyList?.slice(0,8))
    // console.log('unique',unique(recentlyList))
    // console.log('recently-page', recentlyList)

    if(animeList.length > 0 ){
        return (
            <div className="anime-wr">
                <div className="anime-content">
                    <p className="title-new"> Đã xem gần đây  </p>
                    <Row className="anime-body" gutter={[20,20]}>
                        {
                            
                            animeList?.map(anime =>(
                                <Col key={anime.data.id} xs={12} sm={8} lg={6} xl={4} xxl={4} >
                                    <Link
                                    className="anime-item"  
                                    to={`/anime/${anime.data.id}`}
                                    >
                                        <div className="anime-item-img">
                                            <img src={anime.data.cover_image} alt="img" />
                                        </div>
                                        <div className="anime-item-des">
                                        <p
                                        
                                         className="anime-item-name" 
                                         style={{color:anime.data.cover_color}}
                                        >
                                            {anime.data.titles.en}
                                        </p>
                                        <p className="anime-item-genre">
                                            <span style={{color:anime.data.cover_color}}>{anime.data.genres[0]}</span> 
                                            <span className="dot"></span>
                                            <span style={{color:anime.data.cover_color}}>{anime.data.genres[1]}</span>
                                            
                                        </p>
                                        <div className="emoji">
                                            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" class="w-6 h-6 text-green-300" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"></path></svg>
                                            <span className="percent">{anime.data.score} %</span>
                                        </div>
                                        
                                    </div>
                                    </Link>
                                </Col>        
                            ))
                        }
                    </Row>
                    
                </div>
            </div>
        );
    }
    else {
        return (
            <>
            </>
        )
    }
}

export default Recently;