import {fetchGet} from '../../../modules/apiUtils'

export const GET_COLLECTIONS_REQUEST = 'GET_COLLECTIONS_REQUEST'
export const GET_COLLECTIONS_SUCCESS = 'GET_COLLECTIONS_SUCCESS'
export const GET_COLLECTIONS_FAILURE = 'GET_COLLECTIONS_FAILURE'

export const TREE_TOGGLE = 'TREE_TOGGLE'

export function getCollections() {
  return (dispatch) => {
    dispatch({
      type: GET_COLLECTIONS_REQUEST
    })

    fetchGet('/music/collections/')
      .then(response => {
        dispatch({
          type: GET_COLLECTIONS_SUCCESS,
          users: response.data
        })
      })
  }
}

export function toggleTree(path) {
  return {
    type: TREE_TOGGLE,
    path
  }
}

const initialState = {
  dirs: [{
    name: 'Dm',
    open: true
  }, {
    name: 'mlp',
    open: false,
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

function getToggledTree(rootDirs, pathStr) {
  let pathDirs = pathStr.split('/')
  pathDirs.shift()
  //console.log(pathStr)
  console.log(`dirs: ${pathDirs.join('/')}`)
  let nextRoot = {
    dirs: rootDirs
  }
  let node = nextRoot
  //let prevNode = null
  while (pathDirs.length > 0 && node && node.dirs) {
    let dirName = pathDirs.shift()
    console.log(`dirName: ${dirName}  dirs: ${node.dirs.length}`)
    //prevNode = node
    let foundDirIndex = node.dirs.findIndex(dir => dir.name === dirName)
    console.log(`found at ${foundDirIndex}`)

    if (foundDirIndex == -1) {
      throw new Error('Incorrect arguments or the tree')
    }
    node.dirs = [...node.dirs]
    let foundDir = node.dirs[foundDirIndex]
    let nextFoundDir = {...foundDir}
    node.dirs[foundDirIndex] = nextFoundDir
    node = nextFoundDir
  }
  node.open = !node.open
  console.log('left ' + pathDirs.join('/'))
  console.log('res ' + node.name)
  console.log(nextRoot.dirs)
  return nextRoot.dirs
}

export default function collectionsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_COLLECTIONS_REQUEST:
      return {...state, fetching: true}
    case GET_COLLECTIONS_SUCCESS:
      return {...state, fetching: false, collections: action.collections}
    case GET_COLLECTIONS_FAILURE:
      return {...state, fetching: false}
    case TREE_TOGGLE:
      return {...state, dirs: getToggledTree(state.dirs, action.path)}
  }
  return state
}
