var SearchBox = React.createClass({
  componentDidMount: function() {
    var _this = this;
    var keyups = Rx.Observable.fromEvent(this.refs.searchQueryInput, 'keyup')
      .pluck('target', 'value')
      .filter(function (text) {
        return text.length > 2;
      })
      .debounce(300)
      .distinctUntilChanged()
      .subscribe(
        function (data) {
          _this.props.onSendQuery();
        }
      );
  },

  handleKeyUp: function(event) {
    if(event.key == 'Enter') {
      this.props.onSendQuery();
    }
  },

  handleChange: function() {
      this.props.onUserInput(
          this.refs.searchQueryInput.value
      );
  },

  render: function() {
    return (
      <div className="SearchBox">
        <h3>AmazonSearch</h3>
        <input
          placeholder="Search..."
          ref="searchQueryInput"
          value={ this.props.searchQuery }
          onChange={ this.handleChange }
          onKeyUp={ this.handleKeyUp }
        />
      </div>
    );
  }
});