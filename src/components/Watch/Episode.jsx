import React from 'react';
import axios from 'axios'
import ReactPlayer from 'react-player'
import { useQuery } from 'react-query';
import './style.css';
import Skeleton from 'react-loading-skeleton'

const fetchEpisode = async (id,episode) =>{
    return axios.get('https://api.aniapi.com/v1/episode?anime_id='+ id + '&number='+ episode +'&source=dreamsub&locale=it');
   

}

function Episode({id,episode}) {
    
   
    const { data,status } = useQuery(['fetchEpisode',id,episode],()=>fetchEpisode(id,episode))
    if (status == 'success'){
        // console.log('episode',data);
        

        
        if(data?.data.status_code == 404) return <h1 style={{color:'#fff'}}>phim bị lỗi</h1>
        return (
            <div className="player-controls">
                <h1 className="episode-current">
                    Episode {episode}
                </h1>
                <ReactPlayer url={data?.data.data.documents[0].video}  controls  style={{height:'100%',width:'100%',maxWidth:'100vw'}} />
            </div>    
            
        )
    }

    return (
        <div>
            <div className="player-controls">
                <Skeleton className="episode-current"/>
                <Skeleton  style={{height:'100%',width:'100%',maxWidth:'100vw'}} />
            </div> 
        </div>
    );
}

export default Episode;