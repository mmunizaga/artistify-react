import React, { useState, useEffect } from "react";
import moment from "moment"
// custom tools
// import CustomInputFile from "./../icon/IconAvatarAdmin";
import LabPreview from "../LabPreview";
// styles
import "./../../styles/form.css";
import "./../../styles/icon-avatar.css";
import APIHandler from "../../api/APIHandler";
import { withRouter } from "react-router-dom";

const api = APIHandler;
var coverInput;


function convertDate(str) {
  return moment(str, moment.ISO_8601).format("YYYY-MM-DD")
}

function FormAlbum({ mode = "create", _id, history, match }) {
  const [
    { title, artist, label, releaseDate, cover, coverPreviewURL, description },
    setState
  ] = useState({
    title: "",
    artist: "",
    label: "",
    releaseDate: "",
    cover: {},
    coverPreviewURL: "",
    description: ""
  });
  const [artists, setArtists] = useState([]);
  const [labels, setLabels] = useState([]);
  const [album, setAlbum] = useState({});
  // const _id = match.params._id

  const setRef = (() => {
    coverInput = React.createRef();
  })();

  const simulateInputClick = () => {
    coverInput.current.click();
  };

  const handleCover = e => {
    let reader = new FileReader();
    const file = e.target.files[0];
    reader.onloadend = () => {
      setState({
        title,
        artist,
        label,
        releaseDate,
        cover: file,
        coverPreviewURL: reader.result,
        description
      });
    };
    reader.readAsDataURL(file);
  };

  const handleChange = e => {
    e.persist();
    if (e.target.name === cover) return;
    setState(prevValues => ({
      ...prevValues,
      [e.target.name]: e.target.value
    }));
    console.log({ title, artist, label, releaseDate, cover });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("title", title);
    fd.append("artist", artist);
    fd.append("label", label);
    fd.append("releaseDate", releaseDate);
    fd.append("cover", cover);
    fd.append("description", description);

    try {
      if (mode === "create") await APIHandler.post("/albums", fd);
      else await APIHandler.patch(`/albums/${match.params._id}`, fd);
      console.log("here", history);
      history.push("/admin/albums");
      // here, we access history as a destructured props (see the parameters of this component)
      // history is accessible since we wrapped the component in the withRouter function
    } catch (apiErr) {
      console.error(apiErr);
    }
  };

  useEffect(() => {
    api
      .get("/artists")
      .then(apiRes => {
        setArtists(apiRes.data.artists);
      })
      .catch(apiErr => console.log(apiErr));
  }, []);

  useEffect(() => {
    api
      .get("/labels")
      .then(apiRes => {
        setLabels(apiRes.data.labels);
      })
      .catch(apiErr => console.log(apiErr));
  }, []);

  useEffect(() => {
    const initFormData = () => {
        console.log('héhooo call')
        api.get(`/albums/${_id}`)
        .then(apiRes => setAlbum(apiRes.data))
        // delete apiRes.data._id;
      };
      if (mode === "edit") initFormData();
  }, [mode, _id])

  
  

  return (
    album ? <div>
      <form className="form" onSubmit={handleSubmit} onChange={handleChange}>
        <label className="label" htmlFor="title">
          Title
        </label>
        <input
          className="input"
          type="text"
          name="title"
          defaultValue={album.title}
        />
        <label className="label" htmlFor="artist">
          Artist
        </label>
        <select name="artist">
          <option value="">Please select a value</option>
          {artists.length
            ? artists.map((artist, i) => (
                <option key={i} value={artist._id} selected={artist._id===album.artist}>
                  {artist.name}
                </option>
              ))
            : ""}
        </select>

        <label className="label" htmlFor="artist">
          Label
        </label>
        <select name="label">
          <option value="">Please select a value</option>
          {labels.length &&
            labels.map((label, i) => (
              <option key={i} value={label._id} selected={label._id===album.label}>
                {label.name}
              </option>
            ))}
        </select>
        <label className="lab" htmlFor="releaseDate">
          Release Date
        </label>
        <input
          className="input"
          type="date"
          value={album && convertDate(album.releaseDate)}
          name="releaseDate"
        />
        <label htmlFor="cover">cover</label>
        <input
          ref={coverInput}
          onChange={handleCover}
          className="is-hidden"
          type="file"
          name="cover"
        />
        <img
          src={album.cover || coverPreviewURL}
          onClick={simulateInputClick}
          className="icon-avatar"
          alt=""
        />

        <label className="label" htmlFor="description">
          description
        </label>
        <textarea name="description" className="textbox" defaultValue={album.description} />
        <button className="btn">ok</button>
      </form>
    </div> :
    null
    
  );
}

export default withRouter(FormAlbum);
