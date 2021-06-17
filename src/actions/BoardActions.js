export const initBoardAction = () => ({
    type: "INIT"
});

export const setBoardAction = (fromIndex, toIndex, isBrightTeam) => ({
    type: "SET_BOARD",
    fromIndex,
    toIndex,
    isBrightTeam
});

export const setKingAction = (index) => ({
    type: "SET_KING",
    index
});

export const jumpAction = (index) => ({
    type: "JUMP",
    index
});

export const initTeamAction = (team) => ({
    type: "INIT_TEAM",
    team
});

export const setTeamAction = (isBrightTeam) => ({
    type: "SET_TEAM",
    isBrightTeam
});

export const anotherJumpAction = (hasAnotherJump, jumpOrigin) => ({
    type: "ANOTHER_JUMP",
    hasAnotherJump,
    jumpOrigin
});


export const deleteGame = () => ({
    type: "DELETE"
});