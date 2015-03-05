var GhostForm = React.createClass({
    componentDidMount: function (){
        this.refs.input.getDOMNode().focus();
    },

    handleOnKeyUp: function (event){
        if (event.which == 13 || event.keyCode == 13) {
            this.props.handleOnKeyUp(event.target.value);
        }
    },

    render: function (){
        return (
            <input ref="input" type="text" onKeyUp={this.handleOnKeyUp} placeholder="Enter a name for your lane" />
        );
    }
});

var GhostLane = React.createClass({
    getInitialState: function (){
        return {
            element:
                <span onClick={this.handleOnClick} className="glyphicon glyphicon-plus" />
        };
    },

    handleOnKeyUp: function (name){
        this.setToPlus();
        this.props.handleAddLane(name);
    },

    handleOnClick: function (){
        this.setToInput();
    },

    setToInput: function (){
        this.setState({
            element:
                <GhostForm handleOnKeyUp={this.handleOnKeyUp} />
        });
    },

    setToPlus: function (){
        this.setState(this.getInitialState());
    },

    render: function (){
        return (
            <div id="disabled">
                <LaneWrap>
                    {this.state.element}
                </LaneWrap>
            </div>
        );
    }
});
