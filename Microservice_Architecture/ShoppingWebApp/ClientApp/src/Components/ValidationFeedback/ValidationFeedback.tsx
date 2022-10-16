import { FieldError } from "react-hook-form";
import { FunctionComponent } from "react";
import { Form } from "react-bootstrap";

interface ValidationFeedbackProps {
  error: FieldError | undefined;
}

export const ValidationFeedback: FunctionComponent<ValidationFeedbackProps> = ({ error }) => {
  return <Form.Control.Feedback type="invalid">{error?.message}</Form.Control.Feedback>;
};
