import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { api } from "../api";

interface elementForDecay {
    element_id?: number;
    name: string;
    status?: string;
    img_url?: string | null;
  }

interface elementDecay {
  id?: number;
  element?: elementForDecay;
  quantity?: string | null;
  remaining_quantity?: string | null;
  decay?: number;
}

interface decay {
  decay_id?: number;
  elements?: elementDecay[];
  creator?: string;
  moderator?: string;
  status?: string;
  date_of_creation?: string;
  date_of_formation?: string | null;
  date_of_finish?: string | null;
  pass_time?: string | null;
}

interface decayState {
    decay: decay,
    loading: boolean
}

const initialState: decayState = {
    decay: {pass_time: ""},
    loading: false
}

export const getDecayInformation = createAsyncThunk(
    'decay/getDecayInformation',
    async (decayId: string, { rejectWithValue }) => {
      try {
        const response = await api.decay.decayRead(decayId)
        return response.data
      } catch (error: any) {
        return rejectWithValue("Произошла ошибка")
      }
    }
)

export const deleteElementFromDecay = createAsyncThunk(
    'decay/deleteElementFromDecay',
    async (credentials: {decayId: number, elementId: number}, { dispatch,rejectWithValue }) => {
        try {
            const response = await api.elementDecay.elementDecayDelete(credentials.elementId.toString(), credentials.decayId.toString())
            dispatch(deleteElementFromDecayAction({elementId: credentials.elementId, decayId: credentials.decayId}))
            return response.data
        } catch (error: any) {
          return rejectWithValue("Произошла ошибка")
        }
    }
)

export const savePassTime = createAsyncThunk(
    'decay/savePassTime',
    async (credentials: {decayId: number, passTime: string}, { rejectWithValue }) => {
        try {
            const response = await api.decay.decayUpdate(credentials.decayId.toString(), {pass_time: credentials.passTime})
            return response.data
        } catch (error: any) {
          return rejectWithValue("Произошла ошибка")
        }
    }
)

export const saveQuantity = createAsyncThunk(
  'decay/saveQuantity',
  async (credentials: {decayId: number, elementId: number, quantity: string}, { rejectWithValue }) => {
      try {
          const response = await api.elementDecay.elementDecayUpdate(credentials.elementId.toString(), credentials.decayId.toString(), {quantity: credentials.quantity})
          return response.data
      } catch (error: any) {
        return rejectWithValue("Произошла ошибка")
      }
  }
)

export const deleteDecay = createAsyncThunk(
  'decay/deleteDecay',
  async (decayId: number, { rejectWithValue }) => {
      try {
          const response = await api.decay.decayFormingDelete(decayId.toString())
          return response.data
      } catch (error: any) {
        return rejectWithValue("Произошла ошибка")
      }
  }
)

export const formDecay = createAsyncThunk(
  'decay/formDecay',
  async (decayId: number, { rejectWithValue }) => {
      try {
          const response = await api.decay.decayFormingUpdate(decayId.toString())
          return response.data
      } catch (error: any) {
        return rejectWithValue("Произошла ошибка")
      }
  }
)

const decaySlice = createSlice({
    name: 'decay',
    initialState,
    reducers: {
      setDecayPassTime(state, {payload}) {
        state.decay.pass_time = payload
      },
      setDecayElementQuantity(state, {payload}) {
        const element = state.decay.elements?.find((el) => el.element?.element_id === payload.element_id)
        element!.quantity = payload.quantity
      },
      deleteElementFromDecay(state, {payload}) {
        state.decay.elements = state.decay.elements?.filter((el) => el.element?.element_id !== payload.elementId)
      },
    },
    extraReducers: (builder) => {
        builder.addCase(getDecayInformation.pending, (state) => {
          state.loading = true
        }),
        builder.addCase(getDecayInformation.fulfilled, (state, {payload}) => {
          state.decay = payload
          state.loading = false
        }),
        builder.addCase(getDecayInformation.rejected, (state) => {
          state.loading = false
        })
    }
})

export const useDecay = () => useSelector((state: RootState) => state.decay.decay)
export const useDecayElements = () => useSelector((state: RootState) => state.decay.decay.elements)
export const useDecayLoading = () => useSelector((state: RootState) => state.decay.loading)
export const useDecayStatus = () => useSelector((state: RootState) => state.decay.decay.status)

export const {
  setDecayPassTime: setDecayPassTimeAction,
  setDecayElementQuantity: setDecayElementQuantityAction,
  deleteElementFromDecay: deleteElementFromDecayAction,
} = decaySlice.actions

export default decaySlice.reducer