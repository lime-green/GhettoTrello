/** @jsx React.DOM */

var Lane = React.createClass({
    getInitialState: function (){
        return {
            cards: []
        };
    },

    loadLane: function (){
        var ajax = $.get(this.props.url)
            .then(function (data) {
                this.setState({cards: data.cards});
            }.bind(this), function(xhr, status, err) {
                console.log(xhr, status, err.toString());
            }.bind(this));
    },

    handleControl: function(cardID){
        var url = this.props.url + '/cards/' + cardID;
        var ajax = $.ajax({ url: url, type: 'DELETE' })
        .then(function () {
            this.loadLane();
        }.bind(this), function(xhr, status, err) {
            console.log(xhr, status, err.toString());
        });
    },

    handleAddCard: function(content) {
        var url = this.props.url + '/cards';
        var ajax = $.ajax({ url: url, type: 'POST', data: {"card[content]": content} })
        .then(function () {
            this.loadLane();
        }.bind(this), function (xhr) {
            var errors = $.parseJSON(xhr.responseText).errors;
            this.refs.flash.addFlash("danger", errors, 1500);
        }.bind(this));
    },

    handleContentEdit: function(cardID, content) {
        var url = this.props.url + '/cards/' + cardID;
        var ajax = $.ajax({ url: url, type: 'PATCH', data: {"card[content]": content} })
        .then(function () {
            this.loadLane();
        }.bind(this), function (xhr) {
            var errors = $.parseJSON(xhr.responseText).errors;
            this.refs.flash.addFlash("danger", errors);
        }.bind(this));
    },

    componentDidMount: function (){
        this.loadLane();
    },

    render: function () {
        return (
            <div className="lane col-md-4">
                <h1>{this.props.name}</h1>
                <CardAdder handleAddCard={this.handleAddCard} />
                <TodoList handleContentEdit={this.handleContentEdit} data={this.state.cards} handleControl={this.handleControl} />
                <FlashMessages ref="flash"/>
            </div>
        );
    }
});

var Board = React.createClass({
    getInitialState: function (){
        return {
            lanes: []
        };
    },

    loadLanes: function (){
        var ajax = $.get(this.props.url)
            .then(function (data) {
                this.setState({lanes: data.lanes});
            }.bind(this), function(xhr, status, err) {
                console.log(xhr, status, err.toString());
            }.bind(this));
    },

    componentDidMount: function (){
        this.loadLanes();
    },

    render: function () {
        var elements = this.state.lanes.map(function (lane) {
            var url=this.props.url + "/" + lane.id
            return (
                <Lane name={lane.name} key={lane.id} url={url}>
                </Lane>
            );
        }.bind(this));

        return (
            <div className="board">
                {elements}
            </div>
        );
    }
});
