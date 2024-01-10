const axios = require('axios');
const db = require('./db'); 

async function fetchAndStoreNFLPlayers() {
    try {
        const response = await axios.get('https://api.sleeper.app/v1/players/nfl');
        const playersData = response.data;

        for (const playerId in playersData) {
            const player = playersData[playerId];
            const fullName = player.first_name + ' ' + player.last_name;
            const teamCode = player.team; // Use the team code directly as team_id

            const position = player.position;
            const status = player.status;

            const stats = JSON.stringify({
                depth_chart_position: player.depth_chart_position,
                weight: player.weight,
                college: player.college,
                height: player.height,
                age: player.age,
                birth_country: player.birth_country
            });

            // Insert or update the player data in your database
            await db.query(
                'INSERT INTO players (player_id, name, position, status, stats, team_id) VALUES ($1, $2, $3, $4, $5, $6) ' +
                'ON CONFLICT (player_id) DO UPDATE SET name = EXCLUDED.name, position = EXCLUDED.position, status = EXCLUDED.status, stats = EXCLUDED.stats, team_id = EXCLUDED.team_id',
                [playerId, fullName, position, status, stats, teamCode]
            );
        }
        console.log('NFL players data fetched and stored successfully.');
    } catch (error) {
        console.error('Error fetching NFL players:', error);
    }
}

module.exports = fetchAndStoreNFLPlayers;


