// import Form from 'react-bootstrap/Form';
// import InputGroup from 'react-bootstrap/InputGroup';
// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';

// interface IDataProps {
//   title: string;
//   value: string;
//   onChange: React.Dispatch<React.SetStateAction<string>>;
//   disabled?: boolean;
// }

// export const InputCard = ({title, value, onChange, disabled = false}:IDataProps):JSX.Element => {
//   return (
//     <InputGroup className="mb-3">
//       <Container>
//         <Row>
//           <Col xs={4}><InputGroup.Text>{title}</InputGroup.Text></Col>
//           <Col xs={8}>
//             <Form.Control
//               aria-label="Default"
//               aria-describedby="inputGroup-sizing-default"
//               value={value}
//               onChange={(event) => onChange(event.target.value)}
//               disabled={disabled}
//               placeholder={title}
//             />
//           </Col>
//         </Row>
//       </Container>
//       </InputGroup>
//   );
// }
