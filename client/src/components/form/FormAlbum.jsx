import React, { Component } from "react";
import { withRouter } from "react-router-dom";
// custom tools
// import CustomInputFile from "./../icon/IconAvatarAdmin";
import LabPreview from "../LabPreview";
// styles
import "./../../styles/form.css";
import "./../../styles/icon-avatar.css";

// import React from 'react'

// export default function FormAlbum({
//   mode = "create",
//   _id,
//   history,
//   match
// }) {
//   const [
//     { title, artist, label, release_date, cover, description},
//     setState
//   ] = useState({
//     title: "",
//     artist: "",
//     label: "",
//     releaseDate: "",
//     cover: "",
//     description: "",
//   });
//   return (
//     <div>
      
//     </div>
//   )
// }


class FormAlbum extends Component {
  render() {
    return (
      <>
        <h1 className="title diy">D.I.Y (FormAlbum)</h1>
        <p>Code a form to Create/Update albums.</p>
        <LabPreview name="albumForm" isSmall />
      </>
    );
  }
}

export default FormAlbum
