import React from 'react';
import { useForm, useField, splitFormProps } from "react-form";
import { register } from "../scripts/services/user";
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';


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
        <Container fluid>
            <Row className="justify-content-md-center">
            </Row>
            <Row className="justify-content-md-center">
                <Col xs={{ span: 4 }}>
                    <Form>
                        <div>
                            <label>
                                Nombre: <InputField field="firstName" />
                            </label>
                        </div>

                        <div>
                            <label>
                                Apellido: <InputField type="text" field="lastName" />
                            </label>
                        </div>

                        <div>
                            <label>
                                Username <InputField type="text" field="username" />
                            </label>
                        </div>

                        <div>
                            <label>
                                Email <InputField type="email" field="email" />
                            </label>
                        </div>

                        <div>
                            <label>
                                Ciudad <InputField type="text" field="city" />
                            </label>
                        </div>

                        <div>
                            <label>
                                Departamento <InputField type="text" field="department" />
                            </label>
                        </div>

                        <div>
                            <label>
                                Pa&iacute;s <InputField type="text" field="country" />
                            </label>
                        </div>

                        <div>
                            <label>
                                Edad <InputField type="number" min="10" max="100" field="age" />
                            </label>
                        </div>

                        <div style={{ textAlign: 'center' }}>
                            <Button type="submit" disabled={!canSubmit}>
                                Submit
                </Button>
                        </div>

                        <div>
                            <em>{isSubmitting ? "Submitting..." : null}</em>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default RegisterForm;