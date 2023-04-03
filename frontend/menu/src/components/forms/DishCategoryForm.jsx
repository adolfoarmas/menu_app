import React, { useState, } from "react";
import { useEffect } from "react";
import { FormDishCategoryDiv, FormDishCategory, ButtonCreateEdit, FormFieldNameLabel} from "../../styles/css";


const DishCategoryForm = ({data={}, onSubmit}) => {

  const [formData, setFormData] = useState(data);
  const [dishCategoryName, setDishCategoryName] = useState("");
  const [dishCategoryDescription, setdishCategoryDescription] = useState("");

  useEffect(() => {
    const handleEdit = (category) => {
      if (
        category &&
        dishCategoryName === "" &&
        dishCategoryDescription === ""
      ) {
        setDishCategoryName(category.name);
        setdishCategoryDescription(category.description);
      }
    };

    handleEdit(data.category);
  });

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
  
  return (
    <FormDishCategoryDiv >
      <FormDishCategory onSubmit={handleSubmit}>
        {data.name ? (
          <h2>Edit Dish Category</h2>
        ) : (
          <h2>Add New Dish Category</h2>
        )}
        <FormFieldNameLabel>
          <p>Name:</p>
          <input
            type="text"
            id="name"
            name="name"
            required
            autoFocus
            value={formData.name}
            onChange={handleChange}
          />
        </FormFieldNameLabel>
        <FormFieldNameLabel>
          <p>Description:</p>
          <textarea
            id="description"
            name="description"
            maxLength={200}
            required
            value={formData.description}
            onChange={handleChange}
          />
        </FormFieldNameLabel>
        <ButtonCreateEdit disabled={data===formData} type="submit">{data.name? 'Edit' : 'Create'}</ButtonCreateEdit>
      </FormDishCategory>
    </FormDishCategoryDiv>
  );
};

export default DishCategoryForm;

