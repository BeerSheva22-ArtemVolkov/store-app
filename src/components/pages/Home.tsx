import ImageList from "@mui/material/ImageList";
import { Box, ImageListItem, Typography } from "@mui/material";
import { useSelectorProducts } from "../../hooks/hooks";
import ProductType from "../../model/ProductType";

function getMultipleRandom(arr: ProductType[], num: number) {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
}

const Home: React.FC = () => {

    const products: ProductType[] = useSelectorProducts();

    return (
        <>
            <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h3">
                    Our Products
                </Typography>
            </Box>
            <Box sx={{ width: '100%' }}>
                <ImageList sx={{ width: '100%', height: '100%' }} cols={3} rowHeight={'auto'}>
                    {getMultipleRandom(products.slice(), 9).map((product) => (
                        <ImageListItem key={product.image.url} cols={1} rows={1}>
                            <img
                                src={`${product.image.url}?w=164&h=164&fit=crop&auto=format`}
                                srcSet={`${product.image.url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                alt={product.name}
                                loading="lazy"
                            />
                        </ImageListItem>
                    ))}
                </ImageList>
            </Box>
        </>

    );
}

export default Home