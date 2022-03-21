import { createContext, useState } from "react";

export const ConfirmDialogContext = createContext();

export function ConfirmDialogContextProvider({ children }) {
  const [confirmDialog, setConfirmDialog] = useState({
    movieName: "",
    open: "false",
    movieId: "",
    point: "",
  });

  return (
    <ConfirmDialogContext.Provider value={[confirmDialog, setConfirmDialog]}>
      {children}
    </ConfirmDialogContext.Provider>
  );
}
