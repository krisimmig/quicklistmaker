var ListItem = React.createClass({
  mixins: [FluxMixin],

  titleChange: function(event) {
    this.state.hasChanged = true;
    this.setState({ title: event.target.value });
  },

  descriptionChange: function(event) {
    this.state.hasChanged = true;
    this.setState({ description: event.target.value });
  },

  saveData: function() {
    var itemData = this.props.data;
    var newItemData = $.extend({}, itemData);
    newItemData.title = this.state.title;
    newItemData.description = this.state.description;
    console.log('saveData() itemData: ', itemData.title);
    this.getFlux().actions.updateItem(itemData, newItemData);
    this.state.hasChanged = false;
  },

  deleteEntry: function() {
    this.getFlux().actions.deleteItem(this.props.data.id);
  },

  getInitialState: function() {
    return {
      title: this.props.data.title,
      description: this.props.data.description,
      item: this.props.data,
      hasChanged: false,
    };
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({
      title: nextProps.data.title,
      description: nextProps.data.description,
    });
  },

  render: function() {
    $('.js-elastic').elastic();
    var classes = classNames({
      'c-listItem': true,
      'is-saving': this.props.data.isSaving,
    });
    var saveButton = this.state.hasChanged ? <button className="c-button" onClick={ this.saveData }>Save</button> : '';
    return (
      <li className={ classes } data-id={ this.state.item.id }>
        <textarea
          rows="1"
          className="c-listItem__textarea c-listItem__textarea--h3 js-elastic"
          defaultValue={ this.props.data.title }
          value={ this.state.title }
          onChange={ this.titleChange }
        />
        <a href={ this.props.data.link } className="c-listItem__link">
          <img src={ this.props.data.image_url } className="c-listItem__link" />
        </a>
        <textarea
          rows="1"
          className="c-listItem__textarea js-elastic"
          defaultValue={ this.props.data.description }
          value={ this.state.description }
          onChange={ this.descriptionChange }
        />
        <button className="c-button" onClick={ this.deleteEntry }>Delete</button>
        { saveButton }
      </li>
    );
  }
});
