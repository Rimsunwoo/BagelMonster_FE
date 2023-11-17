import React from "react";

import AddOrModifyProductForm from "@/components/mystore/AddOrModifyProductForm";

export default function EditMenu() {
  return (
    <div>
      <section>
        <AddOrModifyProductForm type="modify" />
      </section>
    </div>
  );
}
