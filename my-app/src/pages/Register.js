import React from 'react';
import { useForm, useField, splitFormProps } from "react-form";
import { register } from "../scripts/services/user";
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import catolica from '../Img/cato.jpg';
import logo from '../Img/ucu_logo.png';


const InputField = React.forwardRef((props, ref) => {
    // Let's use splitFormProps to get form-specific props
    const [field, fieldOptions, rest] = splitFormProps(props);

    // Use the useField hook with a field and field options
    // to access field state
    const {
        meta: { error, isTouched, isValidating },
        getInputProps
    } = useField(field, fieldOptions);

    // Build the field
    return (
        <>
            <input {...getInputProps({ ref, ...rest })} />{" "}
            {isValidating ? (
                <em>Validating...</em>
            ) : isTouched && error ? (
                <em>{error}</em>
            ) : null}
        </>
    );
});

const RegisterForm = () => {
    // Use the useForm hook to create a form instance
    const {
        Form,
        meta: { isSubmitting, canSubmit }
    } = useForm({
        onSubmit: async (values, instance) => {
            register(values)
                .then(() => {
                    alert('Please check your email to verify your account');
                })
                .catch(err => {
                    alert(err);
                })

        },
        debugForm: false
    });

    return (
        <div class="row">
            <Row className="justify-content-md-center">
            </Row>
            <div className="row">
            <div className="col-md-9">
          <img className="imgStyle" src={catolica} alt="Catolica" />
        </div>
        <div className="col-md-3">
            <div className="row">
                <Col xs={{ span: 11 }}>
                    <Form>
                        <div style={{paddingTop:"20px" }}>
                            <label>
                            Nombre
                            </label>
                                 <InputField field="firstName" className="form-control" />
                        </div>

                        <div>
                            <label>
                                Apellido
                            </label>
                            <InputField type="text" field="lastName" className="form-control"  />
                        </div>

                        <div>
                            <label>
                                Username 
                            </label>
                            <InputField type="text" field="username" className="form-control"  />
                        </div>

                        <div>
                            <label>
                                Contraseña
                            </label>
                             <InputField type="text" field="password" className="form-control"  />
                        </div>

                        <div>
                            <label>
                                Email 
                            </label>
                            <InputField type="email" field="email" className="form-control"  />
                        </div>

                        <div>
                            <label>
                                Ciudad 
                            </label>
                            <InputField type="text" field="city" className="form-control"  />
                        </div>

                        <div>
                            <label>
                                Departamento 
                            </label>
                            <InputField type="text" field="department" className="form-control"  />
                        </div>

                        <div>
                            <label>
                                Pa&iacute;s 
                            </label>
                            <InputField type="text" field="country" className="form-control"  />
                        </div>

                        <div>
                            <label>
                                Edad 
                            </label>
                            <InputField type="number" min="10" max="100" field="age" className="form-control"  />
                        </div>

                        <div style={{ textAlign: 'center', paddingTop:"20px" }}>
                            <Button type="submit" disabled={!canSubmit}>
                                Submit
                             </Button>
                        </div>

                        <div>
                            <em>{isSubmitting ? "Submitting..." : null}</em>
                        </div>
                    </Form>
                </Col> 
                </div>
        </div>
            </div>
            
        </div>
    );
}

export default RegisterForm;