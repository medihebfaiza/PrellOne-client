
const Member = (state = {}, action) => {
    switch (action.type) {
        case 'BOARD_FETCHED':
            return action.payload.members.reduce((map, member) => {
                map[member.id] = member;
                return map;
            }, {});
        case 'TEAMS_FETCHED':
            var allMembers = [];
            action.teams.map((team) => {
                allMembers = [...allMembers, ...team.members]
                return team
            });
            return allMembers.reduce((map, member) => {
                map[member.id] = member;
                return map;
            }, {});

        case 'TEAM_ADDED_BOARD':
            const newMembers = action.team.members.reduce((map, member) => {
                map[member.id] = member;
                return map;
            }, {});
            return {
                ...state,
                ...newMembers
            }
        case 'TEAM_ADDED': 
            const members = action.team.members.reduce((map, member) => {
                map[member.id] = member;
                return map;
            }, {});
            return {
                ...state,
                ...members
            }

        case 'ADD_MEMBER_TEAM':
            return {
                ...state,
                [action.member.id]:action.member
            }
        case 'MEMBER_ADDED_TEAM':
            return {
                ...state,
                [action.member.id]: action.member
            }

        case 'MEMBER_ADDED_BOARD':
            return {
                ...state,
                [action.member.id]: action.member
            }
        case 'MEMBER_ADDED_BOARD_SUCCESS':
            return {
                ...state,
                [action.payload.member.id]: action.payload.member
            }

        case 'MEMBER_ADDED_CARD':
            return {
                ...state,
                [action.member.id]: action.member
            }
        default:
            return state
    }
}

export default Member