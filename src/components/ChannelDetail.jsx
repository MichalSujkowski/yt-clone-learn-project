import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {Box} from '@mui/material';
import {Video, ChannelCard} from './index';
import {fetchFromApi} from "../utils/fetchFrom";


const ChannelDetail = () => {
    const [channelDetail, setChannelDetail] = useState(null);
    const [videos, setVideos] = useState([]);

    const {id} = useParams();

    console.log(channelDetail, videos)

    useEffect(() => {
        fetchFromApi(`channels?part=snippet&id=${id}`)
            .then((data) => setChannelDetail(data?.items[0]));

        fetchFromApi(`search?channelId=${id}&part=snippet&order=date`)
            .then((data) => setVideos(data?.items));
    }, [id]);

    return (
        <Box minHeight={'95vh'}>
            <Box
                sx={{mb: 2}}>
                <div
                    style={{
                        background: `radial-gradient(circle, rgba(89, 131, 252, 1) 0%, rgba(41, 53, 86, 1) 100%)`,
                        zIndex: 10,
                        height: '300px',
                    }}>
                    <ChannelCard channelDetail={channelDetail}/>
                </div>
            </Box>
            <Box display={'flex'} p={'2'}>
                <div></div>
                <Box sx={{mr: {sm: '100px'}}}/>
                <Video videos={videos}/>
            </Box>
        </Box>
    );
};

export default ChannelDetail;