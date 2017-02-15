export function handleResponse(response) {
  return new Promise((resolve, reject) => {
    // console.log('handle response')
    // console.dir(response)
    return response.json()
      .then(json => {
        resolve({
          status: response.status,
          ok: response.ok,
          json
        })
      })
      .catch(err => {
        if (!response.ok) {
          console.error(`Failed request: ${response.status} - ${response.statusText}`)
          console.dir(err)
          reject({
            status: response.status,
            message: response.message || response.statusText
          })
        } else {
          console.error(`Unhandled error`)
          console.dir(err)
          reject(err)
        }
      })
  }).then((parsedResponse) => {
    return new Promise((resolve, reject) => {
      if (parsedResponse.ok) { resolve(parsedResponse.json) } else {
        console.warn(`Response status is not ok: ${parsedResponse.status}`)
        reject(parsedResponse.json)
      }
    })
  })
}
