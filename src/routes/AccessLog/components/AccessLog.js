import React from 'react'
import PropTypes from 'prop-types'

import './AccessLog.scss'
import Input from '../../../components/Input'
import AccessFilterForm from './AccessFilterForm'
import {changePage} from "../modules/accessLog"

export class AccessLog extends React.Component {
  static propTypes = {
    // userName: PropTypes.string,
    requests: PropTypes.arrayOf(PropTypes.object).isRequired,
    filters: PropTypes.object.isRequired,
    limit: PropTypes.number.isRequired,
    page: PropTypes.number.isRequired,

    getAccessLog: PropTypes.func.isRequired,
    changeLimit: PropTypes.func.isRequired,
    pageChange: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.getAccessLog({}, 50)
  }

  componentWillReceiveProps(nextProps) {
    console.log(`componentWillReceiveProps`)
    if (this.props.filters && (!nextProps.filters || this.props.filters === nextProps.filters ||
      this.props.filters.values === nextProps.filters.values)) return
    console.log(nextProps.filters.values)


    //this.props.getAccessLog(nextProps.filters.values || {}, 50)
  }


  changeFilter = (newValue) => {
    console.log(`changeFilter`)
    console.log(newValue.values)

    this.props.getAccessLog(this.props.filters.values || {}, this.props.limit, this.props.page)
    newValue.preventDefault()
  }

  limitChange = (newLimit) => {
    this.props.changeLimit(newLimit)
    this.props.getAccessLog(this.props.filters.values || {}, newLimit, this.props.page)
  }

  pageChange = (newPage) => {
    this.props.changePage(newPage)
    this.props.getAccessLog(this.props.filters.values || {}, this.props.limit, newPage)
  }

  render() {
    return (
      <div className='access container'>
        <h2>Access Log</h2>
        <div className='access__top btn-toolbar'>
          <AccessFilterForm handleSubmit={this.changeFilter}/>
        </div>
        <div className='access__table'>
          {this.props.requests.map((request, i) => (
            <div className='access-record' key={i}>
              <div className='access-record__url'>GET
                <a href={request.path + '?' + request.query}>{request.path} {request.query}</a>
              </div>
              <div className='access-record__user'>{request.user} </div>
              <div className='access-record__ip'>{request.ip} </div>
              <div className='access-record__created'>{request.created} </div>
              <div className='access-record__clear-left'/>
            </div>
          ))}
        </div>
        <div>
          <div className='btn-group card-body'>
            <button className='btn btn-primary' type='button'>
              Filters
            </button>
            <Input onChange={this.pageChange} defaultValue={this.props.page}/>
            <button className='btn btn-primary' type='button'>
              Refresh
            </button>
            <Input onChange={this.limitChange} defaultValue={this.props.limit}/>
          </div>
        </div>
      </div>
    )
  }
}

export default AccessLog
