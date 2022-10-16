import { ReactNode } from "react";
import { Col, Form } from "react-bootstrap";
import { RegisterOptions, useFormContext } from "react-hook-form";
import { BasketCheckout } from "../../../Apis/BasketClient";
import { ValidationFeedback } from "../../../Components/ValidationFeedback/ValidationFeedback";

interface CheckoutFormGroupProps<TFieldName extends keyof BasketCheckout> {
  name: TFieldName;
  label: ReactNode;
  validation?: RegisterOptions<BasketCheckout, TFieldName>;
  className?: string;
  children: (controlProps: any, error: any) => ReactNode;
  noError?: boolean;
  xs?: string;
  md?: string;
  lg?: string;
}

export const CheckoutFormGroup = <TFieldName extends keyof BasketCheckout>({
  name,
  label,
  validation,
  className,
  children,
  noError = false,
  xs,
  md,
  lg
}: CheckoutFormGroupProps<TFieldName>) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<BasketCheckout>();
  return (
    <Form.Group as={Col} controlId={name} className={className} xs={xs} md={md} lg={lg}>
      <Form.Label>{label}</Form.Label>
      {children(
        {
          "data-lpignore": "true",
          isInvalid: !!errors[name],
          ...register(name, validation || {}),
        },
        { error: errors[name] as any }
      )}
      {!noError && <ValidationFeedback error={errors[name] as any} />}
    </Form.Group>
  );
};
