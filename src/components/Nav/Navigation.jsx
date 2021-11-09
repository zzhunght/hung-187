import React, { useState } from 'react';
import logo from '../../img/logo-g.png'
import { SearchOutlined } from '@ant-design/icons'
import { Input, Space } from 'antd';
import './style.css';
import { Link ,useRouteMatch} from 'react-router-dom';
import axios from 'axios'
import { useQuery } from 'react-query'


const MenuMobile = ({years,genres,showmenu,handelTongleMenu}) =>{
    const [show,setShow] = useState(false)
    const [showgenres,setShowGenres] = useState(false)
    const onClick = () => {
        setShow(false)
        setShowGenres(false)
        handelTongleMenu()
    }
    return(
        <>
                 
                <div className={`mobile-menu__inner ${showmenu? 'show':''}`}>
                    <p>
                        <Link to="/" style={{ color:'red'}} onClick={onClick}>
                            Trang Chủ
                        </Link>
                    </p>
                    <div className="mobile-menu_years">
                        
                        <p className="mobile-menu_year_label" onClick={()=>setShow(!show)}> Năm </p>
                        <ul className={`mobile-menu_years-list  ${show?'show':''}`}>
                            {years.map(year => (
                                <li key={year.id} className="mobile-menu_year-item">
                                    <Link className="mobile-item-link" to={`/${year.id}/years`} onClick={onClick}>
                                        {year.id}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="mobile-menu_genres">
                        <p className="mobile-menu_genres_label" onClick={()=>setShowGenres(!showgenres)}> Thể Loại </p>
                        <ul className={`mobile-menu_genres-list ${showgenres?'show':''}`}>
                            {genres?.slice(0,100).map((genre,i) => (
                                <li key={i} className="mobile-menu_genre-item">
                                    <Link className="mobile-item-link" to={`/anime-genre/${genre}`} onClick={onClick}>
                                        {genre}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
       

        </>
    )
}


const fetchGenreList = () =>{
    return axios.get(`https://api.aniapi.com/v1/resources/1.0/0`)
    
}


function Navigation({handelsearchData}) {
    const [showMenu,setShowMenu]= useState(false)
   
    const years = [
        {
            label: 'Năm 2021',
            id:2021
        },
        {
            label: 'Năm 2020',
            id:2020
        },
        {
            label: 'Năm 2019',
            id:2019
        },
        {
            label: 'Năm 2018',
            id:2018
        },
        {
            label: 'Năm 2017',
            id:2017
        },
        {
            label: 'Năm 2016',
            id:2016
        }, {
            label: 'Năm 2015',
            id:2015
        },
        {
            label: 'Năm 2014',
            id:2014
        },
        {
            label: 'Năm 2013',
            id:2013
        },
        {
            label: 'Năm 2012',
            id:2012
        },
        {
            label: 'Năm 2011',
            id:2011
        },
        {
            label: 'Năm 2010',
            id:2010
        }, {
            label: 'Năm 2009',
            id:2009
        },
        {
            label: 'Năm 2008',
            id:2008
        }, {
            label: 'Năm 2007',
            id:2007
        }
        , {
            label: 'Năm 2006',
            id:2006
        }
    ]
    const handelTongleMenu = () =>{
        setShowMenu(!showMenu)
    }
    const [value,setValue] = useState('')
    const onSearch = e => {
    
        const newValue = value.replace(/\s/g, "%20")
        handelsearchData(newValue)
    };

    const {data , isFetching , isLoading } = useQuery('genre-list',fetchGenreList, {
    
    })
    console.log('genre-list',data)
    return (
        <div className="navigation">
            <div className="navigation-content">
                <div className={`hamburger ${showMenu ? " show" : ''}`} onClick={()=>setShowMenu(!showMenu)}>
                    <div className={`line ${showMenu? "active" : ''}`}></div>
                    <div className={`line ${showMenu? "active" : ''}`}></div>
                    <div className={`line ${showMenu? "active" : ''}`}></div>
                </div>
                <div className="logo-wr">
                    <Link to="/" style={{textDecoration:'none',color:"#fff"}}>
                        <div className="logo">
                           <img src={logo} /> 
                       
                        </div>
                    </Link>
                </div>
                <div className="years">
                    <p className="years-label"> Năm Phát Hành</p>
                    <ul className="years-list">
                        {years.map(year =>(
                          
                            <li key={year.id} className="year-items">
                                <Link className="year-items-label" to={`/${year.id}/years`}>
                                    {year.label}
                                </Link>
                            </li>  
                           
                        ))}
                    </ul>
                </div>
                <div className=" genres">
                    <p className="genres-label"> Thể Loại</p>
                    <ul className=" genres-list">
                        {data?.data.data.genres.map((genre,i) =>(
                          
                            <li key={i} className="genre-items">
                                <Link className="genre-items-label" to={`/anime-genre/${genre}`}>
                                    {genre}
                                </Link>
                            </li>  
                           
                        ))}
                    </ul>
                </div>
                <div className={`mobile-menu `}>
                    <MenuMobile
                     years={years} 
                     genres={data?.data.data.genres} 
                     showmenu={showMenu} 
                     handelTongleMenu={handelTongleMenu}
                    />
                </div>
                <div className="search-box" >
                   <input type="text"  placeholder="tên phim" className="input" onChange={e => setValue(e.target.value.replace(/\s/g, "%20"))}/>
                   <button className="search-box-button" type="submit">
                       <Link to={`/search/${value}`} className="search-box-btn">
                            <SearchOutlined />
                       </Link>
                   </button>
                </div>                    
                
            </div>
        </div>
    );
}

export default Navigation;