import React from 'react'

class AdminView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      newId: "",
      newItemName: "",
      newItemManufucturer: "",
      newItemPrice: "",
      newItemQuantity: "",
    }
  }

  addNewItem = () => {
    this.props.addNewItem(this.state.newItemName, this.state.newItemManufucturer, this.state.newItemPrice, this.state.newItemQuantity);
  }

  updateItem = () => {
    this.props.updateItem(this.state.newId, this.state.newItemName, this.state.newItemManufucturer, this.state.newItemPrice, this.state.newItemQuantity);
  }

  render() {
    return (
      <div>
        <div>
            Add new item
            <div>
              Name <input type="text" onChange={ (event) => this.setState({ newItemName: event.target.value }) } />
            </div>
            <div>
              Manufucturer <input type="text" onChange={ (event) => this.setState({ newItemManufucturer: event.target.value }) } />
            </div>
            <div>
              Price <input type="text" onChange={ (event) => this.setState({ newItemPrice: event.target.value }) } />
            </div>
            <div>
              qty <input type="text" onChange ={ (event) => this.setState({ newItemQuantity: event.target.value}) } />
            </div>
            <button onClick={ this.addNewItem }>Add Item</button><button onClick={ this.updateItem }>Päivitä</button>

          </div>
          <button onClick={ this.props.disableAdminMode }>Disable Admin Mode</button>
      </div>
    )
  }
}

export default AdminView;
