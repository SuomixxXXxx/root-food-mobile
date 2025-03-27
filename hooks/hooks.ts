import { AppDispatch } from "@/api/store";
import { useDispatch } from "react-redux";

export const useAppDispatch = () => useDispatch<AppDispatch>();