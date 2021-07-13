import { Title, PhoneBook } from "./Container.styled";

const Container = ({ title, children }) => {
  return (
    <PhoneBook>
      {title && <Title>{title}</Title>}
      {children}
    </PhoneBook>
  );
};

export default Container;
