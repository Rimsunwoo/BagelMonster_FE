import React from "react";

import AddOrModifyProductForm from "@/components/mystore/AddOrModifyProductForm";

export default function AddMenu() {
  return (
    <div>
      <section>
        <AddOrModifyProductForm type="add" />
      </section>
    </div>
  );
}
