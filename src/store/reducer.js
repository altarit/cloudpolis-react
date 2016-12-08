import {Map, fromJS} from 'immutable';

function getInitionalState() {
  return fromJS({
    sidebar: {
      isOpen: true
    },
    player: {
      playlist: {

      }
    }
  });
}

function toogleSidebar(state) {
  return state.updateIn(
    ['sidebar', 'isOpen'],
    false,
    isOpen => !isOpen
  );
}

export default function(state = getInitionalState(), action) {
  switch (action.type) {
    case 'SIDEBAR_TOOGLE':
          return toogleSidebar(state);
  }

  return state;
}



