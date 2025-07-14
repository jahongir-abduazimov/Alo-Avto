"use client";

import Invoices from "../Forms/Invoices";

type AddDocumentProps = {
  docType?: string;
};

export default function AddDocument({ docType = "closing" }: AddDocumentProps) {
  return (
    <div>
      {["closing", "sale", "power_of_attorney"].includes(docType) && (
        <Invoices docType={docType} />
      )}
    </div>
  );
}
