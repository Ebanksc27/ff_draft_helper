import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import PlayerList from './playerList';

// Mocking dependencies
jest.mock('axios');
jest.mock('./playerCard', () => (props) => <div data-testid="player-card">{props.player.name}</div>);
const mockedAxios = axios;
const mockLocalStorage = (function () {
    let store = {};
    return {
        getItem(key) {
            return store[key] || null;
        },
        setItem(key, value) {
            store[key] = value.toString();
        },
        clear() {
            store = {};
        }
    };
})();
Object.defineProperty(window, 'localStorage', { value: mockLocalStorage });

describe('PlayerList', () => {
    beforeEach(() => {
        window.localStorage.setItem('token', 'mockToken');
        mockedAxios.get.mockResolvedValue({
            data: [{ player_id: 1, name: 'John Doe', isFavorite: false }]
        });
    });

    it('renders correctly', () => {
        const { getByLabelText, getByText } = render(<PlayerList />);
        expect(getByLabelText('Search Players')).toBeInTheDocument();
        expect(getByText('Search')).toBeInTheDocument();
    });

    it('fetches and displays players on search', async () => {
        const { getByLabelText, getByText, findByTestId } = render(<PlayerList />);
        
        fireEvent.change(getByLabelText('Search Players'), { target: { value: 'John' } });
        fireEvent.click(getByText('Search'));

        await waitFor(() => {
            expect(mockedAxios.get).toHaveBeenCalledWith('http://localhost:3000/api/players?name=John', expect.anything());
        });

        const playerCard = await findByTestId('player-card');
        expect(playerCard).toHaveTextContent('John Doe');
    });
});

