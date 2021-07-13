import { Formik } from "formik";
import {
  Form,
  Input,
  Label,
  Button,
  Error,
  Name,
  Number,
} from "./ContactForm.styled";

export default function ContactForm({ onSubmit }) {
  return (
    <Formik
      initialValues={{ name: "", number: "" }}
      validate={(values) => {
        const errors = {};
        if (!values.name) {
          errors.name = "Обязательное поле";
        } else if (!values.number) {
          errors.number = "Обязательное поле";
        } else if (
          !/^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/i.test(
            values.name
          )
        ) {
          errors.name =
            "Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п.";
        } else if (
          !/\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/i.test(
            values.number
          )
        ) {
          errors.number =
            "Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +";
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        onSubmit(values);
        setSubmitting(false);
        resetForm();
      }}
    >
      {({
        values,
        touched,
        errors,
        handleChange,
        handleSubmit,
        isSubmitting,
      }) => (
        <Form onSubmit={handleSubmit}>
          <Label>
            <Name>Name</Name>
            <Input
              type="text"
              name="name"
              placeholder="Patricia Manterola"
              onChange={handleChange}
              value={values.name}
            />
            {touched.name && errors.name && <Error>{errors.name}</Error>}
          </Label>
          <Label>
            <Number>Number</Number>
            <Input
              type="tel"
              name="number"
              placeholder="0669365879"
              onChange={handleChange}
              value={values.number}
            />
            {touched.number && errors.number && <Error>{errors.number}</Error>}
          </Label>
          <Button
            type="submit"
            disabled={
              isSubmitting || values.name === "" || values.number === ""
            }
          >
            Add contacts
          </Button>
        </Form>
      )}
    </Formik>
  );
}
