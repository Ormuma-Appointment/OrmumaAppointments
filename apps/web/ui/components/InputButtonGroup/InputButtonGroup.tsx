import React from 'react';
import Input from "../InputField/Input";
import Button from "../Button/Button";
import styles from "./InputButtonGroup.module.css"

interface InputButtonGroupProps {
    handleElementSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    placeholder: string; 
    name: string; 
  }
const InputButtonGroup: React.FC<InputButtonGroupProps> =({handleElementSubmit, placeholder, name }) => {
  return (
    <form className={styles.input_group} onSubmit={handleElementSubmit}>
          <Input placeholder={placeholder} name={name} />
          <Button  size="medium" variant="secondary">
            + hinzufügen
          </Button>
        </form>
  )
}

export default InputButtonGroup