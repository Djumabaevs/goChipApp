import React from "react";

import {DropDownFromItem} from "./DropdownFromItem";

export const FormItem = (props) => {
  const {type, ...restProps} = props;
  switch (type) {
    case "dropdown": {
        return <DropDownFromItem {...restProps}/>
    }
    default: return null;
  }
}
