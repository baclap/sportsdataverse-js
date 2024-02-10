import axios from 'axios';
/**
 * Operations for NHL.
 *
 * @namespace nhl
 */
export default {
    /**
     * Gets the NHL game play-by-play data for a specified game.
     * @memberOf nhl
     * @async
     * @function
     * @param {number} id - Game id.
     * @returns json
     * @example
     * const result = await sdv.nhl.getPlayByPlay(401272446);
     */
    getPlayByPlay: async function (id) {
        const baseUrl = 'http://site.api.espn.com/apis/site/v2/sports/hockey/nhl/summary';
        const params = {
            event: id
        };

        const res = await axios.get(baseUrl, {
            params
        });

        return {
            teams: res.data.header.competitions[0].competitors,
            id: parseInt(res.data.header.id),
            plays: res.data.plays,
            onIce: res.data.onIce,
            competitions: res.data.header.competitions,
            season: res.data.header.season,
            boxScore: res.data.boxscore,
            seasonSeries: res.data.seasonseries,
            standings: res.data.standings
        };
    },
    /**
     * Gets the NHL game box score data for a specified game.
     * @memberOf nhl
     * @async
     * @function
     * @param {number} id - Game id.
     * @returns json
     * @example
     * const result = await sdv.nhl.getBoxScore(401272446);
     */
    getBoxScore: async function (id) {
        const baseUrl = 'http://site.api.espn.com/apis/site/v2/sports/hockey/nhl/summary';
        const params = {
            event: id
        };

        const res = await axios.get(baseUrl, {
            params
        });

        const game = res.data.boxscore;
        game.id = parseInt(res.data.header.id);

        return game;
    },
    /**
     * Gets the NHL game summary data for a specified game.
     * @memberOf nhl
     * @async
     * @function
     * @param {number} id - Game id.
     * @returns json
     * @example
     * const result = await sdv.nhl.getSummary(401272446);
     */
    getSummary: async function (id) {
        const baseUrl = 'http://site.api.espn.com/apis/site/v2/sports/hockey/nhl/summary';
        const params = {
            event: id
        };

        const res = await axios.get(baseUrl, {
            params
        });

        return {
            boxScore: res.data.boxscore,
            gameInfo: res.data.gameInfo,
            header: res.data.header,
            teams: res.data.header.competitions[0].competitors,
            id: parseInt(res.data.header.id),
            plays: res.data.plays,
            onIce: res.data.onIce,
            leaders: res.data.leaders,
            competitions: res.data.header.competitions,
            season: res.data.header.season,
            seasonSeries: res.data.seasonseries,
            standings: res.data.standings
        };
    },
    /**
     * Gets the NHL PickCenter data for a specified game.
     * @memberOf nhl
     * @async
     * @function
     * @param {number} id - Game id.
     * @returns json
     * @example
     * const result = await sdv.nhl.getPicks(401272446);
     */
    getPicks: async function (id) {
        const baseUrl = 'http://site.api.espn.com/apis/site/v2/sports/hockey/nhl/summary';
        const params = {
            event: id
        };

        const res = await axios.get(baseUrl, {
            params
        });

        return {
            id: parseInt(res.data.header.id),
            gameInfo: res.data.gameInfo,
            leaders: res.data.leaders,
            header: res.data.header,
            teams: res.data.header.competitions[0].competitors,
            competitions: res.data.header.competitions,
            pickcenter: res.data.winprobability,
            againstTheSpread: res.data.againstTheSpread,
            odds: res.data.odds,
            seasonSeries: res.data.seasonseries,
            season: res.data.header.season,
            standings: res.data.standings
        };
    },
    /**
     * Gets the NHL schedule data for a specified date if available.
     * @memberOf nhl
     * @async
     * @function
     * @param {*} year - Year (YYYY)
     * @param {*} month - Month (MM)
     * @param {*} day - Day (DD)
     * @returns json
     * @example
     * const result = await sdv.nhl.getSchedule(
     * year = 2019, month = 11, day = 17
     * )
     */
    getSchedule: async function ({ year = null, month = null, day = null }) {
        const baseUrl = `http://cdn.espn.com/core/nhl/schedule?dates=${year}${parseInt(month) <= 9 ? "0" + parseInt(month) : parseInt(month)}${parseInt(day) <= 9 ? "0" + parseInt(day) : parseInt(day)}`;
        const params = {
            xhr: 1,
            render: false,
            device: 'desktop',
            userab: 18
        };

        const res = await axios.get(baseUrl, {
            params
        });
        return res.data.content.schedule;
    },
    /**
     * Gets the NHL scoreboard data for a specified date if available.
     * @memberOf nhl
     * @async
     * @function
     * @param {*} year - Year (YYYY)
     * @param {*} month - Month (MM)
     * @param {*} day - Day (DD)
     * @param {number} limit - Limit on the number of results @default 300
     * @returns json
     * @example
     * const result = await sdv.nhl.getScoreboard(
     * year = 2019, month = 11, day = 16
     * )
     */
    getScoreboard: async function ({ year, month, day, limit = 300 }) {
        const baseUrl = `http://site.api.espn.com/apis/site/v2/sports/hockey/nhl/scoreboard`;
        const params = {
            limit
        };
        if (year && month && day) {
            params.dates = `${year}${parseInt(month) <= 9 ? "0" + parseInt(month) : parseInt(month)}${parseInt(day) <= 9 ? "0" + parseInt(day) : parseInt(day)}`;
        }

        const res = await axios.get(baseUrl, {
            params
        });

        return res.data;
    },
    /**
     * Gets the team standings for the NHL.
     * @memberOf nhl
     * @async
     * @function
     * @param {number} year - Season
     * @param {string} group - acceptable group names: 'league','conference','division'
     * @returns json
     * @example
     * const yr = 2016;
     * const result = await sdv.nhl.getStandings(year = yr);
     */
    getStandings: async function ({ year = new Date().getFullYear(), group = 'league' }) {
        const groupId = group === 'league' ? 1 : group === 'conference' ? 2 : 3;
        const baseUrl = `https://site.web.api.espn.com/apis/v2/sports/hockey/nhl/standings`;
        const params = {
            region: 'us',
            lang: 'en',
            contentorigin: 'espn',
            type: 1,
            level: groupId,
            sort: 'playoffseed:asc,points:desc,gamesplayed:asc,rotwins:desc',
            season: year
        };
        const res = await axios.get(baseUrl, {
            params
        });
        return res.data;
    },
    /**
     * Gets the list of all NHL teams their identification info for ESPN.
     * @memberOf nhl
     * @async
     * @function
     * @example
     * const result = await sdv.nhl.getTeamList();
     */
    getTeamList: async function () {
        const baseUrl = 'http://site.api.espn.com/apis/site/v2/sports/hockey/nhl/teams';
        const params = {
            limit: 1000
        };

        const res = await axios.get(baseUrl, {
            params
        });

        return res.data;
    },
    /**
     * Gets the team info for a specific NHL team.
     * @memberOf nhl
     * @async
     * @function
     * @param {number} id - Team Id
     * @returns json
     * @example
     * const teamId = 16;
     * const result = await sdv.nhl.getTeamInfo(teamId);
     */
    getTeamInfo: async function (id) {
        const baseUrl = `http://site.api.espn.com/apis/site/v2/sports/hockey/nhl/teams/${id}`;

        const res = await axios.get(baseUrl);
        return res.data;
    },
    /**
     * Gets the team roster information for a specific NHL team.
     * @memberOf nhl
     * @async
     * @function
     * @param {number} id - Team Id
     * @returns json
     * @example
     * const teamId = 16;
     * const result = await sdv.nhl.getTeamPlayers(teamId);
     */
    getTeamPlayers: async function (id) {
        const baseUrl = `http://site.api.espn.com/apis/site/v2/sports/hockey/nhl/teams/${id}`;
        const params = {
            enable: "roster"
        };

        const res = await axios.get(baseUrl, {
            params
        });

        return res.data;
    }

}
