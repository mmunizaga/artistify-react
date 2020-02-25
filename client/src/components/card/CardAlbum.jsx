import React from "react";
import { Link } from "react-router-dom";
// custom tools
import IconFav from "../icon/IconFavorite";
// styles
import "./../../styles/icon-color.css";

export default function CardAlbum({ data }) {
  return <div>
          <Link to={`albums/${data._id}`}>
            <h2 className='title '>{data.title}</h2>
            <img className ='cover' src={data.cover} alt=""/>
          </Link>
            <IconFav resourceType='albums' resourceId={data._id}/>
        </div>;
}
