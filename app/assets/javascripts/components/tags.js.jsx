var Tags = React.createClass({
  mixins: [FluxMixin],

  emptyCopy: function() {
    if(this.props.tags.length === 0) {
      return "No tags yet, add existing or create new ones...";
    }
  },

  renderTags: function() {
    return (
      <ul className="Tags--list">
        { this.props.tags.map(function(tag) {
          return (
            <Tag
              data={ tag }
              tagClickHandler={ this.handleTagRemoveClicked }
              key={ tag.id }
              type='remove'
            />
          );
        }.bind(this))
      }
      </ul>
    );
  },

  handleTagRemoveClicked: function(event, data) {
    this.getFlux().actions.list.removeTag({
      listId: this.props.listId,
      tagToRemove: data.name
    });
  },

  render: function() {
    return (
      <div className="Tags u-bg-blue-xlight u-p-3">
        <h2>Tags</h2>
        <p className='u-t-muted'>
          { this.emptyCopy() }
        </p>
        { this.renderTags() }
        <TagSearchController listId={ this.props.listId } />
      </div>
    );
  }
});
