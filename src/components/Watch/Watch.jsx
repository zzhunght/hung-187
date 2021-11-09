import React, { useState } from 'react';
import axios from 'axios';
import { useRouteMatch } from 'react-router-dom';
import { useQuery } from 'react-query';
import Skeleton from 'react-loading-skeleton'
import Episode from './Episode';
import meme1 from '../../img/ko-on.jpg';
import meme2 from '../../img/khong-thay-zi-nuon.jpg'
import './style.css'

const fetchEpisodeList = async (id , page) =>{
    return axios.get(`https://api.aniapi.com/v1/episode?anime_id=${id}&locale=it&page=${page}`)
}


function Watch(props) {
    
    const [locale,setLocale] = useState('it')
   
    const [page, setPage] = useState(Number(localStorage.getItem('page')) || 1 )
    const [episodecurrent,setEpisodecurrent] = useState( Number(localStorage.getItem('episode')) || 1 )
    let param = useRouteMatch();
    // console.log(param)
    const id = param.params.id;
    if(localStorage.getItem('old-id') == false) {
        localStorage.setItem('old-id',id )
        console.log(localStorage.getItem('old-id'))
    }
    if(localStorage.getItem('old-id')){
        // console.log('true')
        if(Number(localStorage.getItem('old-id')) != id){
            
            localStorage.setItem('old-id',id )
            console.log('id',localStorage.getItem('old-id'))
            setEpisodecurrent(1)
            
            localStorage.setItem('page',1)
            localStorage.setItem('episode','1')
        }
    }
    
    const handelsetEpisode = (value) =>{
        setEpisodecurrent(value)
        localStorage.setItem('episode',value)
    }
    const handelsetPagePrev = () =>{
        setPage(old => Math.max(old - 1, 0))
        localStorage.setItem('page',page)
        console.log('page',localStorage.getItem('page'))
    }
    const handelsetPageNext = () =>{
        setPage( x => x +1 )
        localStorage.setItem('page',page + 1)
        console.log('page',localStorage.getItem('page'))
    }

   
    const { data,status } = useQuery(['fetchEpisode',id,page],()=>fetchEpisodeList(id,page),{
        refetchInterval:1000,
        keepPreviousData:true,
    })
    if(status == 'loading'){
        return(
            <div className="watch">
                <div>
                    <div className="player-controls">
                        <Skeleton className="episode-current"/>
                        <Skeleton  />
                    </div> 
                </div>
                <div className="episode">
                <button className=" espisode-btn btn skeleton "><Skeleton /></button>   
                <button className=" espisode-btn btn skeleton "><Skeleton /></button>   
                <button className=" espisode-btn btn skeleton "><Skeleton /></button>   
                <button className=" espisode-btn btn skeleton "><Skeleton /></button>   
                <button className=" espisode-btn btn skeleton "><Skeleton /></button>   
                </div>
            </div>
            
            
        )
    }
    
    if(status == 'success'){
        // console.log(episodecurrent)
       
        // console.log('dataWatch',data)
        if(data.data.status_code === 404){
           
            
        
            return (
                <div className="meme">
                    <h1 className="meme-title">
                        Phim này chưa xem được nha quý zị !!!
                    </h1>
                    <img src={meme1} alt="" className="meme1 " />
                    <img src={meme2} alt="" className="meme2 "/>
                </div> 
            )
        }


        if(data.data.status_code === 200){
            return (
                <div className="watch">
                    <Episode id={id}  episode={episodecurrent} />
                    <div className="next-prev-episode">
                            <button
                             className="prev-episode-btn"
                             onClick={()=> {
                                setEpisodecurrent(old => Math.max(old - 1, 1))
                                
                             }}
                             disabled={episodecurrent === 1}
                            > 
                                Tập Trước
                            </button>
                            <button
                             className="next-episode-btn"
                             onClick={()=> {
                                setEpisodecurrent(x => x + 1)
                                localStorage.setItem('episode',episodecurrent) //đoạn này dùng để lưu tập nếu khi truy cập lai
                             }}
                            
                            > 
                                Tập Kế
                            </button>
                        </div>
                   <div className="episode">
                        
                       { data?.data.data.documents.map((episode ,i,a)=> {
                        //    console.log('i',i)
                        //    console.log('a',a[i])

                        if(i-1>0 && episode.number != a[i-1].number){
                            return (
                            <React.Fragment key={episode.id}>
                                <button
                                 onClick={() => handelsetEpisode(episode.number)} 
                                 className={`${episode.number === episodecurrent ? 'active':''} espisode-btn btn`}
                             
                                >
                                    {episode.number}
                                </button>   
                            </React.Fragment>
                            )
                        }})}
                        
                        <div className="btn-control">
                        {data.data.data.current_page === data.data.data.last_page ?" ":<button
                             onClick={handelsetPageNext} disabled={data.data.data.current_page === data.data.data.last_page} 
                             className="next-btn"    
                            >
                                Next
                            </button> 
                            
                        }
                         {data.data.data.current_page === 1 ?" ": <button
                             onClick={handelsetPagePrev}
                             disabled={page === 1}
                             className="prev-btn" 
                            >
                                Prev
                            </button>
                            
                        }
                        </div>
                   </div>
                </div>
            );
        }
        
    }

   
}

export default Watch;