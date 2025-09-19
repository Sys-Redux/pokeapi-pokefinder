import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import { getTypeColor } from './TypeColor.jsx';

function PokeCard({ pokemon }) {
    return (
        <Card sx={{ maxWidth: 345, margin: '1rem auto', width: '100%' }}>
            <CardMedia
                component='img'
                height='200'
                image={pokemon.sprites.front_default}
                alt={pokemon.name}
                sx={{ objectFit: 'contain' }}
            />
            <CardContent>
                <Typography gutterBottom variant='h5' component='div' sx={{ textTransform: 'capitalize' }}>
                    {pokemon.name}
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                    Height: {pokemon.height / 10} m | Weight: {pokemon.weight / 10} kg
                </Typography>
                <Box sx={{ mt: 2 }}>
                    <Typography variant='body2' sx={{ mb: 1 }}>
                        Types:
                    </Typography>
                    {pokemon.types.map((type, index) => (
                        <Chip
                            key={index}
                            label={type.type.name}
                            variant='outlined'
                            sx={{
                                mr: 1,
                                mb: 1,
                                textTransform: 'capitalize',
                                backgroundColor: getTypeColor(type.type.name),
                                color: '#fff',
                                fontWeight: 'bold',
                                '&:hover' : {
                                    backgroundColor: getTypeColor(type.type.name),
                                    opacity: 0.8,
                                }
                            }}
                        />
                    ))}
                </Box>
            </CardContent>
        </Card>
    );
}

export default PokeCard;