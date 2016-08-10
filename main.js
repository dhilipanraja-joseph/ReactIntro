
// $(()=>{
//
//   $('span').on('click','.remove',)
// });


const Title = React.createClass({
  render: function() {
    return (
      <div>
        <h1>Welcome to React</h1>
      </div>
    );
  }
});

// const Counter = React.createClass({
//   render: function() {
//     let {counter, addCount, minusCount} = this.props;
//
//     return (
//       <div>
//         <h3>Counter: {counter}</h3>
//         <button onClick={addCount}>+</button>
//         <button onClick={minusCount}>-</button>
//       </div>
//     )
//   }
// });

const NewMessageForm = React.createClass({
  getInitialState: function() {
    return {
      text: ''
    }
  },
  addMessage: function() {
    this.props.addMessage(this.state.text);
    this.setState({text: ''});
  },
  render: function() {
    return (
      <div>
        <input type="text"
               value={this.state.text}
               onChange={ e => this.setState({text: e.target.value}) }
         />
        <button onClick={this.addMessage}>Add</button>
      </div>
    );
  }
});

// var handleClick = function(props) {
//   console.log('You clicked: ' + props);
// }

const MessageList = React.createClass({
  delete : function(event){
    //var toDel = event.target.value;
    //console.log(toDel);
    this.props.deleteMsg(event.target.value);
    //console.log(this.state.messages);
  },
  modify : function(event){
    this.props.modifyMsg(event.target.value);
  },
  render: function() {
    let messages = this.props.messages.map(message => {
      return (
        <li key={message.id}>
          {message.text}
          <button onClick={this.delete} value={message.id}>-</button>
          <button onClick={this.modify} value={message.id}>?</button>
        </li>

      )
    });
    return (
      <ul>
        {messages}
      </ul>
    )
  }
})

const MessageBoard = React.createClass({
  getInitialState: function() {
    return {
      messages: []
    };
  },
  addMessage: function(text) {
    let message = {
      text,
      id: uuid()
    };
    this.setState({
      messages: this.state.messages.concat(message)
    })
  },
  deleteMsg: function(id){
    // console.log(id);
    var arr = this.state.messages;
    // var index = arr.findIndex(x => x.id ===id);
    // arr.splice(index,1);
    // console.log(this.state.messages);
    var arr = this.state.messages.filter(msg => msg.id !== id);
    //  if('id' in msg == id){
    //     return ;
    //   }else{
    //     return false;
    //   }
    // });
    // console.log(arr);
    this.setState({
      messages : arr
    })
  },
  modifyMsg : function(id){
    // console.log(id);
    var newMsg = prompt("New Msg");
    var arr = this.state.messages;
    var index = arr.findIndex(x => x.id ===id);
    arr[index].text=newMsg;
    this.setState({
      messages : arr
    })
  },
  render: function() {
    return (
      <div>
        <h1>MessageBoard</h1>
        <NewMessageForm addMessage={this.addMessage}/>
        <MessageList messages={this.state.messages} modifyMsg={this.modifyMsg} deleteMsg={this.deleteMsg}/>
      </div>
    )
  }
})

// const Root = React.createClass({  // create a new component
//   // getInitialState: function() {
//   //   return {
//   //     counter: 0
//   //   }
//   // },
//   // addCount: function() {
//   //   this.setState({counter: this.state.counter + 1});
//   // },
//   // minusCount: function() {
//   //   this.setState({counter: this.state.counter - 1});
//   // },
//   // render: function() {
//   //   let counterProps = {
//   //     addCount: this.addCount,
//   //     minusCount: this.minusCount,
//   //     counter: this.state.counter
//   //   };
//
//     return (
//       <div>
//         <MessageBoard/>
//       </div>
//     );
//   }
// });

ReactDOM.render(
  <MessageBoard/>,
  document.getElementById('root')
);
