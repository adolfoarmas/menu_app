import styled from "styled-components";
import React, { useState, useEffect, useContext } from "react";
import { CategoriesContext } from "../../context/userContext";

const DishForm = ({ data = {}, onSubmit }) => {
  const [dishCategories] = useContext(CategoriesContext);

  const [formData, setFormData] = useState(data);
  const [categoriesList, setCategoriesList] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    setCategoriesList(dishCategories);

    // set default values
    if (!data.hasOwnProperty("category")) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        category: dishCategories[0].id,
      }));
    }

    if (data.hasOwnProperty("name")) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        id: data.id,
      }));
    }
    //if it is for edit
    setImagePreview(data.image);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    formData.image = file;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormDiv>
        <InputsDiv>
          {data.name ? <h2>Edit Dish</h2> : <h2>Add New Dish</h2>}
          <FieldNameLabel>
            <p>Name:</p>
          </FieldNameLabel>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          {!formData.name ? (
            <ErrorLabel>this field is required</ErrorLabel>
          ) : (
            <ErrorLabel></ErrorLabel>
          )}
          <FieldNameLabel>
            <p>Description:</p>
          </FieldNameLabel>
          <textarea
            className="App-text-form-description"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
          {!formData.description ? (
            <ErrorLabel>this field is required</ErrorLabel>
          ) : (
            <ErrorLabel></ErrorLabel>
          )}
          <FieldNameLabel>
            <p>Category:</p>
          </FieldNameLabel>
          <select
            id="caregory"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            {categoriesList.map((cat, index) => (
              <option key={index} name="category" value={Number(cat.id)}>
                {cat.name}
              </option>
            ))}
          </select>
          {!formData.category ? (
            <ErrorLabel>this field is required</ErrorLabel>
          ) : (
            <ErrorLabel></ErrorLabel>
          )}
          <FieldNameLabel>
            <p>Observation:</p>
          </FieldNameLabel>
          <textarea
            className="App-text-form-observation"
            id="observation"
            name="observation"
            value={formData.observation}
            onChange={handleChange}
          />
          <div className="new-dish-form-form-price">
            <FieldNameLabel>
              <p>Price:</p>
              <input
                className="new-dish-form-form-price-price"
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
              />
              {!formData.price ? (
                <ErrorLabel>this field is required</ErrorLabel>
              ) : (
                <ErrorLabel></ErrorLabel>
              )}
            </FieldNameLabel>
            <FieldNameLabel>
              <p>Currency:</p>
              <input
                className="new-dish-form-form-price-currency"
                type="text"
                id="currency"
                name="currency"
                value={formData.currency}
                onChange={handleChange}
                required
              />
              {!formData.currency ? (
                <ErrorLabel>this field is required</ErrorLabel>
              ) : (
                <ErrorLabel></ErrorLabel>
              )}
            </FieldNameLabel>
          </div>
          <ButtonDiv>
            <button type="submit">{data.name ? "Update" : "Create"}</button>
          </ButtonDiv>
        </InputsDiv>
        <ImageFormDiv>
          <FieldNameLabel className="new-dish-form-form-picture">
            Picture:
          </FieldNameLabel>
          {!formData.image ? (
            <>
              <label>Select a refecence image to your dish:</label>
              <ImageLabel htmlFor="image">Upload</ImageLabel>
            </>
          ) : (
            <>
              <Image name="image" src={imagePreview} alt="dish selected file" />
              <ImageLabel htmlFor="image">Change</ImageLabel>
            </>
          )}
          <ImageInput
            type="file"
            id="image"
            name="image"
            onChange={handleFileChange}
          />
        </ImageFormDiv>
      </FormDiv>
    </Form>
  );
};

export default DishForm;

const ButtonDiv = styled.div`
  button {
    margin: 0;
    align-self: center;
    color: white;
    background-color: #325891;
    padding: 0.5em 1.3em;
    margin: 1em 0em;
    border-style: none;
    border-radius: 0.3em;
    border: none;
    font-size: 1rem;
    height: auto;
    :hover {
      background-color: #3865ad;
      cursor: pointer;
    }
  }
`;

const Image = styled.img`
  width: 20em;
  height: 20em;
  padding: 5px 5px;
  margin: 0;
  border: 0 solid #ccc;
  border-radius: 1em;
  box-sizing: border-box;
`;

const ImageLabel = styled.label`
  align-self: center;
  color: white;
  background-color: #325891;
  padding: 0.5em 1.3em;
  margin: 1em 1em;
  border-radius: 0.3em;
  border: 1px black;
  font-size: 1rem;
  height: auto;
  :hover {
    background-color: #3865ad;
    cursor: pointer;
  }
`;

const ImageInput = styled.input`
  opacity: 0;
  width: 0;
`;

const ImageFormDiv = styled.div`
  display: flex;
  flex-direction: column;
  button {
    background-color: #7f9ccb;
    padding: 5px 10px;
    border-radius: 5px;
    border: 1px ridge black;
    font-size: 0.8rem;
    height: auto;
  }
`;

const FieldNameLabel = styled.label`
  display: flex;
  flex-direction: column;
  height: auto;
  p {
    margin: 0;
  }
`;
const ErrorLabel = styled.label`
  font-size: 0.8em;
  color: #ff0000a2;
`;

const InputsDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 50px 0 0;
  width: 100%;

  input,
  textarea,
  select {
    padding: 5px 5px;
    margin: 0;
    border: 0em solid #ccc;
    box-sizing: border-box;
  }
`;

const FormDiv = styled.div`
  display: flex;
  flex-flow: row;
  width: 100%;
  height: 100%;
  padding: 20px 20px;
  background: inherit;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 999999999;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 1em;
  max-width: 80%;

  @media only screen and (min-width: 768px) {
    .FormDiv {
      flex-direction: row;
    }
  }

  .InputsDiv .ImageFormDiv {
    flex-basis: 100%;
    margin: 10px;
  }

  @media only screen and (min-width: 768px) {
    .InputsDiv .ImageFormDiv {
      flex-basis: 50%;
    }
  }
`;
