import React, { useState } from "react";
import axios from "axios";
import { axiosWithAuth } from './axiosAuth.js';

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = (props) => {
  const { colors, updateColors, colorList } = props;
  // const colors = props.colors;
  // const updateColors = props.updateColors();

  console.log("colors:", colors);
  console.log("colorlist props:", props);

  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    let edit = {id: colorToEdit.id, color:colorToEdit.color, code:colorToEdit.code};
    console.log("submitted!");
    axiosWithAuth()
      .put(`http://localhost:5000/api/colors/${colorToEdit.id}`, edit)
      .then(res => {
        // setEditing(false);
        // updateColors(res.data);
        axiosWithAuth()
          .get("http://localhost:5000/api/colors")
          .then(res =>{
            updateColors(res.data);

          })
          .catch(err => console.log("Error: ", err))
        // console.log("saveEdit response:", res)
      })
      .catch(err => {
          console.log(err);
      });
  };

  const deleteColor = color => {
    // make a delete request to delete this color
    axiosWithAuth()
      .delete(`http://localhost:5000/api/colors/${color.id}`)
        .then(res =>{
          axiosWithAuth()
            .get("http://localhost:5000/api/colors")
            .then(res =>{
              updateColors(res.data);

            })
            .catch(err => console.log("Error: ", err))
        })
        .catch(err => console.log("Error:", err))
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
    </div>
  );
};

export default ColorList;
