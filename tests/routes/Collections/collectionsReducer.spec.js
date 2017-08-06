import {TREE_TOGGLE} from 'routes/Collections/modules/collections'
import reducer from 'routes/Collections/modules/collections'

describe('routes/Collections - Reducer', () => {
  it('TREE_TOGGLE', () => {
    const prevState = {
      dirs: [{
        name: 'Dm',
      }, {
        name: 'mlp',
        dirs: [{
          name: 'fa16',
          dirs: [{
            name: 'A',
            dirs: [{
              name: 'a'
            }]
          }, {
            name: 'B'
          }]
        }, {
          name: 'add3'
        }, {
          name: 'new'
        }]
      }, {
        name: 'Dp',
        dirs: [{
          name: 'markI'
        }, {
          name: 'markII'
        }]
      }]
    }
    const nextState = reducer(prevState, {
      type: TREE_TOGGLE,
      path: '/mlp/fa16/A'
    })
    expect(nextState.dirs).to.not.equal(prevState.dirs)
    expect(nextState.dirs[1]).to.not.equal(prevState.dirs[1])
    expect(nextState.dirs[1].dirs).to.not.equal(prevState.dirs[1].dirs)
    expect(nextState.dirs[1].dirs[0]).to.not.equal(prevState.dirs[1].dirs[0])
    expect(nextState.dirs[1].dirs[0].dirs).to.not.equal(prevState.dirs[1].dirs[0].dirs)
    expect(nextState.dirs[1].dirs[0].dirs[0]).to.not.equal(prevState.dirs[1].dirs[0].dirs[0])
  })
})
