// custom tools
// import CustomInputFile from "./../icon/IconAvatarAdmin";
import LabPreview from "../LabPreview";
// styles
import "./../../styles/form.css";
import "./../../styles/icon-avatar.css";
import APIHandler from '../../api/APIHandler'

const api = APIHandler

import React from 'react'

export default function FormAlbum({
  mode = "create",
  _id,
  history,
  match
}) {
  const [
    { title, artist, label, releaseDate, cover, description},
    setState
  ] = useState({
    title: "",
    artist: "",
    label: "",
    releaseDate: "",
    cover: "",
    description: "",
  });
  const [ artists, setArtists] = useState([]);
  const [ labels, setLabels] = useState([]);
  const [ albums, setAlbums] = useState([]);

useEffect(()=>{
  api.get('/artists')
  .then(apiRes => setArtists(apiRes.data))
},[])

useEffect(()=>{
  api.get('/labels')
  .then(apiRes => setLabels(apiRes.data))
},[])

// useEffect(() => {
//     function initFormData () {
//       api.get(`/albums/${_id}`);
//       delete apiRes.data._id;
//       setState({ ...apiRes.data});
//     };
// })

  return (
    <div>
      <form className="form" onSubmit={handleSubmit} onChange={handleChange}>
      <label className="label" htmlFor="title">
        Title
      </label>
      <input
        className="input"
        id="title"
        type="text"
        defaultValue={title}
      />

      <label className="label" htmlFor="artist">
        Artist
      </label>
      <select name="artist">
      <option value="">Please select a value</option>
      {artists.map((artist, i) =>(
        <option key={i}>{artist.name}</option>
      ))}
      </select>

      <label className="label" htmlFor="artist">
        Label
      </label>
      <select name="artist">
      <option value="">Please select a value</option>
      {labels.map((label, i) =>(
        <option key={i}>{label.name}</option>
      ))}
      </select>
    <button className="btn">ok</button>
    </form>
    </div>
  )
}
