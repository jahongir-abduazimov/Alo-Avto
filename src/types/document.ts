export type DocumentType = "purchase_agreement" | "passport_scan" | "invoice";

export interface CreateDocumentInput {
  type: DocumentType;
  name: string;
  file: File;
}

export interface DocumentItem {
  id: number;
  type: string;
  name: string;
}

export interface ContractImage {
  id: number;
  image: string;
  created_at: string;
}

export interface ContractDocument {
  id: number;
  rental: number | null;
  contract_number: string;
  contract_type: string;
  title: string;
  contract_date: string;
  pdf_file: string | null;
  status: string;
  signed_by_user: boolean;
  signed_by_admin: boolean;
  notes: string;
  images: ContractImage[];
  created_at: string;
  updated_at: string;
}

export interface ContractDocumentListResponse {
  results: ContractDocument[];
}
