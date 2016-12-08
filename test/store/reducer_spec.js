import {List, Map, fromJS} from 'immutable';
import {expect} from 'chai';

import reducer from '../../src/store/reducer';
import * as actions from '../../src/store/action_creators';


describe('reducer', () => {

  describe('toogleSidebar', () => {

    it('from empty state to true', () => {
      const state = Map();
      const action = actions.toogleSidebar();

      const newState = reducer(state, action);
      expect(newState).to.equals(fromJS({
        sidebar: {
          isOpen: true
        }
      }));
    });

    it('from true to false', () => {
      const state = fromJS({
        sidebar: {
          isOpen: true
        }
      });
      const action = actions.toogleSidebar();

      const newState = reducer(state, action);
      expect(newState).to.equals(fromJS({
        sidebar: {
          isOpen: false
        }
      }));

    });
  });

});
