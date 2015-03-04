var FlashMessages = React.createClass({
    getInitialState: function (){
        return { flashes: [] };
    },

    addFlash: function (alertType, content, timeout){
        var flashes = this.state.flashes,
            flash = {alertType: alertType, content: content};
        timeout = timeout || 2000;

        flashes.push(flash);
        this.setState({flashes: flashes});

        setTimeout(function () {
            var flashes = this.state.flashes;
            flashes = _.without(flashes, flash);
            this.setState({flashes: flashes});
        }.bind(this), timeout);
    },

    render: function (){
        return (
            <div className="flashMessages">
                {this.state.flashes.map(function(message, index) {
                    return (
                        <div key={index} className={this.getClass(message.alertType)}>
                            <ul>
                            {message.content.map(function(item, index) {
                                return (
                                    <li key={index}> {item} </li>
                                );
                            })}
                            </ul>
                        </div>
                    );
                }.bind(this))}
            </div>
        );
    },

    getClass: function (type) {
        return "alert alert-" + type;
    }
});

