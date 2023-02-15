export interface Itasks {
  label: string;
  checked: boolean;
}

export interface IEditTimesModal {
  open: boolean;
  updatedWorkTime: number;
  updatedBreakTime: number;
  handleSave: () => void;
  setOpen: (value: React.SetStateAction<boolean>) => void;
  handleChangeWork: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeBreak: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

