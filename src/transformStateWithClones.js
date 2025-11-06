'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let currentState = { ...state };
  const history = [];

  for (const action of actions) {
    let nextState = { ...currentState };

    switch (action.type) {
      case 'clear':
        nextState = {};
        history.push({ ...nextState });
        currentState = nextState;
        break;

      case 'addProperties':
        Object.assign(nextState, action.extraData);
        history.push({ ...nextState });
        currentState = nextState;
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete nextState[key];
        }
        history.push({ ...nextState });
        currentState = nextState;
        break;

      default:
        break;
    }
  }

  return history;
}
module.exports = transformStateWithClones;
