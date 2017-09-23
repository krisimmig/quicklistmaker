var ImageSearch = React.createClass({

    searchImages: function () {
        if(this.state.query === '') return;

        let searchquery = "/qwant.json?query=";
        searchquery = searchquery + this.state.query;

        $.ajax({
            url: searchquery,
            type: 'GET',
            dataType: 'json',
            contentType: 'application/json',
            success: function (data) {
                console.log('success: ', data.data.result.items);
                this.setState({
                    results: data.data.result.items
                });
            }.bind(this),
            always: () => {
                this.setState({
                    isOpen: false
                });
            }
        })
    },

    getInitialState: function () {
        return {
            query: 'cars',
            isOpen: false,
            results: []
        };
    },

    openCloseClickHandler: function (event) {
        event.preventDefault();
        console.log('openCloseClickHandler');
        this.setState({ isOpen: !this.state.isOpen })
    },

    getResults: function() {
        return this.state.results.map((image, index) => {
            return (
                <img src={image.thumbnail} key={index} onClick={this.imageClicked.bind(this, image)} />
            )
        })
    },

    imageClicked: function(image) {
        this.props.onImagePicked(image.thumbnail);
        this.setState({isOpen: false});
    },

    handleKeyUp: function(event) {
        event.preventDefault();
        console.log(event.target.value);

        this.setState({
            query: event.target.value
        });

        if(event.key == 'Enter') {
            this.searchImages();
        }
    },

    render: function () {
        var classes = classNames('Qwant', {
            'is-active': this.state.isOpen
        });

        let resultsList = this.getResults();

        return (
            <div>
                <div onClick={this.openCloseClickHandler}>Open search images</div>
                <div className={classes}>
                    <input
                        placeholder="Search..."
                        onKeyUp={ this.handleKeyUp }
                        />
                    <div onClick={this.searchImages}>Search</div>
                    <div onClick={this.openCloseClickHandler}>Close</div>
                    <div className="Qwant__results">
                        { resultsList }
                    </div>
                </div>
            </div>
        );
    }
});