import React from "react";
import { Button } from "./ui/button";
import { Edit } from "lucide-react";

// interface Props {
//   content: React.ReactNode;
//   header: React.ReactNode;
// }

export default function ActionCard() {
  return (
    <div className="bg-light-50 px-2 py-3 rounded-2xl">
      <div className="flex">
        <div>
          <h2>Kathryn Murphy</h2>
          <p>Менеджер</p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10 rounded-full border border-gray-200 bg-white text-gray-600 flex justify-center items-center hover:bg-gray-100"
        >
          <Edit className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
