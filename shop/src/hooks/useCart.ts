import { useContext } from "react";
import { Context } from "../context/Context";

export function useCart(){
    return useContext(Context)
}