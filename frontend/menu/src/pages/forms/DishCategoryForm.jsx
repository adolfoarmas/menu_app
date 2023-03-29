import styled from "styled-components";
import React, { useState, } from "react";
import { useEffect } from "react";

const DishCategoryForm = ({data={}, onSubmit}) => {
  // console.log('data', data)
  // const { token, csfrToken, userLoggedId } = useContext(Context);
  // const [tokenValue] = token;
  // const [csfrTokenValue] = csfrToken;
  // const [userLoggedIdValue] = userLoggedId;

  const [formData, setFormData] = useState(data);
  const [errorText, setErrorText] = useState();
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
    <FormDiv >
      <Form onSubmit={handleSubmit}>
        {data.name ? (
          <h2>Edit Dish Category</h2>
        ) : (
          <h2>Add New Dish Category</h2>
        )}
        <FieldNameLabel>
          <p>Name:</p>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
          />
        </FieldNameLabel>
        <FieldNameLabel>
          <p>Description:</p>
          <textarea
            id="description"
            name="description"
            maxLength={200}
            required
            value={formData.description}
            onChange={handleChange}
          />
        </FieldNameLabel>
        <p> {errorText}</p>
        <ButtonDiv>
            <button type="submit">{data.name? 'Edit' : 'Create'}</button>
        </ButtonDiv>
      </Form>
    </FormDiv>
  );
};

export default DishCategoryForm;

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

const FieldNameLabel = styled.label`
  display: flex;
  flex-direction: column;
  height: auto;
  p {
    margin: 0;
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
