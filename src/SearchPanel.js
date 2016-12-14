import React, {Component} from 'react'

class SearchPanel extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searhStr: ''
    };
  }

  onChangeHandler = (e) => {
    this.setState({
      searhStr: e.target.value
    });
  }

  render () {
    return (
      <div>
        <input type="text" value={this.state.searhStr} onClick={this.onChangeHandler} />
        <button onClick={this.props.onSearch}>Searh</button>
        <button onClick={this.props.onZoomIn}>ZoomIn</button>
        <button onClick={this.props.onZoomOut}>ZoomOut</button>
      </div>
    )
  }
}

export default SearchPanel;
