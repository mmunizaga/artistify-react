import React from "react";
import { Link } from "react-router-dom";
// custom tools
import IconFav from "../icon/IconFavorite";
// styles
import "./../../styles/icon-color.css";

export default function CardArtist({ data }) {
  return <div>
    <Link to={`/artists/${data._id}`} className="link">
      <div className="icon-color color" style={{backgroundColor:data.style.color}}></div>
      <div className="title" >{data.name}</div>
      <IconFav />
    </Link>
  </div>;
}
