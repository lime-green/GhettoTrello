/** @jsx React.DOM */

var Lane = React.createClass({
    getInitialState: function (){
        return {
            cards: []
        };
    },

    loadLane: function (){
        if (this.props.checkCards === "false") {
            return;
        }
        var ajax = $.get(this.props.url)
            .then(function (data) {
                this.setState({cards: data.cards});
            }.bind(this), function(xhr, status, err) {
                console.log(xhr, status, err.toString());
            }.bind(this));
    },

    handleControl: function(cardID){
        var cards = this.state.cards,
            newcards = _.without(cards, _.find(cards, function(card){return card.id == cardID;}));
        this.setState({cards: newcards});

        var url = this.props.url + '/cards/' + cardID;
        var ajax = $.ajax({ url: url, type: 'DELETE' })
        .then(function () {
            this.loadLane();
        }.bind(this), function(xhr, status, err) {
            console.log(xhr, status, err.toString());
        });
    },

    handleAddCard: function(content) {
        var cards = this.state.cards,
            newcards = cards.concat([{id: "null", content: content}]);
        this.setState({cards: newcards}); // such optimism! much speed! so fast!

        var url = this.props.url + '/cards',
            ajax = $.ajax({ url: url, type: 'POST', data: {"card[content]": content} })
        .then(function () {
            this.loadLane();
        }.bind(this), function (xhr) {
            var errors = $.parseJSON(xhr.responseText).errors;
            this.loadLane();
            this.refs.flash.addFlash("danger", errors, 2500);
        }.bind(this));
    },

    handleContentEdit: function(cardID, content) {
        var url = this.props.url + '/cards/' + cardID;
        var ajax = $.ajax({ url: url, type: 'PATCH', data: {"card[content]": content} })
        .then(function () {
            this.loadLane();
        }.bind(this), function (xhr) {
            var errors = $.parseJSON(xhr.responseText).errors;
            this.refs.flash.addFlash("danger", errors, 2500);
        }.bind(this));
    },

    componentDidMount: function (){
        this.loadLane();
    },

    laneRemovalHandler: function (){
        this.props.laneRemovalHandler(this.props.lane_id);
    },

    render: function () {
        return (
            <div className="lane">
                <div className="eleHead">
                    <span onClick={this.laneRemovalHandler} className="lane-close glyphicon glyphicon-remove"></span>
                    <h1>{this.props.name}</h1>
                </div>
                <div className="eleBody">
                    <CardAdder handleAddCard={this.handleAddCard} />
                    <FlashMessages ref="flash"/>
                    <TodoList handleContentEdit={this.handleContentEdit} data={this.state.cards} handleControl={this.handleControl} />
                </div>
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

    handleAddLane: function (name){
        var lanes = this.state.lanes,
            newlanes = lanes.concat([{id: "null", name: name}]);
        this.setState({lanes: newlanes}); // such optimism! much speed! so fast!

        var ajax = $.post(this.props.url, {"lane[name]": name})
            .then(function () {
                this.loadLanes();
            }.bind(this), function(xhr, status, err) {
                var errors = $.parseJSON(xhr.responseText).errors;
                this.loadLanes();
                this.refs.flash.addFlash("danger", errors, 2500);
                this.refs.flash.getDOMNode().focus(); // scroll down
            }.bind(this));
    },

    componentDidMount: function (){
        this.loadLanes();
    },

    laneRemovalHandler: function (laneID){
        var lanes = this.state.lanes,
            newlanes = _.without(lanes, _.find(lanes, function(lane){return lane.id == laneID;}));
        this.setState({lanes: newlanes}); // optimism! speed! fast!

        var url = this.props.url + '/' + laneID,
            ajax = $.ajax({ url: url, type: 'DELETE' })
        .then(function () {
            this.loadLanes();
        }.bind(this), function(xhr, status, err) {
            console.log(xhr, status, err.toString());
        });
    },

    render: function () {
        var elements = this.state.lanes.map(function (lane) {
            var url=this.props.url + "/" + lane.id
            var checkCards = lane.id === "null" ? "false" : "true";
            return (
                <Lane laneRemovalHandler={this.laneRemovalHandler} name={lane.name} key={lane.id} lane_id={lane.id} url={url} checkCards={checkCards}>
                </Lane>
            );
        }.bind(this));

        return (
            <div className="boardWrap">
                <div className="board">
                    {elements}
                    <GhostLane handleAddLane={this.handleAddLane} />
                </div>
                <div className="boardFlash">
                    <FlashMessages ref="flash"/>
                </div>
            </div>
        );
    }
});
