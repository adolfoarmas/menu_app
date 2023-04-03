import React, { useState, useEffect, useContext } from "react";
import { CategoriesContext } from "../../context/userContext";
import {
  ButtonCreateEdit,
  FormDish,
  FormDishDiv,
  FormFieldNameLabel,
  FromErrorLabel,
  ImageForm,
  ImageFormDiv,
  ImageFormButtonLabel,
  ImageInput,
  InputsDiv,
  SelectImageInformationLable,
} from "../../styles/css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowUp, faCamera } from "@fortawesome/free-solid-svg-icons";

const DishForm = ({ data = {}, onSubmit }) => {
  
  const [dishCategories] = useContext(CategoriesContext);
  
  const [formData, setFormData] = useState(data);
  const [categoriesList, setCategoriesList] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    setCategoriesList(dishCategories);

    // set default values
    if (!data.hasOwnProperty("category")) {
      data['category'] = dishCategories[0].id
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
    setImagePreview(data.image_url);
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

    //To show image preview
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
  };

  return (
    <FormDish onSubmit={handleSubmit}>
      {data.name ? <h2>Edit Dish</h2> : <h2>Add New Dish</h2>}
      <FormDishDiv>
        {/* text inputs */}
        <InputsDiv>
          <FormFieldNameLabel>
            <p>Name:</p>
          </FormFieldNameLabel>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            autoFocus
          />
          {!formData.name ? (
            <FromErrorLabel>this field is required</FromErrorLabel>
          ) : (
            <FromErrorLabel></FromErrorLabel>
          )}
          <FormFieldNameLabel>
            <p>Description:</p>
          </FormFieldNameLabel>
          <textarea
            className="App-text-form-description"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
          {!formData.description ? (
            <FromErrorLabel>this field is required</FromErrorLabel>
          ) : (
            <FromErrorLabel></FromErrorLabel>
          )}
          <FormFieldNameLabel>
            <p>Category:</p>
          </FormFieldNameLabel>
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
            <FromErrorLabel>this field is required</FromErrorLabel>
          ) : (
            <FromErrorLabel></FromErrorLabel>
          )}
          <FormFieldNameLabel>
            <p>Observation:</p>
          </FormFieldNameLabel>
          <textarea
            className="App-text-form-observation"
            id="observation"
            name="observation"
            value={formData.observation}
            onChange={handleChange}
          />
          <div className="new-dish-form-form-price">
            <FormFieldNameLabel>
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
                <FromErrorLabel>this field is required</FromErrorLabel>
              ) : (
                <FromErrorLabel></FromErrorLabel>
              )}
            </FormFieldNameLabel>
            <FormFieldNameLabel>
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
                <FromErrorLabel>this field is required</FromErrorLabel>
              ) : (
                <FromErrorLabel></FromErrorLabel>
              )}
            </FormFieldNameLabel>
          </div>
          <ButtonCreateEdit disabled={data===formData} type="submit">
            {data.name ? "Update" : "Create"}
          </ButtonCreateEdit>
        </InputsDiv>
        {/* image inputs */}
        <ImageFormDiv>
          <FormFieldNameLabel className="new-dish-form-form-picture">
            Picture:
          </FormFieldNameLabel>
          {!formData.image ? (
            <>
            <SelectImageInformationLable>
              <label>Upload a refecence picture to your dish:</label>
              <label>Allowed format jpeg/jpg</label>
              <FontAwesomeIcon icon={faCamera} />
              </SelectImageInformationLable>
            
            </>
          ) : (
              <ImageForm
                name="image_url"
                src={imagePreview}
                alt="dish selected file"
              />
            
          )}
          <ImageFormButtonLabel htmlFor="image_url"><FontAwesomeIcon icon={faCloudArrowUp} /><p>{!formData.image ? 'Upload': 'Change' }</p></ImageFormButtonLabel>
          <ImageInput
            type="file"
            id="image_url"
            name="image_url"
            onChange={handleFileChange}
          />
        </ImageFormDiv>
      </FormDishDiv>
    </FormDish>
  );
};

export default DishForm;