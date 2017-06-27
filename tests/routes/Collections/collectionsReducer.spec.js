import {TREE_TOGGLE} from 'routes/Collections/modules/collections'
import reducer from 'routes/Collections/modules/collections'

describe('routes/Collections - Reducer', () => {
  it('TREE_TOGGLE', () => {
    const prevState = reducer(undefined, {})
    const nextState = reducer(prevState, {
      type: TREE_TOGGLE,
      path: '/mlp/fa16/A'
    })
    //expect(nextState.dirs).to.not.equal(prevState.dirs)
    //expect(nextState.dirs[1]).to.not.equal(prevState.dirs[1])
    //expect(nextState.dirs[1].dirs).to.not.equal(prevState.dirs[1].dirs)
    //expect(nextState.dirs[1].dirs[0]).to.not.equal(prevState.dirs[1].dirs[0])
    //expect(nextState.dirs[1].dirs[0].dirs).to.not.equal(prevState.dirs[1].dirs[0].dirs)
    //expect(nextState.dirs[1].dirs[0].dirs[0]).to.not.equal(prevState.dirs[1].dirs[0].dirs[0])
    //expect(nextState.dirs[1].dirs[0].dirs[0].dirs).to.not.equal(prevState.dirs[1].dirs[0].dirs[0].dirs)
    //expect(nextState.dirs[1].dirs[0].dirs[0].dirs[0]).to.not.equal(prevState.dirs[1].dirs[0].dirs[0].dirs[0])
    //expect(nextState.dirs[1].dirs[0].dirs[0].dirs[0].name).to.equal(prevState.dirs[1].dirs[0].dirs[0].dirs[0].name)
    //expect(nextState.dirs[1].dirs[0].dirs[0].dirs[0].open).to.not.equal(prevState.dirs[1].dirs[0].dirs[0].dirs[0].open)
    //
    //expect(nextState.dirs[1].dirs[0].dirs[1].name).to.equal(prevState.dirs[1].dirs[0].dirs[1].name)
    //expect(nextState.dirs[1].dirs[0].dirs[1].dirs).to.equal(prevState.dirs[1].dirs[0].dirs[1].dirs)

    expect(nextState.dirs).to.not.equal(prevState.dirs)
    expect(nextState.dirs[1]).to.not.equal(prevState.dirs[1])
    expect(nextState.dirs[1].dirs).to.not.equal(prevState.dirs[1].dirs)
    expect(nextState.dirs[1].dirs[0]).to.not.equal(prevState.dirs[1].dirs[0])
    expect(nextState.dirs[1].dirs[0].dirs).to.not.equal(prevState.dirs[1].dirs[0].dirs)
    expect(nextState.dirs[1].dirs[0].dirs[0]).to.not.equal(prevState.dirs[1].dirs[0].dirs[0])

    expect(nextState.dirs[1].dirs[0].dirs[0].name).to.equal(prevState.dirs[1].dirs[0].dirs[0].name)
    expect(nextState.dirs[1].dirs[0].dirs[0].open).to.equal(prevState.dirs[1].dirs[0].dirs[0].open)
    expect(nextState.dirs[1].dirs[0].dirs).to.not.equal(prevState.dirs[1].dirs[0].dirs)
  })
})
