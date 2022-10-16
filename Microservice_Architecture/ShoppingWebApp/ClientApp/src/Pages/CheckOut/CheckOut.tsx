import { FunctionComponent } from "react";
import { Button, Col, Form, InputGroup, Row, Stack } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { BasketCheckout } from "../../Apis/BasketClient";
import { ValidationFeedback } from "../../Components/ValidationFeedback/ValidationFeedback";
import { useBasketFunctions } from "../../Services/BasketService";
import { usaStates } from "../../Services/usaStates";
import { getUser } from "../../Services/UserService";
import { CheckoutBreadcrumb } from "./components/CheckoutBreadcrumb";
import { CheckoutCart } from "./components/CheckoutCart";
import { CheckoutFormGroup } from "./components/CheckoutFormGroup";

export const CheckOut: FunctionComponent = () => {
  const methods = useForm<BasketCheckout>({
    defaultValues: {
      userName: getUser(),
    },
  });
  const { handleSubmit } = methods;
  const { checkout } = useBasketFunctions();
  const navigate = useNavigate();

  const checkoutOrder = async (order: BasketCheckout) => {
    try {
      await checkout(order);
      navigate("/confirmation");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <CheckoutBreadcrumb />

      <div className="container">
        <div className="row">
          <CheckoutCart />
          <Col md={{ span: 8, order: 1 }}>
            <h4 className="mb-3">Billing address</h4>
            <FormProvider {...methods}>
              <Form noValidate onSubmit={handleSubmit(checkoutOrder)}>
                <Row className="mb-3">
                  <CheckoutFormGroup
                    name="firstName"
                    label="First name"
                    validation={{ required: "Valid first name is required." }}
                    md="6"
                  >
                    {(p) => <Form.Control {...p} />}
                  </CheckoutFormGroup>

                  <CheckoutFormGroup
                    name="lastName"
                    label="Last name"
                    validation={{ required: "Valid first last is required." }}
                    md="6"
                  >
                    {(p) => <Form.Control {...p} />}
                  </CheckoutFormGroup>
                </Row>

                <CheckoutFormGroup
                  name="userName"
                  label="Username"
                  validation={{ required: "Your username is required." }}
                  className="mb-3"
                  noError
                >
                  {(p, e) => (
                    <InputGroup hasValidation>
                      <InputGroup.Text>@@</InputGroup.Text>
                      <Form.Control {...p} />
                      <ValidationFeedback {...e} />
                    </InputGroup>
                  )}
                </CheckoutFormGroup>

                <CheckoutFormGroup
                  name="emailAddress"
                  label={
                    <>
                      Email <span className="text-muted">(Optional)</span>
                    </>
                  }
                  validation={{
                    pattern: {
                      value: /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/,
                      message: "Please enter a valid email address for shipping updates.",
                    },
                  }}
                  className="mb-3"
                >
                  {(p) => <Form.Control {...p} placeholder="you@example.com" />}
                </CheckoutFormGroup>

                <CheckoutFormGroup
                  name="addressLine"
                  label="Address"
                  validation={{
                    required: "Please enter your shipping address.",
                  }}
                  className="mb-3"
                >
                  {(p) => <Form.Control {...p} placeholder="1234 Main St" />}
                </CheckoutFormGroup>

                <Form.Group controlId="address2" className="mb-3">
                  <Form.Label>
                    Address 2 <span className="text-muted">(Optional)</span>
                  </Form.Label>
                  <Form.Control placeholder="Apartment or suite" data-lpignore="true" />
                </Form.Group>

                <Row className="mb-3">
                  <CheckoutFormGroup
                    name="country"
                    label="Country"
                    validation={{
                      required: "Please select a valid country.",
                    }}
                    md="4"
                  >
                    {(p) => (
                      <Form.Select placeholder="Choose..." {...p}>
                        <option>United States</option>
                      </Form.Select>
                    )}
                  </CheckoutFormGroup>

                  <CheckoutFormGroup
                    name="state"
                    label="State"
                    validation={{
                      required: "Please select a valid state.",
                    }}
                    md="4"
                  >
                    {(p) => (
                      <Form.Select placeholder="Choose..." {...p}>
                        {usaStates.map((s) => (
                          <option key={s.value} value={s.value}>
                            {s.text}
                          </option>
                        ))}
                      </Form.Select>
                    )}
                  </CheckoutFormGroup>

                  <CheckoutFormGroup
                    name="zipCode"
                    label="Zip"
                    validation={{
                      required: "Zip code required.",
                    }}
                    md="4"
                  >
                    {(p) => <Form.Control {...p} />}
                  </CheckoutFormGroup>
                </Row>

                <hr className="mb-4" />

                <Form.Check type="switch" id="sameAddress" label="Shipping address is the same as my billing address" />
                <Form.Check type="switch" id="saveInfo" label="Save this information for next time" />

                <hr className="mb-4" />

                <h4 className="mb-3">Payment</h4>

                <Stack className="mb-3">
                  <Form.Check type="radio" id="creditPayment" name="paymentMethod" value="Credit card" label="Credit card" />
                  <Form.Check type="radio" id="debitPayment" name="paymentMethod" value="Debit card" label="Debit card" />
                  <Form.Check type="radio" id="PaypalPayment" name="paymentMethod" value="Paypal" label="Paypal" />
                </Stack>

                <Row className="mb-3">
                  <CheckoutFormGroup
                    name="cardName"
                    label="Name on card"
                    validation={{ required: "Name on card is required." }}
                    md="6"
                  >
                    {(p) => (
                      <>
                        <Form.Control {...p} />
                        <Form.Text muted>Full name as displayed on card</Form.Text>
                      </>
                    )}
                  </CheckoutFormGroup>
                  <CheckoutFormGroup
                    name="cardNumber"
                    label="Credit card number"
                    validation={{ required: "Credit card number is required." }}
                    md="6"
                  >
                    {(p) => (
                      <>
                        <Form.Control {...p} />
                      </>
                    )}
                  </CheckoutFormGroup>
                </Row>

                <Row className="mb-3">
                  <CheckoutFormGroup
                    name="expiration"
                    label="Expiration"
                    validation={{ required: "Expiration date required." }}
                    md="3"
                    xs="6"
                  >
                    {(p) => <Form.Control {...p} />}
                  </CheckoutFormGroup>

                  <CheckoutFormGroup name="cvv" label="CVV" validation={{ required: "Security code required." }} md="3" xs="6">
                    {(p) => (
                      <>
                        <Form.Control type="password" {...p} />
                      </>
                    )}
                  </CheckoutFormGroup>
                </Row>

                <hr className="mb-4" />
                <Button type="submit" variant="primary" size="lg">
                  Checkout Order
                </Button>
              </Form>
            </FormProvider>
          </Col>
        </div>
      </div>
    </>
  );
};
