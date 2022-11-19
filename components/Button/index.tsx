import React from "react";

import {
  Button as FBBUtton,
  ButtonProps as FBBUttonProps,
  Spinner,
} from "flowbite-react";

interface ButtonProps extends FBBUttonProps {
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({ isLoading, children, ...props }) => {
  return (
    <FBBUtton {...props}>
      <>
        {isLoading ? (
          <Spinner color="purple" size="sm" light={true} />
        ) : (
          children
        )}
      </>
    </FBBUtton>
  );
};

export default Button;
