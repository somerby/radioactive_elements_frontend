import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../api";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { format, parseISO } from "date-fns";

interface decay {
    decay_id?: number;
    creator?: string;
    moderator?: string;
    status?: string;
    date_of_creation?: string;
    date_of_formation?: string | null;
    date_of_finish?: string | null;
}

interface decaysState {
    decays: decay[],
    start_date: string,
    end_date: string,
    status: string,
    loading: boolean
}

const initialState: decaysState = {
    decays: [],
    start_date: "",
    end_date: "",
    status: "",
    loading: false
}

const dateFormat = (date:string) => {
    return format(parseISO(date), "dd.MM.yyyy HH:mm")
}

const statusFormat = (status: string) => {
    const statusMap: Record<string, string> = {
        completed: "Завершен",
        rejected: "Отклонен",
        formed: "Сформирован"
    };

    return statusMap[status]
};

export const getDecays = createAsyncThunk(
    'decays/getDecays',
    async (credentials: {start_date?: string, end_date?: string, status?: string}, { rejectWithValue }) => {
        try {
            const response = await api.decays.decaysList({start_date: credentials?.start_date, end_date: credentials?.end_date, status: credentials?.status})
            return response.data
        } catch (error: any) {
            return rejectWithValue("Произошла ошибка")
        }
    }
)

const decaysSlice = createSlice({
    name: 'decays',
    initialState,
    reducers: {
        setFilterStartDate(state, {payload}) {
            state.start_date = payload
        },
        setFilterEndDate(state, {payload}) {
            state.end_date = payload
        },
        setFilterStatus(state, {payload}) {
            state.status = payload
        },
        resetFilters(state) {
            state.status = ''
            state.end_date = ''
            state.start_date = ''
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getDecays.pending, (state) => {
            state.loading = true
        }),
        builder.addCase(getDecays.fulfilled, (state, {payload}) => {
            state.decays = payload
            state.decays.forEach((item, index) => {
                if (item.date_of_creation) {
                    item.date_of_creation = dateFormat(item.date_of_creation!)
                }
                if (item.date_of_formation) {
                    item.date_of_formation = dateFormat(item.date_of_formation!)
                }
                if (item.date_of_finish) {
                    item.date_of_finish = dateFormat(item.date_of_finish!)
                }
                item.status = statusFormat(item.status!)
            })
            state.loading = false
        }),
        builder.addCase(getDecays.rejected, (state) => {
            state.loading = false
        })
    }
})

export const useDecays = () => useSelector((state: RootState) => state.decays.decays)
export const useStartDate = () => useSelector((state: RootState) => state.decays.start_date)
export const useEndDate = () => useSelector((state: RootState) => state.decays.end_date)
export const useStatus = () => useSelector((state: RootState) => state.decays.status)
export const useDecaysLoading = () => useSelector((state: RootState) => state.decays.loading)

export const {
    setFilterStartDate: setFilterStartDateAction,
    setFilterEndDate: setFilterEndDateAction,
    setFilterStatus: setFilterStatusAction,
    resetFilters: resetFiltersAction
} = decaysSlice.actions

export default decaysSlice.reducer