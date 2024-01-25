import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import PlayerCard from './playerCard';

// Mock Axios and local storage
jest.mock('axios');
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

describe('PlayerCard', () => {
    const mockPlayer = {
        player_id: 1,
        name: 'John Doe',
        position: 'QB',
        team_id: 'Team A',
        status: 'Active',
        stats: { age: 30, height: 72, weight: 200, college: 'University' },
        isFavorite: false
    };

    const mockUpdateFavoriteStatus = jest.fn();

    it('renders correctly', () => {
        const { getByText } = render(
            <PlayerCard player={mockPlayer} updateFavoriteStatus={mockUpdateFavoriteStatus} />
        );
        expect(getByText('John Doe')).toBeInTheDocument();
        expect(getByText('QB - Team A')).toBeInTheDocument();
    });

    it('toggles favorite status on button click', async () => {
        window.localStorage.setItem('token', 'mockToken');
        mockedAxios.post.mockResolvedValue({}); // Mock Axios POST response
        mockedAxios.delete.mockResolvedValue({}); // Mock Axios DELETE response

        const { getByText } = render(
            <PlayerCard player={mockPlayer} updateFavoriteStatus={mockUpdateFavoriteStatus} />
        );

        const favoriteButton = getByText('Favorite');
        fireEvent.click(favoriteButton);

        await waitFor(() => {
            expect(mockUpdateFavoriteStatus).toHaveBeenCalledWith(1, true);
        });
    });

});
