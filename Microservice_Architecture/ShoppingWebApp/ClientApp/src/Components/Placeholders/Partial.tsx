import { FunctionComponent } from "react";

interface PartialProps {
  name: string;
  [key: string]: any;
}

export const Partial: FunctionComponent<PartialProps> = ({ name, ...rest }) => {
  return <>Partial for {name} Params {JSON.stringify(rest)}</>;
};
