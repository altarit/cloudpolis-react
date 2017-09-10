import React, {PropTypes} from 'react'

import './AccessLog.scss'

export class AccessLog extends React.Component {
  static propTypes = {
    // userName: PropTypes.string,
    requests: PropTypes.arrayOf(PropTypes.object).isRequired,

    getAccessLog: PropTypes.func.isRequired
  }

  componentDidMount() {
    this.props.getAccessLog()
  }

  render() {
    return (
      <div className='container'>
        <h2>Access Log</h2>
        <div className='admin-access'>
          <div className='form-head'>
            <div className='onerow'>
              <div className='form-filter-method left'>
                <select name='filter-method' className='form-control'>
                  <option />
                  <option>GET</option>
                  <option>POST</option>
                  <option>PUT</option>
                  <option>DELETE</option>
                </select>
              </div>
              <div className='form-filter-url'>
                <input type='text' name='filter-url' className='form-control' placeholder='url' />
              </div>
              <div className='form-filter-user'>
                <input type='text' name='filter-user' className='form-control' placeholder='username' />
              </div>
              <div className='form-filter-session'>
                <input type='text' name='filter-session' className='form-control' placeholder='session' />
              </div>
              <div className='form-filter-ip'>
                <input type='text' name='filter-ip' className='form-control' placeholder='ip' />
              </div>
              <div className='form-filter-time'>
                <input type='text' name='filter-time' className='form-control' placeholder='date' />
              </div>
              <div className='clear_left' />
            </div>
          </div>
          <div className='form-body' id='access'>
            {this.props.requests.map(request => (
              <div className='onerow' key={request.created}>
                <div>GET</div>
                <div><a href={request.url}>{request.url}</a></div>
                <div>{request.user} </div>
                <div>{request.session} </div>
                <div>{request.ip} </div>
                <div>{request.created} </div>
                <div className='clear_left' />
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
}

export default AccessLog
