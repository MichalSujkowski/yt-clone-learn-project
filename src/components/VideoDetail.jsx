import {useState, useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import ReactPlayer from "react-player";

import {Box, Typography, Stack} from '@mui/material';
import {CheckCircle} from "@mui/icons-material";

import {Video} from './index';
import {fetchFromApi} from "../utils/fetchFrom";


const VideoDetail = () => {
    const {id} = useParams();

    const [videoDetails, setVideoDetails] = useState(null);
    const [video, setVideo] = useState(null);

    useEffect(() => {
        fetchFromApi(`videos?part=snippet,statistics&id=${id}`)
            .then((data) => setVideoDetails(data.items[0]))
        fetchFromApi(`search?part=snippet&relatedToVideoId=${id}&type=video`)
            .then((data) => setVideo(data.items))
    }, [id])

    if (!videoDetails?.snippet) return 'Loading...';

    const {snippet: {title, channelId, channelTitle}, statistics: {viewCount, likeCount}} = videoDetails;

    return (
        <Box minHeight={'95vh'}>
            <Stack direction={{xs: 'column', md: 'row'}}>
                <Box flex={1}>
                    <Box sx={{width: '100%', position: 'sticky', top: '86px'}}>
                        <ReactPlayer url={`https://www.youtube.com/watch?v=${id}`}
                                     className={'react-player'}/>
                        <Typography color={'#fff'} variant={'h5'} fontWeight={'bold'}>
                            {title}
                        </Typography>
                        <Stack direction={'row'} justifyContent={'space-between'} sx={{color: '#fff'}} py={1} px={2}>
                            <Link to={`/channel/${channelId}`}>
                                <Typography variant={{sm: 'subtitle1', md: 'h6'}} color={'#fff'}>
                                    {channelTitle}
                                    <CheckCircle sx={{fontSize: '12px', color: 'gray', ml: '5px'}}/>
                                </Typography>
                            </Link>
                            <Stack direction={'row'} gap={'20px'} alignItems={'center'}>
                                <Typography variant={'body1'} sx={{opacity: 0.3}}>
                                    {parseInt(viewCount).toLocaleString()} views
                                </Typography>
                                <Typography variant={'body1'} sx={{opacity: 0.3}}>
                                    {parseInt(likeCount).toLocaleString()} likes
                                </Typography>
                            </Stack>
                        </Stack>
                    </Box>
                </Box>

                <Box px={2} py={{md: 1, xs: 5}} justifyContent={'center'} alignItems={'center'}>
                    <Video videos={video} direction={'column'}/>
                </Box>

            </Stack>

        </Box>
    );
};

export default VideoDetail;