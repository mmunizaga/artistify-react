import React, { useState, useEffect } from "react";
// custom tools
// import CustomInputFile from "./../icon/IconAvatarAdmin";
import LabPreview from "../LabPreview";
// styles
import "./../../styles/form.css";
import "./../../styles/icon-avatar.css";
import APIHandler from "../../api/APIHandler";

const api = APIHandler;
var coverInput;

export default function FormAlbum({ mode = "create", _id, history, match }) {
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
  const [albums, setAlbums] = useState([]);

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
    fd.append("tite", title);
    fd.append("artist", artist);
    fd.append("label", label);
    fd.append("releaseDate", releaseDate);
    fd.append("cover", cover);
    fd.append("description", description);
    console.log(fd);
    try {
      if (mode === "create") await APIHandler.post("/albums", fd);
      else await APIHandler.patch(`/albums/${match.params.id}`, fd);
      // here, we access history as a destructured props (see the parameters of this component)
      // history is accessible since we wrapped the component in the withRouter function
      history.push("/admin/albums");
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

  // useEffect(() => {
  //     function initFormData () {
  //       api.get(`/albums/${_id}`);
  //       delete apiRes.data._id;
  //       setState({ ...apiRes.data});
  //     };
  // })

  return (
    <div>
      {console.log("", coverPreviewURL)}
      <form className="form" onSubmit={handleSubmit} onChange={handleChange}>
        <label className="label" htmlFor="title">
          Title
        </label>
        <input
          className="input"
          type="text"
          defaultValue={title}
          name="title"
        />
        <label className="label" htmlFor="artist">
          Artist
        </label>
        <select name="artist">
          <option value="">Please select a value</option>
          {artists.length
            ? artists.map((artist, i) => (
                <option key={i} value={artist._id}>
                  {artist.name}
                </option>
              ))
            : ""}
        </select>

        <label className="label" htmlFor="artist">
          Label
        </label>
        <select name="artist">
          <option value="">Please select a value</option>
          {labels.length &&
            labels.map((label, i) => <option key={i}>{label.name}</option>)}
        </select>
        <label className="lab" htmlFor="releaseDate">
          Release Date
        </label>
        <input
          className="input"
          id="title"
          type="date"
          defaultValue={title}
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
          src={coverPreviewURL}
          onClick={simulateInputClick}
          className="icon-avatar"
          alt=""
        />

        <label className="label" htmlFor="description">
          description
        </label>
        <textarea name="description" className="textbox" />
        <button className="btn">ok</button>
      </form>
    </div>
  );
}
