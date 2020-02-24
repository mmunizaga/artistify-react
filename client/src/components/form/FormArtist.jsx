import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
// custom tools
import APIHandler from "../../api/APIHandler";

// import LabPreview from "../LabPreview";
// styles
import "./../../styles/form.css";


class FormArtist extends Component {

  state = {
    name:"",
    description:"",
    style: {},
    isBand: false,
    styles:[]
  }

  api = APIHandler

  componentDidMount() {
    this.api
      .get("/styles")
      .then(apiRes => this.setState({styles: apiRes.data.styles}))
      .catch(apiErr => console.error(apiErr));
  }

  handleInputs = (e) => {
    this.setState({[e.target.name]:e.target.value},
      () => console.log(this.state))
  }

  handleFormSubmit = (e) => {
    e.preventDefault();
    const {name,description,style,isBand} = this.state; 
    this.api
        .post('/artists',{name,description,style,isBand})
        .then(dbRes => console.log(dbRes))
        .catch(apiErr => console.error(apiErr));

    this.setState({
      name:"",
      description:"",
      style: "",
      isBand: false,
      styles:[]
    })
}


  render() {
    return (
      <>
        <h1 className="title diy">D.I.Y (FormArtist)</h1>
        <form
        id="newArtist"
        className="form"
        onSubmit={this.handleFormSubmit}
        onChange={this.handleInputs}
        >
          <label
            className="label"
            htmlFor="name">
            name
          </label>
          <input
            type="text"
            name="name"
            value={this.state.name}
            className="input"
          />

          <label
            className="label"
            htmlFor="description">
            description
          </label>
          <textarea
            name="description"
            value={this.state.description}
            className="textbox"
          />

          <label
            className="label"
            htmlFor="style">
            style
          </label>

          <select
          name="style"
          >
            <option value="">Please select a value.</option>
          {this.state.styles.map((s,i) => (
            <option key={i} value={s._id}>{s.name}</option>
          )
          )}
          </select>

          <label
            className="label"
            htmlFor="isBand">
            is band?
          </label>
          
          <div>
            <input
              type="radio"
              name="isBand"
              value={true}
            />
            <label
              className="label"
              htmlFor="isBand"
            >
              yes
            </label>
          </div>
          
          <div>
            <input
              type="radio"
              name="isBand"
              value={false}
              checked
            />
            <label
              className="label"
              htmlFor="isBand"
            >
              no
            </label>
          </div>

          <button className="btn">Ok</button>

        </form>
      </>
    );
  }
}

export default withRouter(FormArtist);
