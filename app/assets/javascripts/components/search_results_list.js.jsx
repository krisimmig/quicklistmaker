var SearchResultsList = React.createClass({
  render: function() {
    var listItems = this.props.listItems.map(function(item) {
      return <SearchResultItem data={ item } key={ App.makeId() } />;
    });
    return (
      <div className="SearchResultsList">
        <h4>SearchResultsList</h4>
        { listItems }
      </div>
    );
  }
});