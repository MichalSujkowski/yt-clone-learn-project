import React, {useEffect, useState} from 'react';
import {fetchFromApi} from "../utils/fetchFrom";
import {Box, Typography} from "@mui/material";
import {Video} from "./index";
import {useParams} from "react-router-dom";

const SearchFeed = () => {
    const [videos, setVideos] = useState([]);
    const {searchTerm} = useParams();

    useEffect(() => {
        fetchFromApi(`search?part=snippet&q=${searchTerm}`)
            .then((data) => setVideos(data.items))
    }, [searchTerm]);

    return (
        <Box p={2} sx={{overflowY: 'auto', height: '90vh', flex: 2}}>
            <Typography variant={"h4"} fontWeight={'bold'} mb={2} ml={2} sx={{color: 'white'}}>
                Search result for: <span style={{color: '#F31503'}}>{searchTerm}</span> videos
            </Typography>

            <Video videos={videos}/>

        </Box>
    )
};


export default SearchFeed;