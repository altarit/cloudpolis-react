import {fetchGet} from '../../../modules/apiUtils'

export const GET_COLLECTIONS_REQUEST = 'GET_COLLECTIONS_REQUEST'
export const GET_COLLECTIONS_SUCCESS = 'GET_COLLECTIONS_SUCCESS'
export const GET_COLLECTIONS_FAILURE = 'GET_COLLECTIONS_FAILURE'

export const TREE_TOGGLE = 'TREE_TOGGLE'

export function getCollections(path = '/') {
  return (dispatch) => {
    dispatch({
      type: GET_COLLECTIONS_REQUEST
    })

    fetchGet('/music/collections/?path=' + encodeURIComponent(path))
      .then(response => {
        dispatch({
          type: GET_COLLECTIONS_SUCCESS,
          nodes: response.dirs,
          tracks: response.tracks,
          path: path
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
  dirs: []
  /*dirs: [{
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
  }]*/
}

// function oldGetToggledTree(rootDirs, pathStr) {
//   let pathDirs = pathStr.split('/')
//   pathDirs.shift()
//   //console.log(pathStr)
//   console.log(`dirs: ${pathDirs.join('/')}`)
//   let nextRoot = {
//     dirs: rootDirs
//   }
//   let node = nextRoot
//   //let prevNode = null
//   while (pathDirs.length > 0 && node && node.dirs) {
//     let dirName = pathDirs.shift()
//     console.log(`dirName: ${dirName}  dirs: ${node.dirs.length}`)
//     //prevNode = node
//     let foundDirIndex = node.dirs.findIndex(dir => dir.name === dirName)
//     console.log(`found at ${foundDirIndex}`)
//
//     if (foundDirIndex == -1) {
//       throw new Error('Incorrect arguments or the tree')
//     }
//     node.dirs = [...node.dirs]
//     let foundDir = node.dirs[foundDirIndex]
//     let nextFoundDir = {...foundDir}
//     node.dirs[foundDirIndex] = nextFoundDir
//     node = nextFoundDir
//   }
//   node.open = !node.open
//   console.log('left ' + pathDirs.join('/'))
//   console.log('res ' + node.name)
//   console.log(nextRoot.dirs)
//   return nextRoot.dirs
// }

function copyTree(rootDirs, pathStr) {
  let pathDirs = pathStr.split('/')
  pathDirs.shift()
  //console.log(pathStr)
  console.log(`dirs(${pathDirs.length}) ${pathDirs.join('/')}`)
  let nextRoot = {
    dirs: rootDirs
  }
  let node = nextRoot


  while (pathDirs.length > 0 && node && node.dirs) {
    let dirName = pathDirs.shift()
    if (dirName == '') continue
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
  //node.open = !node.open
  console.log('left ' + pathDirs.join('/'))
  console.log('res ' + node.name)
  console.log(nextRoot.dirs)
  return {
    dirs: nextRoot.dirs,
    node: node
  }
}

function getToggledTree(rootDirs, pathStr) {
  let newTreeInfo = copyTree(rootDirs, pathStr)
  newTreeInfo.node.open = !newTreeInfo.node.open
  console.log(newTreeInfo.node)
  return newTreeInfo.dirs
}

function updateTree(rootDirs, pathStr, nodes, tracks) {
  console.log('pathStr=' + pathStr)
  let newDirs = nodes.map(el => new Object({name: el.name, dirs: null}))
  console.log(newDirs)
  let newTreeInfo = copyTree(rootDirs, pathStr)
  console.log(newTreeInfo.node.dirs)
  //newTreeInfo.node.dirs.push({qwe: 1})
  console.log(newTreeInfo.node)
  if (pathStr == '/') {
    newTreeInfo.dirs = newDirs
  } else {
    newTreeInfo.node.dirs = newDirs
    newTreeInfo.node.tracks = tracks
  }

  return newTreeInfo.dirs
}

export default function collectionsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_COLLECTIONS_REQUEST:
      return {...state, fetching: true}
    case GET_COLLECTIONS_SUCCESS:
      return {...state, fetching: false, dirs: updateTree(state.dirs, action.path, action.nodes, action.tracks)}
    case GET_COLLECTIONS_FAILURE:
      return {...state, fetching: false}
    case TREE_TOGGLE:
      return {...state, dirs: getToggledTree(state.dirs, action.path)}
  }
  return state
}
