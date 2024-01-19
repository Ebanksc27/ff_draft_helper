import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import PlayerList from './playerList';

jest.mock('axios');

describe('PlayerList', () => {
  it('renders player data after successful fetch', async () => {
    const mockPlayers = [
      { player_id: 1, name: 'Player One', position: 'QB', team_id: 'NE' },
      { player_id: 2, name: 'Player Two', position: 'RB', team_id: 'SF' },
    ];

    axios.get.mockResolvedValueOnce({ data: mockPlayers });

    render(<PlayerList />);

    await waitFor(() => {
      expect(screen.getByText('Player One')).toBeInTheDocument();
      expect(screen.getByText('Player Two')).toBeInTheDocument();
    });
  });

  it('displays loading message before data is fetched', () => {
    render(<PlayerList />);
    expect(screen.getByText('Loading players...')).toBeInTheDocument();
  });

  it('displays error message on fetch failure', async () => {
    axios.get.mockRejectedValueOnce(new Error('Fetch error'));

    render(<PlayerList />);

    await waitFor(() => {
      expect(screen.getByText('Error fetching players: Fetch error')).toBeInTheDocument();
    });
  });
});
