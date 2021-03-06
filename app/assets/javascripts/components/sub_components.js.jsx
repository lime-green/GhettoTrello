var TodoList = React.createClass({
    render: function() {
        var elements = this.props.data.map(function (element) {
            return (
                <li key={element.id}>
                    <TodoElement handleContentEdit={this.props.handleContentEdit} cardID={element.id} key={element.id} content={element.content} handleControl={this.props.handleControl}>
                    </TodoElement>
                </li>
            );
        }.bind(this));

        return (
            <ul className="todoList">
                {elements}
            </ul>
        );
    }
});

var TodoElement = React.createClass({
    handleContentEdit: function (event) {
        if (event.which == 13 || event.keyCode == 13) {
            this.props.handleContentEdit(this.props.cardID, event.target.value);
            this.refs.contentBox.getDOMNode().blur();
        }
    },

    render: function () {
        return (
            <div className="todoElement">
                <input ref="contentBox" type="text" onKeyUp={this.handleContentEdit} className="content" defaultValue={this.props.content} />
                <ElementControl cardID={this.props.cardID} handleControl={this.props.handleControl} />
            </div>
        );
    }
});

var ElementControl = React.createClass({
    handleClick: function() {
        this.props.handleControl(this.props.cardID);
    },

    render: function() {
        return (
            <span className="glyphicon glyphicon-remove" onClick={this.handleClick}></span>
        );
    }
});

var CardForm = React.createClass({
    componentDidMount: function () {
        this.refs.input.getDOMNode().focus();
    },

    handleKeyUp: function(event) {
        if (event.which == 13 || event.keyCode == 13) {
            this.props.submitHandler(this.refs.input.getDOMNode().value);
            this.refs.input.getDOMNode().value = "";
        }
    },

    render: function () {
        return (
            <div className="cardForm">
                <input onKeyUp={this.handleKeyUp} name="cardContent" ref="input" type="text" placeholder="Enter to-do element" />
            </div>
        );
    }
});

var CardAdder = React.createClass({
    handleAddCard: function (){
        this.props.handleAddCard();
    },

    submitHandler: function (content){
        this.props.handleAddCard(content);
    },

    render: function () {
        return (
            <CardForm submitHandler={this.submitHandler}/>
        );
    }
});
