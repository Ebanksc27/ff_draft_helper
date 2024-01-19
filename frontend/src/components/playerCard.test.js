import React from 'react';
import { render, screen } from '@testing-library/react';
import PlayerCard from './playerCard';

describe('PlayerCard', () => {
  it('displays player information', () => {
    const player = {
      player_id: 1,
      name: 'Player One',
      position: 'QB',
      team_id: 'NE',
      status: 'Active'
    };

    render(<PlayerCard player={player} />);

    expect(screen.getByText('Player One')).toBeInTheDocument();
    expect(screen.getByText('QB - NE')).toBeInTheDocument();
    expect(screen.getByText('Status: Active')).toBeInTheDocument();
  });
});
