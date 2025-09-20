import { useState } from 'react'
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import PokeCard from './PokeCard.jsx';

function PokeCall() {
    const [pokemonList, setPokemonList] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [error, setError] = useState(null);

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const fetchPokemon = () => {
        if (!inputValue.trim()) return;

        setError(null);
        fetch(`https://pokeapi.co/api/v2/pokemon/${inputValue.toLowerCase()}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Pokemon not found');
                }
                return response.json();
            })
            .then((data) => {
                // Check if pokemone already in list
                const exists = pokemonList.some(pokemon => pokemon.id === data.id);
                if (!exists) {
                    setPokemonList(prev => [...prev, data]);
                }
                setInputValue(''); // Clear input field after successful fetch
            })
            .catch(() => setError('Pokemon not found'));
    };

    // Clears pokemon list and error message
    const resetPokemon = () => {
        setPokemonList([]);
        setError(null);
    };

    // Allow "Enter" key to trigger search
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            fetchPokemon();
        }
    };

    return (
        <Container maxWidth="md" style={{ marginTop: '2rem' }}>
            <h1>PokeSearch</h1>
            <Paper component="form" style={{ display: 'flex', alignItems: 'center', padding: '0.5rem' }}>
                <InputBase
                    placeholder="Enter Pokemon Name"
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyPress}
                    style={{ flex: 1, marginLeft: '0.5rem' }}
                />
                <Button
                    variant='contained'
                    color='primary'
                    onClick={fetchPokemon}
                    style={{ marginRight: '0.5rem' }}
                >
                    Search
                </Button>
                {pokemonList.length > 0 && (
                    <Button
                        variant='outlined'
                        color='secondary'
                        onClick={resetPokemon}
                        style={{ marginLeft: '0.5rem' }}
                    >
                        Reset
                    </Button>
                )}
            </Paper>

            {error && (
                <Typography color='error' style={{ marginTop: '1rem', textAlign: 'center' }}>
                    {error}
                </Typography>
            )}

            <Box style={{ mt: 2 }}>
                <Grid container spacing={2}>
                    {pokemonList.map((pokemon) => (
                        <Grid item xs={12} sm={6} md={4} key={pokemon.id}>
                            <PokeCard pokemon={pokemon} />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Container>
    );
}

export default PokeCall