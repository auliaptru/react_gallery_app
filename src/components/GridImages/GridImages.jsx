// import { images } from '../../context/data';
import Masonry from 'react-masonry-css';
import useFirestore from '../../hooks/useFirestore';

import './gridImages.scss';

const GridImages = () => {
    const breakpointColumnsObj = {
        default: 3,
        1100: 3,
        700: 2,
        500: 1,
    };

    const { imgs, loading } = useFirestore('images');

    if (loading) {
        return <div className='loading'>Loading...</div>;
    }

    return (
        <Masonry
            breakpointCols={breakpointColumnsObj}
            className='my-masonry-grid'
            columnClassName='my-masonry-grid_column'
        >
            {imgs?.map((img, i) => (
                <div className='img' key={`img-${i}`}>
                    <img src={img.imgUrl} alt='' />
                    <p>Uploaded by: {img.userName}</p>
                </div>
            ))}
        </Masonry>
    );
};

export default GridImages;
